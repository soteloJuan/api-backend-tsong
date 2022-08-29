import {Request} from 'express';
import {v4 as uuidv4} from 'uuid';
import multer from 'multer';
import path from 'path';




// Ruta de almacenamiento

const Storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename:(req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const fileFilterIMG = (req: any, file: any, cb: any) => {
    const tipoExtension: any= path.extname(file.originalname);

    // Si no cumple con algunas de la condiones entonces se rechaza
    if(tipoExtension != '.png' && tipoExtension != '.jng' && tipoExtension != '.jpeg' && tipoExtension != '.gif' && tipoExtension != '.jpg' ){
        return cb(null, false);
    }

    return cb(null, true);
};
const fileFilterCancion = (req: any, file: any, cb: any) => {
    const tipoExtension: any= path.extname(file.originalname).toLowerCase();
    const extensiones: Array<String> = extensionesDeAudio();

    // Si no cumple con algunas de la condiones entonces se rechaza
    if(!extensiones.includes(tipoExtension)){
        return cb(null, false);
    }

    return cb(null, true);
};


export const uploadImagen = multer({storage:Storage, fileFilter: fileFilterIMG});

export const uploadCancion = multer({storage:Storage, fileFilter: fileFilterCancion});







const extensionesDeAudio = (): Array<string> => {
    return [
        '.mp3',
        '.mp4',
        '.wav',
        '.aiff',
        '.wma',
        '.ogg',
        '.flac',
        '.fla' ,
        '.alac',
        '.dsd',
        '.aac',
        'dsd',
        'midi'
    ]
}