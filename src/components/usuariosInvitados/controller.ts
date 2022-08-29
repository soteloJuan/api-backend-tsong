import {Request, Response} from 'express';
import fs from 'fs-extra';


// helpers
import { formateoRegistroUsuariosInvitados} from '../../helpers/formatoData';


// messages
import {msgError, msgSuccess} from './dto';

// Models
import UsuariosInvitados from './model';


export const create = async (req: Request, res: Response) => {

    try{

        const nuevoUsuariosInvitados =  formateoRegistroUsuariosInvitados(req);
    
        await nuevoUsuariosInvitados.save(); // Aqui vamos

        res.status(200).send(msgSuccess('Petion Realizado Exitosamente.', nuevoUsuariosInvitados));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
};


export const get = async (req: Request, res: Response) => {

    try{

        const idUsuariosInvitados = req.params.id;

        const usuariosInviatdosDB = await UsuariosInvitados.findById(idUsuariosInvitados);

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', usuariosInviatdosDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }

}


export const gets = async (req: Request, res: Response) => {

    try{

        const listaReproduccionID = req.params.id;

        const usuariosInvitadosDB: any = await UsuariosInvitados.find({listaReproduccion: listaReproduccionID});

        if(usuariosInvitadosDB == "") return res.status(200).send(msgSuccess('No Existen ninguna UsuarioInvitado'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', usuariosInvitadosDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
}


export const getsPorIdUsuario= async (req: Request, res: Response) => {

    try{

        const idUsuario = req.params.idUsuario;

        const usuariosInvitadosDB: any = await UsuariosInvitados.find({usuario: idUsuario});

        if(usuariosInvitadosDB == "") return res.status(200).send(msgSuccess('No Existen ninguna UsuarioInvitado'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', usuariosInvitadosDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
}


// // Por el momento solo estamos buscando por el nombre y apellidos. Pero puede cambiar a otras cosas.
// // export const search = async (req: Request, res: Response) => {
// //     try{

// //         const termino = req.params.termino;
// //         const pagina: any = req.params.pagina || 1;
// //         const regex = new RegExp(termino, 'i'); // Expresion regular

// //         const albumDB: any =  await Album.paginate({$or:[{nombre: regex},{descripcion: regex}]},{limit: 9, page: pagina});

// //         if(albumDB.docs == '') return res.status(200).send(msgSuccess('No Existen Album'));

// //         res.status(200).send(msgSuccess('Peticion realizado Exitosamente', albumDB));

// //     }catch(error){
// //         res.status(500).json(msgError('Contacte con el administrador'))
// //     }
// // }


// // Por el momento solo estamos buscando por el nombre y apellidos. Pero puede cambiar a otras cosas.
// // export const update = async (req: Request, res: Response) => {
// //     try{

// //         const idCLR = req.params.id;
// //         const updateData = formatoUpdateListaReproduccion(req);


// //         const CLRNuevo = await CancionListaReproduccion.findByIdAndUpdate(idCLR, updateData,{new: true});

// //         res.status(200).send(msgSuccess('Peticion realizado Exitosamente', CLRNuevo));


// //     }catch(error){
// //         res.status(500).json(msgError('Contacte con el administrador'))
// //     }
// // }



export const deleteUsuriosInvitados = async (req: Request, res: Response) => {
    try{

        const idCLR = req.params.id;

        await UsuariosInvitados?.remove({_id:idCLR});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente'));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}



// MUSICA PARA PROGRAMAR https://www.youtube.com/watch?v=n9Y2Eb4BaSg
// MUSICA PARA PROGRAMAR https://www.youtube.com/watch?v=H3QzSY-a4IQ












