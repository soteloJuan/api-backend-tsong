import {Request, Response} from 'express';
import fs from 'fs-extra';


// helpers
import {formateoRegistroCancion, formatoUpdateCancion} from '../../helpers/formatoData';

// Servicices
import {subirImagenService, eliminarImagenService} from '../../services/cloudinary.service';
import {uploadFileFirebase, deleteFileFirebase} from '../../services/firebase.service';

// messages
import {msgError, msgSuccess} from './dto';

// Models
import Cancion from './model';


export const create = async (req: Request, res: Response) => {

    try{

        const nuevaCancion =  formateoRegistroCancion(req);
    
        await nuevaCancion.save();

        res.status(200).send(msgSuccess('Petion Realizado Exitosamente.', nuevaCancion));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};


export const get = async (req: Request, res: Response) => {

    try{

        const idCancion = req.params.id;

        const cancionDB = await Cancion.findById(idCancion);

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', cancionDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }

};


export const gets = async (req: Request, res: Response) => {

    try{

        const pagina: any = req.params.pagina || 1;

        const cancionDB: any = await Cancion.paginate({}, {limit: 12, page: pagina});

        if(cancionDB.docs == '') return res.status(200).send(msgSuccess('No Existen Canciones'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', cancionDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

export const getsPorAlbum = async (req: Request, res: Response) => {

    try{

        const idAlbum: string = req.params.idAlbum;

        const cancionDB: any =  await Cancion.find({album: idAlbum});

        if(cancionDB == '') return res.status(200).send(msgSuccess('No Existen Canciones'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', cancionDB));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};


export const getsPorAlbumPaginado = async (req: Request, res: Response) => {

    try{

        const idAlbum: string = req.params.idAlbum;
        const pagina: any = req.params.pagina || 1;

        const cancionDB: any =  await Cancion.paginate({album: idAlbum},{limit: 12, page: pagina});

        if(cancionDB.docs == '') return res.status(200).send(msgSuccess('No Existen Canciones'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', cancionDB));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

export const search = async (req: Request, res: Response) => {
    try{

        const termino = req.params.termino;
        const pagina: any = req.params.pagina || 1;
        const regex = new RegExp(termino, 'i'); // Expresion regular

        const cancionDB: any =  await Cancion.paginate({$or:[{nombre: regex},{genero: regex}]},{limit: 12, page: pagina});

        if(cancionDB.docs == '') return res.status(200).send(msgSuccess('No Existen Canciones'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', cancionDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};




export const update = async (req: Request, res: Response) => {
    try{
        
        const idCancion = req.params.id;
        const updateData: any = formatoUpdateCancion(req);

        const cancionNuevo = await Cancion.findByIdAndUpdate(idCancion, updateData,{new: true});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', cancionNuevo));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

export const updateCancion = async (req: Request, res: Response) => { // AQUI VAMOS A MODIFICAR DONDE UTILIZAMOS EL SERVICIO DE DIGITAL OCEAN
    try{
        
        const idCancion = req.params.id;
        const file = req.file;
        
        if(!file) return res.status(409).send(msgError('Es necesario subir un archivo valido.'));
        
        const cancionDB = await Cancion.findById(idCancion);
        const fileOLD = cancionDB.cancionID || null;

        if(fileOLD != null && fileOLD != 'null' && fileOLD != undefined) await deleteFileFirebase(fileOLD);

        const rutaFile = req.file.path;
        const nameFile = req.file.filename;

        const resultadoURL = await uploadFileFirebase(rutaFile);

        await fs.unlink(rutaFile);

        const nuevaCancion = await Cancion.findByIdAndUpdate(idCancion,{cancionURL:resultadoURL, cancionID:nameFile}, {new: true});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', nuevaCancion));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};



export const updateImagen = async (req: Request, res: Response) => {
    try{
        
        const idCancion = req.params.id;
        const file = req.file;
        
        if(!file) return res.status(409).send(msgError('Es necesario subir un archivo valido.'));        
        
        const cancionDB = await Cancion.findById(idCancion);
        const imgIdOld = cancionDB.imagenID || null;

        if(imgIdOld != null && imgIdOld != 'null' && imgIdOld != undefined) await eliminarImagenService(imgIdOld);

        const rutaImg = req.file.path;
        const {imagenID, imagenURL} = await subirImagenService(rutaImg) as any;
        await fs.unlink(rutaImg);

        const nuevaCancion = await Cancion.findByIdAndUpdate(idCancion,{imagenID, imagenURL}, {new: true});


        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', nuevaCancion));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};


export const deleteImagen = async (req: Request, res: Response) => {
    try{

        const idCancion = req.params.id;
        let cancionDB = await Cancion.findById(idCancion);
        const imgCancion = cancionDB.imagenID;

        if(imgCancion != null && imgCancion != 'null' && imgCancion != undefined){
            await eliminarImagenService(imgCancion);
            const imagenID= null, imagenURL= null;
            cancionDB = await Cancion.findByIdAndUpdate(idCancion,{imagenID, imagenURL}, {new: true});
        }

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', cancionDB));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};


export const deleteCancion = async (req: Request, res: Response) => {
    try{

        const idCancion = req.params.id;

        const cancionDB = await Cancion.findById(idCancion);

        await cancionDB.remove();

        const imagenID = cancionDB.imagenID;
        const cancionID = cancionDB.cancionID;

        if(imagenID != null && imagenID != 'null' && imagenID != undefined) await eliminarImagenService(imagenID);

        if(cancionID != null && cancionID != 'null' && cancionID != undefined) await deleteFileFirebase(cancionID);

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', cancionDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

