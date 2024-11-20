import { readFileSync } from "fs";
import { model, Schema } from "mongoose";
import MongooseDelete = require("mongoose-delete"); 
import  mongoTenant  from "mongo-tenant";
import mongoosePaginate from "mongoose-paginate-v2";
import moment from "moment";
import path = require("path");
enum Language {
    SpanishES = 'es-ES',  // Español de España
    SpanishMX = 'es-MX',  // Español de México
    EnglishUS = 'en-US',  // Inglés de Estados Unidos
    EnglishGB = 'en-GB',  // Inglés de Reino Unido
  }
  const getInicialTemplate = () => {
    const filePath = path.resolve(__dirname, '../../../templates/initial_invoice.html')
    console.log(filePath);
     return {
        html: readFileSync(filePath, 'utf-8')
     }
  }
  const getPlanBasic = () => {
    return {
      "title": "Plan Base",
      "price": 0.00
    }
  }
 const CardSchema = new Schema({
    cardPlaceholder: {
        type: String,
        select: false
      },
      cardToken: {
        type: String,
        select: false
      },
      cardNumber: {
        type: String,
      },
      cardUser: {
        type: String,
        required: true
      },
      brand: {
        type: String
      },
      cardEpx: {
        type: String
      }
 }) 
 const PlanScheme = new Schema(
    {
      title: {
        type: String,
      },
      price: {
        type: Number,
      },
      createdAt: {
        type: Date,
        default: moment().toDate()
      },
    }
  )
 
 
 
 const SettingsSchema = new Schema({
    name: { type: String , required: false,  default: null },
    owner: { type: String , required: true, default: null},
    currencySymbol: { type: String , required: false, default: null},
    currency: { type: String , required: false, default: null},
    logo: { type: String , required: false, default: null},
    plugins: { type: Object, default: []},
    tax: { type: Object, default: []},
    taxOffset: { type: Object, default: []},
    language: { type: String , required: false, enum: ['en-US', 'es-ES','es-MX', 'en-GB' ], default: 'es-ES', },
    invoiceDesign: { type: Object, default: getInicialTemplate()},
    purchaseDesign: { type: Object, default: getInicialTemplate()},
    invoiceFormat: { type: String, default: '%%%%%'},
    payment: { type: CardSchema, default: null},
    planDate: { type: PlanScheme , default: getPlanBasic()}
})

SettingsSchema.plugin(mongoTenant)
SettingsSchema.plugin(mongoosePaginate)
SettingsSchema.plugin(MongooseDelete, {overrideMethods: 'all'})
SettingsSchema.plugin(MongooseDelete)
const SettingsModel = model('Settings', SettingsSchema)
export default SettingsModel