import {Router} from "express";
import fs from 'fs'
import path from "path";
const router  = Router();

const RemoveExtension = (fileName: string) => {
    return  fileName.replace(/\.[^/.]+$/, "");
}
fs.readdirSync(__dirname).filter((fileOrDir) =>{
    const dir = fileOrDir;
    // Verifica que sea un directorio antes de intentar leer su contenido
    if (fileOrDir !== 'index.js') {
            fs.readdirSync(`${__dirname}/${fileOrDir}`).filter((file) => {
                console.log(`./${ fileOrDir }/${ file }`);
                const name = RemoveExtension(file); 
                console.log(name);
                router.use(`/${name}`,require(`./${ fileOrDir }/${ file }`).default);
        });
    }

})

export default router
