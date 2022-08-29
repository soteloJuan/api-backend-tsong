import {Request, Response} from 'express';
import fs from 'fs-extra';


// helpers
import {formateoRegistroAlbum, formatoUpdateAlbum} from '../../helpers/formatoData';

// Servicices
import {subirImagenService, eliminarImagenService} from '../../services/cloudinary.service';

// messages
import {msgError, msgSuccess} from './dto';

// Models
import Album from './model';


export const create = async (req: Request, res: Response) => {

    try{

        const nuevoAlbum =  formateoRegistroAlbum(req);
    
        await nuevoAlbum.save();

        res.status(200).send(msgSuccess('Petion Realizado Exitosamente.', nuevoAlbum));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
};


export const get = async (req: Request, res: Response) => {

    try{

        const idAlbum = req.params.id;

        const albumDB = await Album.findById(idAlbum);

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', albumDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }

}


export const gets = async (req: Request, res: Response) => {

    try{

        const pagina: any = req.params.pagina || 1;

        const albumDB: any = await Album.paginate({}, {limit: 12, page: pagina});

        if(albumDB.docs == '') return res.status(200).send(msgSuccess('No Existen Albums'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', albumDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}

export const getsNoPaginado = async (req: Request, res: Response) => {

    try{
        const albumDB: any = await Album.find();

        if(albumDB == '') return res.status(200).send(msgSuccess('No Existen Albums'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', albumDB));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}

export const getsPorArtista = async (req: Request, res: Response) => {

    try{
        const idArtista: string = req.params.idArtista;
        const albumDB: any = await Album.find({artista: idArtista});

        if(albumDB == '') return res.status(200).send(msgSuccess('No Existen Albums'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', albumDB));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
}


export const getsPorArtistaPaginado = async (req: Request, res: Response) => {

    try{

        const idArtista: string = req.params.idArtista;
        const pagina: any = req.params.pagina || 1;


        const albumDB: any =  await Album.paginate({artista: idArtista},{limit: 12, page: pagina});

        if(albumDB.docs == '') return res.status(200).send(msgSuccess('No Existen Album'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', albumDB));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
}


// Por el momento solo estamos buscando por el nombre y apellidos. Pero puede cambiar a otras cosas.
export const search = async (req: Request, res: Response) => {
    try{

        const termino = req.params.termino;
        const pagina: any = req.params.pagina || 1;
        const regex = new RegExp(termino, 'i'); // Expresion regular

        const albumDB: any =  await Album.paginate({$or:[{nombre: regex},{descripcion: regex}]},{limit: 12, page: pagina});

        if(albumDB.docs == '') return res.status(200).send(msgSuccess('No Existen Album'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', albumDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}




export const update = async (req: Request, res: Response) => {
    try{
        
        const idAlbum = req.params.id;
        const updateData = formatoUpdateAlbum(req);


        const albumNuevo = await Album.findByIdAndUpdate(idAlbum, updateData,{new: true});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', albumNuevo));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}




export const updateImagen = async (req: Request, res: Response) => {
    try{
        
        const idAlbum = req.params.id;
        const file = req.file;
        
        // Sino viene ningun archivo
        if(!file) return res.status(200).send(msgSuccess('Es necesario subir un archivo valido.'));
        
        
        const albumDB = await Album.findById(idAlbum);
        const imgIdOld = albumDB.imagenID || null;

        // Si existe un imagenID, enotnce lo eliminamos primero. Creo que seria recomendable acceder a la db y extraer la info
        if(imgIdOld != null && imgIdOld != 'null' && imgIdOld != undefined) await eliminarImagenService(imgIdOld);

        const rutaImg = req.file.path;
        const {imagenID, imagenURL} = await subirImagenService(rutaImg) as any;
        await fs.unlink(rutaImg);

        const nuevoAlbum = await Album.findByIdAndUpdate(idAlbum,{imagenID, imagenURL}, {new: true});


        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', nuevoAlbum));

    }catch(error){
        console.log(error);
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}


export const deleteImagen = async (req: Request, res: Response) => {
    try{

        const idAlbum = req.params.id;
        let albumDB = await Album.findById(idAlbum);
        const imgAlbum = albumDB.imagenID;

        if(imgAlbum != null && imgAlbum != 'null' && imgAlbum != undefined){
            await eliminarImagenService(imgAlbum);
            const imagenID= null, imagenURL= null;
            albumDB = await Album.findByIdAndUpdate(idAlbum,{imagenID, imagenURL}, {new: true});
        }

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', albumDB));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}





export const deleteAlbum = async (req: Request, res: Response) => {
    try{

        const idAlbum = req.params.id;

        const albumDB = await Album.findById(idAlbum);

        await albumDB.remove();

        const imgAlbum = albumDB.imagenID;

        if(imgAlbum != null && imgAlbum != 'null' && imgAlbum != undefined) await eliminarImagenService(imgAlbum);

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', albumDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}



// MUSICA PARA PROGRAMAR https://www.youtube.com/watch?v=n9Y2Eb4BaSg
// MUSICA PARA PROGRAMAR https://www.youtube.com/watch?v=H3QzSY-a4IQ












