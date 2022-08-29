import {Request, Response} from 'express';
import fs from 'fs-extra';


// helpers
import {formateoRegistroListaReproduccion, formatoUpdateListaReproduccion} from '../../helpers/formatoData';

// Servicices
import {subirImagenService, eliminarImagenService} from '../../services/cloudinary.service';

// messages
import {msgError, msgSuccess} from './dto';

// Models
import ListaReproduccion from './model';


export const create = async (req: Request, res: Response) => {

    try{

        const nuevoListaReproduccion =  formateoRegistroListaReproduccion(req);
    
        await nuevoListaReproduccion.save();

        res.status(200).send(msgSuccess('Petion Realizado Exitosamente.', nuevoListaReproduccion));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
};


export const get = async (req: Request, res: Response) => {

    try{

        const idListaReproduccion = req.params.id;

        const listaReproduccionDB = await ListaReproduccion.findById(idListaReproduccion);

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', listaReproduccionDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }

}


export const gets = async (req: Request, res: Response) => {

    try{

        const pagina: any = req.params.pagina || 1;
        const usuarioID = req.params.id;

        const listaReproduccionDB: any = await ListaReproduccion.paginate({usuario: usuarioID}, {limit: 12, page: pagina});

        if(listaReproduccionDB.docs == '') return res.status(200).send(msgSuccess('No Existen Listas de Reproducción'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', listaReproduccionDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}

export const getsGeneral = async (req: Request, res: Response) => {

    try{

        const pagina: any = req.params.pagina || 1;

        const listaReproduccionDB: any = await ListaReproduccion.paginate( {},{limit: 12, page: pagina});

        if(listaReproduccionDB.docs == '') return res.status(200).send(msgSuccess('No Existen Listas de Reproducción'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', listaReproduccionDB));

    }catch(error){
        console.log('Este es el error : ', error);
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}


export const search = async (req: Request, res: Response) => {
    try{

        const termino = req.params.termino;
        const idUsuario = req.params.id;
        const pagina: any = req.params.pagina || 1;
        const regex = new RegExp(termino, 'i'); // Expresion regular

        const listaReproduccionDB: any =  await ListaReproduccion.paginate({nombre: regex, usuario: idUsuario},{limit: 12, page: pagina});

        if(listaReproduccionDB.docs == '') return res.status(200).send(msgSuccess('No Existen Lista de Reproduccion'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', listaReproduccionDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}


export const searchGeneral = async (req: Request, res: Response) => {
    try{

        const termino = req.params.termino;
        const pagina: any = req.params.pagina || 1;
        const regex = new RegExp(termino, 'i'); // Expresion regular

        const listaReproduccionDB: any =  await ListaReproduccion.paginate({nombre: regex}, {limit: 12, page: pagina});

        if(listaReproduccionDB.docs == '') return res.status(200).send(msgSuccess('No Existen Lista de Reproduccion'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', listaReproduccionDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}



export const update = async (req: Request, res: Response) => {
    try{
        
        const idListaReproduccion = req.params.id;
        const updateData = formatoUpdateListaReproduccion(req);

        const listaReproduccionNuevo = await ListaReproduccion.findByIdAndUpdate(idListaReproduccion, updateData,{new: true});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', listaReproduccionNuevo));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}




export const updateImagen = async (req: Request, res: Response) => {
    try{

        const idListaReproduccion = req.params.id;
        const file = req.file;

        // Sino viene ningun archivo
        if(!file) return res.status(200).send(msgSuccess('Es necesario subir un archivo valido.'));
        
        
        const listaReproduccionDB = await ListaReproduccion.findById(idListaReproduccion);
        const imgIdOld = listaReproduccionDB.imagenID || null;

        // Si existe un imagenID, enotnce lo eliminamos primero. Creo que seria recomendable acceder a la db y extraer la info
        if(imgIdOld != null && imgIdOld != 'null' && imgIdOld != undefined) await eliminarImagenService(imgIdOld);

        const rutaImg = req.file.path;
        const {imagenID, imagenURL} = await subirImagenService(rutaImg) as any;
        await fs.unlink(rutaImg);

        const nuevoAlbum = await ListaReproduccion.findByIdAndUpdate(idListaReproduccion,{imagenID, imagenURL}, {new: true});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', nuevoAlbum));

    }catch(error){
        console.log(error);
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}


export const deleteImagen = async (req: Request, res: Response) => {
    try{

        const idListaReproduccion = req.params.id;
        let listaReproduccionDB = await ListaReproduccion.findById(idListaReproduccion);
        const imgListaReproduccion = listaReproduccionDB.imagenID;

        if(imgListaReproduccion != null && imgListaReproduccion != 'null' && imgListaReproduccion != undefined){
            await eliminarImagenService(imgListaReproduccion);
            const imagenID= null, imagenURL= null;
            listaReproduccionDB = await ListaReproduccion.findByIdAndUpdate(idListaReproduccion,{imagenID, imagenURL}, {new: true});
        }

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', listaReproduccionDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}


export const deleteListaReproduccion = async (req: Request, res: Response) => {

    try{

        const idListaReproduccion = req.params.id;

        const listaReproduccionDB: any = await ListaReproduccion.findById(idListaReproduccion).exec();

        await listaReproduccionDB.remove();


        const imgAlbum = listaReproduccionDB.imagenID;

        if(imgAlbum != null && imgAlbum != 'null' && imgAlbum != undefined) await eliminarImagenService(imgAlbum);


        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', listaReproduccionDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }

}
