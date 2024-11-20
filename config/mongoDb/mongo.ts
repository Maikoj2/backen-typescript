import { connect, connection } from "mongoose";

const DbConnection = () =>{
    const DB_URI  = process.env.DB_URI;
    const DB_NAME = process.env.DB_NAME
    if (!DB_URI || !DB_NAME) {
        console.error("Database URI or name is missing in environment variables.");
        return;
    }
    try {
         connect(DB_URI, {
            dbName: DB_NAME,
        });
        console.log("****** CONNECTION ESTABLISHED ******");
    } catch (error) {
        console.error("****** ERROR CONNECTING TO DATABASE ******", error);
    }

}

export default DbConnection