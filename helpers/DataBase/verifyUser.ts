import { BuildErrorObject } from "../buildErrorObject"

export const verifyUserOnDataBase = async (user: any) => {
    return new Promise((resolve, reject) => {
      user.verified = true
      user.save((err: any , item: any) => {
        if (err) {
          reject(BuildErrorObject(422, err.message))
        }
        resolve({
          email: item.email,
          verified: item.verified
        })
      })
    })
  } 