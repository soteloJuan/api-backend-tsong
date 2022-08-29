import {Request, Response} from 'express';
import bcryptjs from 'bcryptjs';

// models
import Administrador from '../administrador/model';

// Helpers
import {formateoLogin} from '../../helpers/formatoData';
import {generarJWT} from '../../helpers/generar-jwt';

// mensages
import {msgError} from './dto';
import {msgSuccess} from './dto';

export const login = async(req: Request, res: Response) =>{
    try{

        const loginData =  formateoLogin(req);

        const administrador = await Administrador.findOne({email: loginData.email});
        if(!administrador) return res.status(400).json(msgError('Datos incorrectos'));

        const validarPassword = bcryptjs.compareSync(loginData.password, administrador.password);
        if(!validarPassword) return res.status(400).json(msgError('Datos incorrectos'));
        
        if(administrador.bloqueado) return res.status(400).json(msgError('Usuario Bloqueado'));
        if(!administrador.confirmarCorreo) return res.status(400).json(msgError('Aun no ha confirmado su correo'));

        
        const token: any = await generarJWT(administrador._id);

        res.status(200).json(msgSuccess('Loguiado Correctamente', administrador, token));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }

};

export const confirmarCorreo = async (req: Request, res: Response) => {

    try{

        const idAdministrador = req.id;

        await Administrador.findByIdAndUpdate( idAdministrador, {confirmarCorreo: true})

        res.status(200).json({
            ok: true,
            mensaje: 'El Administrador a confirmado su correo.',
        });

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }

}



export const renewToken = async (req: Request, res: Response) => {

    const idAdministrador = req.id;

    try {
        
        const token: any = await generarJWT(idAdministrador);

        res.status(200).json({
            ok:true,
            token,
            id: idAdministrador
        });
    }

    catch (error) {
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}







