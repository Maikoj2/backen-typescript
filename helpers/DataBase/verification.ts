import { Model } from "mongoose";

export const verificationExistsByTenant = (tenant: any, collection: any, id: any) => {
    return new Promise((resolve, reject) => {
        collection
            .byTenant(tenant)
            .findOne({
                verification: id,
                verified: false
            },(err: any, foundData: any) => {
                (err) ?
                    reject(err) :
                    resolve(foundData)
            })
            

    })

}