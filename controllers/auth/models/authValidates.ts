import {Request, Response} from 'express';

interface errorMessage {
 code: number;
 message: any;

} 
export const handleSuccessProcess =(req: Request, res:Response) => {
    try {
        
    } catch (error) {
        
    }
}

export const handleError = ( res: Response, err: any) => {
    try {

        // Prints error in console
        if (process.env.NODE_ENV === 'development') {
          console.log(err)
        } else {
        //   if (typeof err === 'object') {
        // //     if (err.message) {
        // //       loggerSlack.write(`\n ⚠️ MESSAGE ==> ${err.message}`)
        // //     }
        // //     if (err.stack) {
        // //       loggerSlack.write(`\n ⛔️ STACKTRACE: ==> ${err.stack}`)
        // //     }
        // //   } else {
        // //     loggerSlack.write(`\n ❌ ONLY_MESSAGE: ==> ${err.stack}`)
        // //   }
    
        }
        // Sends error to user
        res.status(err.code).json({
          errors: {
            msg: err.message
          }
        })
      } catch (e) {
        console.log(e)
        res.status(500).json({
          errors: {
            msg: 'UNDEFINED_ERROR_SHOW_LOG',
            err: err
          }
        })
      }
}

