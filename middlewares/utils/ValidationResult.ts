import { NextFunction, Request ,Response } from "express";
import { validationResult } from "express-validator";
import { handleError } from "../../controllers/auth/models/authValidates";
import { BuildErrorObject } from "../../helpers";

interface CustomRequest extends Request {
    body: {
      email?: string;  // Si tienes más campos en req.body, añádelos aquí
    };
    clientAccount?: string;
  }
const validationResultMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void  => {
    try {
        validationResult(req).throw();
        if (req.body.email) {
            req.body.email = req.body.email.toLocaleLowerCase()  
        }     
        return next();
    } catch (error:any ) {
        return handleError(res , BuildErrorObject(422, error.array()) )
    }
}

export default {
    validationResultMiddleware,
}