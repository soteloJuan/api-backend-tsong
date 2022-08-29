import {Request, Response} from 'express';
import bcryptjs from 'bcryptjs';
import fs from 'fs-extra';

// helpers
import {bcryptPassword} from '../../helpers/encriptacion';
import {formateoRegistroUser, formatoUpdate} from '../../helpers/formatoData';
import {generarJWTEmail} from '../../helpers/generar-jwt';

// Servicices
import {sendEmailService} from '../../services/send-mail.service';
import {subirImagenService, eliminarImagenService} from '../../services/cloudinary.service';

// messages
import {msgError, msgSuccess} from './dto';

// Models
import Usuario from './model';



export const create = async (req: Request, res: Response) => {

    try{

        const nuevoUsuario =  formateoRegistroUser(req);

        nuevoUsuario.password = await bcryptPassword( nuevoUsuario.password);
    
        await nuevoUsuario.save();

        // Enviamos un correo para que pueda confirmar su correo
        // const token: any = await generarJWTEmail(nuevoUsuario._id);
        // await sendEmailService(nuevoUsuario.email, token, 'Usuario');
        
        res.status(200).send(msgSuccess('Le hemos enviado un correo a su email.', nuevoUsuario));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
};


export const get = async (req: Request, res: Response) => {

    try{

        const idUsuario = req.params.id;

        const usuarioDB = await Usuario.findById(idUsuario);

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', usuarioDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }

}


export const getMergeMap = async (req: Request, res: Response) => {

    try{

        const idUsuario = req.params.id;

        const usuarioDB: any = await Usuario.findById(idUsuario);

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', usuarioDB.email));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }

}

export const getPorEmail = async (req: Request, res: Response) => {

    try{

        const emailUsuario = req.params.email;

        const usuarioDB: any = await Usuario.find({email: emailUsuario});

        if(!usuarioDB) return res.status(409).send(msgError('¡ El email no existe !'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', usuarioDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }

}





export const gets = async (req: Request, res: Response) => {

    try{

        const pagina: any = req.params.pagina || 1;

        const usuarios: any = await Usuario.paginate({}, {limit: 12, page: pagina});

        if(usuarios.docs == '') return res.status(200).send(msgSuccess('No Existen usuarios'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', usuarios));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}


// Por el momento solo estamos buscando por el nombre y apellidos. Pero puede cambiar a otras cosas.
export const search = async (req: Request, res: Response) => {
    try{

        const termino = req.params.termino;
        const pagina: any = req.params.pagina || 1;
        const regex = new RegExp(termino, 'i'); // Expresion regular

        const usuario: any =  await Usuario.paginate({$or:[{nombre: regex},{apellidos: regex}]},{limit: 12, page: pagina});

        if(usuario.docs == '') return res.status(200).send(msgSuccess('No Existen usuarios'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', usuario));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}




export const update = async (req: Request, res: Response) => {
    try{
        
        const idUser = req.params.id;
        const updateData: any = formatoUpdate(req);

        const usuarioDB = await Usuario.findById(idUser);

        if(updateData.email != usuarioDB.email){// Verificamos que cuando actualice un correo no exista ya en la db.
            const emailExiste = await Usuario.findOne({email: updateData.email});

            if(emailExiste) return res.status(409).send(msgError('¡ El email ya ha sido utllizado !'));
        }

        const usuarioNuevo = await Usuario.findByIdAndUpdate(idUser, updateData,{new: true});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', usuarioNuevo));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}


export const updatePassword = async (req: Request, res: Response) => {
    try{
        
        const idUsuario: any = req.params.id;
        const newPassword = req.body.password;

        const usuarioDB: any =await Usuario.findById(idUsuario);
        const passwordIgual = bcryptjs.compareSync(newPassword, usuarioDB.password);
        if(passwordIgual) return res.status(409).send(msgError('El password es igual al anterior'));


        const passwordUpdate = await bcryptPassword(newPassword);
        await Usuario.findByIdAndUpdate(idUsuario,{password: passwordUpdate});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente'));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}



export const updateImagen = async (req: Request, res: Response) => {
    try{
        
        const idUser = req.params.id;
        const file = req.file;
        
        // Sino viene ningun archivo
        if(!file) return res.status(409).send(msgError('Es necesario subir un archivo valido.'));
        
        
        const usuarioDB = await Usuario.findById(idUser);
        const imgIdOld = usuarioDB.imagenID || null;

        // Si existe un imagenID, enotnce lo eliminamos primero. Creo que seria recomendable acceder a la db y extraer la info
        if(imgIdOld != null && imgIdOld != 'null' && imgIdOld != undefined) await eliminarImagenService(imgIdOld);

        const rutaImg = req.file.path;
        const {imagenID, imagenURL} = await subirImagenService(rutaImg) as any;
        await fs.unlink(rutaImg);

        const nuevoUsuario = await Usuario.findByIdAndUpdate(idUser,{imagenID, imagenURL}, {new: true});


        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', nuevoUsuario));

    }catch(error){
        console.log(error);
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}


export const deleteImagen = async (req: Request, res: Response) => {
    try{

        const idUsuario = req.params.id;
        let usuario = await Usuario.findById(idUsuario);
        const imgUsuario = usuario.imagenID;

        if(imgUsuario != null && imgUsuario != 'null' && imgUsuario != undefined){
            await eliminarImagenService(imgUsuario);
            const imagenID= null, imagenURL= null;
            usuario = await Usuario.findByIdAndUpdate(idUsuario,{imagenID, imagenURL}, {new: true});
        }

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', usuario));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try{

        const idUser = req.params.id;

        const usuarioDB = await Usuario.findById(idUser);

        await usuarioDB.remove();

        const imgUser = usuarioDB.imagenID;

        if(imgUser != null && imgUser != 'null' && imgUser != undefined) await eliminarImagenService(imgUser);

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', usuarioDB));


    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'))
    }
}



// MUSICA PARA PROGRAMAR https://www.youtube.com/watch?v=n9Y2Eb4BaSg
// MUSICA PARA PROGRAMAR https://www.youtube.com/watch?v=H3QzSY-a4IQ

