import {Request, Response} from 'express';

// helpers
import { formateoRegistroUltimaCancion, formatoUpdateUltimaCancion} from '../../helpers/formatoData';


// messages
import {msgError, msgSuccess} from './dto';

// Models
import UltimaCancion from './model';


export const create = async (req: Request, res: Response) => {

    try{

        const nuevoUltimaCancion =  formateoRegistroUltimaCancion(req);
    
        await nuevoUltimaCancion.save();

        res.status(200).send(msgSuccess('Petion Realizado Exitosamente.', nuevoUltimaCancion));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};


export const get = async (req: Request, res: Response) => {

    try{

        const idUsuario = req.params.id;

        const ultimaCancionDB = await UltimaCancion.findOne({usuario: idUsuario});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', ultimaCancionDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};


export const gets = async (req: Request, res: Response) => {

    try{
        const pagina: any = req.params.pagina || 1;

        const ultimaCancionDB: any = await UltimaCancion.paginate({}, {limit: 9, page: pagina});

        if(ultimaCancionDB == "") return res.status(200).send(msgSuccess('No Existen ninguna CancionListaReproduccion'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', ultimaCancionDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};


export const update = async (req: Request, res: Response) => {
    try{

        const idUltimaCancion = req.params.id;
        const updateData = formatoUpdateUltimaCancion(req);


        const ultimaCancionNuevo = await UltimaCancion.findByIdAndUpdate(idUltimaCancion, updateData,{new: true});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', ultimaCancionNuevo));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};



export const deleteUltimaCancion = async (req: Request, res: Response) => {
    try{

        const idUltimaCancion = req.params.id;

        await UltimaCancion?.remove({_id:idUltimaCancion});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente'));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

