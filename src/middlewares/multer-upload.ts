import {v4 as uuidv4} from 'uuid';
import multer from 'multer';
import path from 'path';

const Storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename:(req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const fileFilterIMG = (req: any, file: any, cb: any) => {
    const tipoExtension: any= path.extname(file.originalname);

    const extensions = ['.png', '.jng', '.jpeg', '.gif', '.jpg', '.svg'];
    const haveExtension = extensions.includes(tipoExtension);
    if(!haveExtension)return cb(null, false);

    return cb(null, true);
};

const fileFilterCancion = (req: any, file: any, cb: any) => {
    const tipoExtension: any= path.extname(file.originalname).toLowerCase();
    const extensiones: Array<string> = extensionesDeAudio();

    if(!extensiones.includes(tipoExtension)) return cb(null, false);

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
    ];
};
