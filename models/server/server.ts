import express, {  Application } from 'express';
import cors from  'cors';
import bodyParser from 'body-parser';
import Path from '../../pathresolverRoutes';


 

class Server {
    
    private app: Application;
    private Port: string ;
    constructor() {
        this.app = express()
        this.Port = process.env.PORT || '8000'
        this.middleWare();
        this.routes();
    }
    middleWare() {
        this.app.use(express.static('public'));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors());
    }

    Listen() {
        this.app.listen(this.Port, () => {
            console.log('listening on port ' + this.Port);    
        });
        
    
    }
    routes() {
        /** dinamic rutes */
        // console.log(__dirname + Path.routes)
        this.app.use('/', require(Path.routes).default);
    }
}
export default Server;