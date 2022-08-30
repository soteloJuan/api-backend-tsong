import {Request, Response} from 'express';
import bcryptjs from 'bcryptjs';

// Services
import {googleVerify} from '../../services/google.service';


// models
import Administrador from '../administrador/model';
import Usuario from '../usuario/model';

// Helpers
import {formateoRegistroUser} from '../../helpers/formatoData';
import {formateoLogin} from '../../helpers/formatoData';
import {generarJWT} from '../../helpers/generar-jwt';

// mensages
import {msgError} from './dto';
import {msgSuccess} from './dto';

export const login = async(req: Request, res: Response) =>{
    try{

        const loginData =  formateoLogin(req);

        const usuario = await Usuario.findOne({email: loginData.email});
        if(!usuario) return res.status(400).json(msgError('Datos incorrectos'));

        const validarPassword = bcryptjs.compareSync(loginData.password, usuario.password);
        if(!validarPassword) return res.status(400).json(msgError('Datos incorrectos'));
        
        if(usuario.bloqueado) return res.status(400).json(msgError('Usuario Bloqueado'));
        if(!usuario.confirmarCorreo) return res.status(400).json(msgError('Aun no ha confirmado su correo'));

        
        const token: any = await generarJWT(usuario._id);

        res.status(200).json(msgSuccess('Loguiado Correctamente', usuario, token));


    }catch(error){
        // console.log('error db');
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

export const googleSignIn = async(req: Request, res: Response) => {

    try{

        const googleToken = req.body.token;
        let mensajeMandar: string;
        let usuario;

        const {given_name, family_name, email} = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            usuario = new Usuario({
                nombre: given_name,
                apellidos: family_name,
                email,
                password:'@@@',
                google: true
            });
            mensajeMandar = "Usuario Creado Exitosamente";
        }else{
            usuario = usuarioDB;
            usuario.google = true;
            mensajeMandar = "Loguiado Correctamente";
        }

        await usuario.save();

        const token: any = await generarJWT(usuario.id);

        res.status(200).json(msgSuccess(mensajeMandar, usuario, token));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

export const confirmarCorreo = async (req: Request, res: Response) => {

    try{

        const idUsuario = req.id;

        await Usuario.findByIdAndUpdate( idUsuario, {confirmarCorreo: true});

        res.status(200).json({
            ok: true,
            mensaje: 'El usuario a confirmado su correo.',
        });

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }

};

export const renewToken = async (req: Request, res: Response) => {

    const idUsuario = req.id;

    try {
        
        const token: any = await generarJWT(idUsuario);

        res.status(200).json({
            ok:true,
            token,
            id: idUsuario
        });
    }

    catch (error) {
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};







