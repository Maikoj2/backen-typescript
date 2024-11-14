import  express, { Express, Request,  Response }  from "express";


const app:Express = express();

interface LoginResponse {
    ok: boolean;
    message: string;
    data: string;
    total: string;
  }

app.get('/', (req:Request , res:Response ) => {

    return  res.status(200).json({
        ok: true,
        message: 'message',
        data: 'data',
        total: 'count'
    }) as any
})

export default app