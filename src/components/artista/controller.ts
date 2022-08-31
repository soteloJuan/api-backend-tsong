import {Request, Response} from 'express';
import fs from 'fs-extra';


// helpers
import {formateoRegistroArtista, formatoUpdateArtista} from '../../helpers/formatoData';

// Servicices
import {subirImagenService, eliminarImagenService} from '../../services/cloudinary.service';

// messages
import {msgError, msgSuccess} from './dto';

// Models
import Artista from './model';


export const create = async (req: Request, res: Response) => {

    try{

        const nuevoArtista =  formateoRegistroArtista(req);
    
        await nuevoArtista.save();

        res.status(200).send(msgSuccess('Petion Realizado Exitosamente.', nuevoArtista));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};


export const get = async (req: Request, res: Response) => {

    try{

        const idArtista = req.params.id;

        const artistaDB = await Artista.findById(idArtista);

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', artistaDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }

};



export const gets = async (req: Request, res: Response) => {

    try{

        const pagina: any = req.params.pagina || 1;

        const artistasDB: any = await Artista.paginate({}, {limit: 12, page: pagina});

        if(artistasDB.docs == '') return res.status(200).send(msgSuccess('No Existen Artistas'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', artistasDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

export const getsNoPaginado = async (req: Request, res: Response) => {

    try{


        const artistasDB: any = await Artista.find();


        if(artistasDB == '') return res.status(200).send(msgSuccess('No Existen Artistas'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', artistasDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

export const search = async (req: Request, res: Response) => {
    try{

        const termino = req.params.termino;
        const pagina: any = req.params.pagina || 1;
        const regex = new RegExp(termino, 'i'); // Expresion regular

        const artistasDB: any =  await Artista.paginate({$or:[{nombre: regex},{descripcion: regex}]},{limit: 12, page: pagina});

        if(artistasDB.docs == '') return res.status(200).send(msgSuccess('No Existen Artistas'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', artistasDB));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};




export const update = async (req: Request, res: Response) => {
    try{
        
        const idArtista = req.params.id;
        const updateData = formatoUpdateArtista(req);


        const artistaNuevo = await Artista.findByIdAndUpdate(idArtista, updateData,{new: true});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', artistaNuevo));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};




export const updateImagen = async (req: Request, res: Response) => {
    try{
        
        const idArtista = req.params.id;
        const file = req.file;

        if(!file) return res.status(200).send(msgSuccess('Es necesario subir un archivo valido.'));
        
        const artistaDB = await Artista.findById(idArtista);
        
        
        const imgIdOld = artistaDB.imagenID || null;
        
        if(imgIdOld != null && imgIdOld != 'null' && imgIdOld != undefined) await eliminarImagenService(imgIdOld);
        
        const rutaImg = req.file.path;
        const {imagenID, imagenURL} = await subirImagenService(rutaImg) as any;
        await fs.unlink(rutaImg);

        const nuevoArtista = await Artista.findByIdAndUpdate(idArtista,{imagenID, imagenURL}, {new: true});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', nuevoArtista));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};


export const deleteImagen = async (req: Request, res: Response) => {
    try{

        const idArtista = req.params.id;
        let artistaDB = await Artista.findById(idArtista);
        const imgArtista = artistaDB.imagenID;

        if(imgArtista != null && imgArtista != 'null' && imgArtista != undefined){
            await eliminarImagenService(imgArtista);
            const imagenID= null, imagenURL= null;
            artistaDB = await Artista.findByIdAndUpdate(idArtista,{imagenID, imagenURL}, {new: true});
        }

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', artistaDB));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};




export const deleteArtista = async (req: Request, res: Response) => {
    try{

        const idArtista = req.params.id;

        const artistaDB = await Artista.findById(idArtista);

        await artistaDB.remove();

        const imgArtista = artistaDB.imagenID;

        if(imgArtista != null && imgArtista != 'null' && imgArtista != undefined) await eliminarImagenService(imgArtista);

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', artistaDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};


