import { Response } from "express";
import { CustomRequest } from "../../models";
import { matchedData } from "express-validator";
import { BuildErrorObject, saveRegister, searchByEmail, searchByTenant, verificationExistsByTenant, verifyUserOnDataBase } from "../../helpers";
import SettingsModel from "../../models/mongoose/settings/settings";
import UserModel from "../../models/mongoose/User/user";
import { handleError } from "./models";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mongoose from "mongoose";
import { activePlugins } from "../plugins/plugins";
import referredUserModel from "../../models/mongoose/referedUser/referedUser";
const secret: any = process.env.JWT_SECRET
const key = crypto.scryptSync(secret, 'salt', 24)
const algorithm = 'aes-192-cbc'
const iv = Buffer.alloc(16, 0)

export const Register = async (req: CustomRequest, res: Response) => {
    try {
        const tenant = req.clientAccount;
        console.log('Request body:', req.body);
        // req = matchedData(req)
        const { body } = req

        const exist = await searchByTenant(tenant, SettingsModel, []);
        
        // Si ya existe un tenant, se devuelve un error
        if (exist) return handleError(res, BuildErrorObject(422, 'tenant already exists'));

        // Verifica si el correo electrónico ya existe
        const doesEmailExists = await searchByEmail(body.email, UserModel, tenant);
        if (!doesEmailExists) {
            const model = UserModel.byTenant(tenant);
            const user = new model({
                name: body.name,
                email: body.email,
                password: body.password,
                role: "admin",
                verification: v4()
            });

            try {
                // Se espera el resultado del saveRegister
                const item: any = await saveRegister(user);
                console.log("User saved:", item);

                // Aquí defines 'settings' correctamente
                const settingsModel = SettingsModel.byTenant(tenant);
                const settings = new settingsModel({
                    name: req.body.name,
                    currency: null,
                    logo: null,
                    owner: item._id,  // Suponiendo que 'item' es el usuario guardado
                });

                await saveRegister(settings);  // Guarda los ajustes
                console.log('Settings saved');

                // Activa los plugins y continúa con el flujo
                 activePlugins(['excelImport', 'pdfImport'], tenant);
                const userInfo = setUserInfo(item);
                await registerUserReferred(req.userReferred, item);
                const response = await returnRegisterToken(item, userInfo, tenant)
                res.status(201).json(response)
            } catch (error) {
                console.error("Error saving user:", error);
                return handleError(res, BuildErrorObject(500, 'Error saving user'));
            }
        }
    } catch (error) {
        console.error("Error:", error);
        return handleError(res, BuildErrorObject(500, 'Internal Server Error'));
    }
}

const returnRegisterToken = async (item: any , userInfo:  any , tenant: any) => {
    if (process.env.NODE_ENV !== 'production') {
      userInfo.verification = item.verification
    }
    const data = {
      session: generateToken(item._id),
      user: userInfo,
      settings: await getSettings(tenant)
    }
    return data
  }

  
const generateToken = (user: any) => {
    // Gets expiration time
    const min: any = process.env.JWT_EXPIRATION_IN_MINUTES? process.env.JWT_EXPIRATION_IN_MINUTES: 60
    const expiration =
      Math.floor(Date.now() / 1000) + 60 * min
  
    // returns signed and encrypted token
    return encrypt(
      jwt.sign(
        {
          data: {
            _id: user
          },
          exp: expiration
        },
        process.env.JWT_SECRET? process.env.JWT_SECRET: 'cjhakjshdkjshd'
      )
    )
  }
/**
 * Save refcode
 */

const getSettings = async (tenant = null) => {
    try {
      const user = await SettingsModel
        .byTenant(tenant)
        .findOne(
          {}, 
          'currency currencySymbol logo name tenantId plugins.path language planDate'
        );
      
      if (!user) {
        throw new Error('Settings not found for tenant');
      }
  
      return user;
    } catch (error) {
      throw BuildErrorObject(422, 'NOT_SETTINGS_FOR_TENANT');
    }
  }
  

const encrypt = (text: any )=> {
    const cipher = crypto.createCipheriv(algorithm, key, iv)

    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return encrypted
  },

const registerUserReferred = async (codeRef: any, userTo: any) => {
    if (codeRef) {
      const referredUser:any = await findUserByRefCode(codeRef)
      const body = {
        userTo: userTo._id,
        userFrom: referredUser._id,
        amountFrom: 1,
        amountTo: 1
      }
      await referredUserModel.create(body)
    }
  }
  const findUserByRefCode = (referredCode: any) => {
    return new Promise((resolve, reject) => {
      UserModel.findOne(
        {
          referredCode
        },
        (err: any, item: any) => {
          reject(err)
          resolve(item)
        }
      )
    })
  }
const setUserInfo = (req:any ) => {
    let user:any  = {
      _id: req._id,
      name: req.name,
      email: req.email,
      role: req.role,
      verified: req.verified,
      stepper: req.stepper,
      avatar: req.avatar,
      settings: req.settings,
      referredCode: req.referredCode
    }
    // Adds verification for testing purposes
    if (process.env.NODE_ENV !== 'production') {
      user = {
        ...user,
        verification: req.verification
      }
    }
    return user
  }
export const Verify = async (req: CustomRequest, res: Response) => {
    try {
        const tenant = req.clientAccount;
        req = matchedData(req)
        const user = await verificationExistsByTenant(tenant, UserModel, req.id)
        res.status(200).json(await verifyUserOnDataBase(user))
    } catch (error) {
        handleError(res, error)
    }

}