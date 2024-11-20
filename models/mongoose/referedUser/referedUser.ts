import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";



const ReferredSchema = new mongoose.Schema(
    {
      userTo: {
        type: mongoose.Types.ObjectId,
        required: true
      },
      userFrom: {
        type: mongoose.Types.ObjectId,
        required: true
      },
      status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
      },
      amountFrom: {
        type: Number,
        required: true,
        default: 0
      },
      amountTo: {
        type: Number,
        required: true,
        default: 0
      }
    },
    {
      versionKey: false,
      timestamps: true
    }
  )

  
ReferredSchema.plugin(mongoosePaginate)
ReferredSchema.plugin(aggregatePaginate)
const referredUserModel = mongoose.model('referredUser', ReferredSchema)
export default referredUserModel
