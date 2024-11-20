import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongoTenant from "mongo-tenant";
import mongoose_delete from "mongoose-delete";

const PluginsSchema = new Schema(
    {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      path: {
        type: String,
        required: true,
        unique: true
      },
      icon: {
        type: String,
        required: false
      },
      video: {
        type: String,
        required: false
      },
      features: {
        type: Object,
        required: true
      },
      periodTry: {
        type: Number,
        default: 0,
        min: 0, // Ensure trial period cannot be negative
      }
    },
    {
      versionKey: false,
      timestamps: true
    }
  )
  PluginsSchema.plugin(mongoose_delete)
  PluginsSchema.plugin(mongoose_delete, {overrideMethods: true})
  PluginsSchema.plugin(mongoTenant)
  PluginsSchema.plugin(mongoosePaginate)
  const pluginsModel = model('Plugins', PluginsSchema)

  export default pluginsModel;