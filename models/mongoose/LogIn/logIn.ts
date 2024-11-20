import mongoTenant from "mongo-tenant";
import { model, Schema } from "mongoose";


const UserLoginAccess = new  Schema({
    email: { type: String, lowarcase: true, required : true,   },
    ip: { type: String, required : true   },
    browser: { type: String, required : true   },
    country: { type: String, required : true   }
},{
    versionKey:false,
    timestamps: true,
}
)
UserLoginAccess.plugin(mongoTenant)
const UserLoginAccessModel = model('UserLoginAccess',UserLoginAccess)
export default UserLoginAccessModel