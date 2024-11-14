import dotenv from 'dotenv'
import Server from './models/server';
// configuration dotenv
dotenv.config();
// server configuration
const server = new Server();

server.Listen();

