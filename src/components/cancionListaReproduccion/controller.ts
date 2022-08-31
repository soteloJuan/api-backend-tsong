import {Request, Response} from 'express';

// helpers
import { formateoRegistroCancionListaReproduccion } from '../../helpers/formatoData';


// messages
import {msgError, msgSuccess} from './dto';

// Models
import CancionListaReproduccion from './model';

/******************  CLR = CancionListaReproduccion    ********************************/

export const create = async (req: Request, res: Response) => {

    try{

        const nuevoCLR =  formateoRegistroCancionListaReproduccion(req);
    
        await nuevoCLR.save();

        res.status(200).send(msgSuccess('Petion Realizado Exitosamente.', nuevoCLR));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};


export const get = async (req: Request, res: Response) => {

    try{

        const idCLR = req.params.id;

        const CLRDB = await CancionListaReproduccion.findById(idCLR);

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', CLRDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }

};


export const gets = async (req: Request, res: Response) => {

    try{

        const listaReproduccionID = req.params.id;

        const CLRBDB: any = await CancionListaReproduccion.find({listaReproduccion: listaReproduccionID});

        if(CLRBDB == "") return res.status(200).send(msgSuccess('No Existen ninguna CancionListaReproduccion'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', CLRBDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

export const deleteCancionListareproduccion = async (req: Request, res: Response) => {
    try{

        const idCLR = req.params.id;

        await CancionListaReproduccion?.remove({_id:idCLR});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente'));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};
