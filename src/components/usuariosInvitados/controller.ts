import {Request, Response} from 'express';

// helpers
import { formateoRegistroUsuariosInvitados} from '../../helpers/formatoData';


// messages
import {msgError, msgSuccess} from './dto';

// Models
import UsuariosInvitados from './model';


export const create = async (req: Request, res: Response) => {

    try{

        const nuevoUsuariosInvitados =  formateoRegistroUsuariosInvitados(req);
    
        await nuevoUsuariosInvitados.save();

        res.status(200).send(msgSuccess('Petion Realizado Exitosamente.', nuevoUsuariosInvitados));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};


export const get = async (req: Request, res: Response) => {

    try{

        const idUsuariosInvitados = req.params.id;

        const usuariosInviatdosDB = await UsuariosInvitados.findById(idUsuariosInvitados);

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', usuariosInviatdosDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }

};


export const gets = async (req: Request, res: Response) => {

    try{

        const listaReproduccionID = req.params.id;

        const usuariosInvitadosDB: any = await UsuariosInvitados.find({listaReproduccion: listaReproduccionID});

        if(usuariosInvitadosDB == "") return res.status(200).send(msgSuccess('No Existen ninguna UsuarioInvitado'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', usuariosInvitadosDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};


export const getsPorIdUsuario= async (req: Request, res: Response) => {

    try{

        const idUsuario = req.params.idUsuario;

        const usuariosInvitadosDB: any = await UsuariosInvitados.find({usuario: idUsuario});

        if(usuariosInvitadosDB == "") return res.status(200).send(msgSuccess('No Existen ninguna UsuarioInvitado'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', usuariosInvitadosDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

export const deleteUsuriosInvitados = async (req: Request, res: Response) => {
    try{

        const idCLR = req.params.id;

        await UsuariosInvitados?.remove({_id:idCLR});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente'));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};
