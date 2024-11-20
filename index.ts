import dotenv from 'dotenv'
import Server from './models/server/server';
import DbConnection from './config/mongoDb/mongo';

// configuration dotenv
dotenv.config();
// server configuration
const server = new Server();
DbConnection()

server.Listen();

