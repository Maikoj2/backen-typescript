import express, { Express, Request, Response } from "express";
import { AuthRoute } from "../../models/auth/authRoutes";
import { origin } from "../../middlewares";
import trimRequest from 'trim-request'
import { Register, Verify } from "../../controllers";


const app: Express = express();

interface LoginResponse {
    ok: boolean;
    message: string;
    data: string;
    total: string;
}

app.post(
    AuthRoute.VERIFY,
    origin.checkDomain,
    origin.checkTenant, 
    trimRequest.all, 
    Verify
)
app.post(
    AuthRoute.REGISTER,
    origin.checkDomain,
    origin.checkTenant, 
    trimRequest.all, 
    Register
)

export default app