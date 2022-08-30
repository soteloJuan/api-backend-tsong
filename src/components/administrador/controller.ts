import {Request, Response} from 'express';
import bcryptjs from 'bcryptjs';
import fs from 'fs-extra';

// helpers
import {bcryptPassword} from '../../helpers/encriptacion';
import {formateoRegistroAdmin, formatoUpdate} from '../../helpers/formatoData';
import {generarJWTEmail} from '../../helpers/generar-jwt';

// Servicices
import {sendEmailService} from '../../services/send-mail.service';
import {subirImagenService, eliminarImagenService} from '../../services/cloudinary.service';

// messages
import {msgError, msgSuccess} from './dto';

// Models
import Administrador from './model';

export const create = async (req: Request, res: Response) => {

    try{

        const nuevoAdmin =  formateoRegistroAdmin(req);

        nuevoAdmin.password = await bcryptPassword( nuevoAdmin.password);
    
        await nuevoAdmin.save();

        // Enviamos un correo para que pueda confirmar su correo
        // const token: any = await generarJWTEmail(nuevoAdmin._id);
        // await sendEmailService(nuevoAdmin.email, token, 'Administrador');
        
        res.status(200).send(msgSuccess('Le hemos enviado un correo a su email.', nuevoAdmin));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};


export const get = async (req: Request, res: Response) => {

    try{

        const idAdmin = req.params.id;

        const administradorDB = await Administrador.findById(idAdmin);

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', administradorDB));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};



export const gets = async (req: Request, res: Response) => {

    try{

        const pagina: any = req.params.pagina || 1;

        const administradores: any = await Administrador.paginate({}, {limit: 12, page: pagina});

        if(administradores.docs == '') return res.status(200).send(msgSuccess('No Existen usuarios'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', administradores));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

export const search = async (req: Request, res: Response) => {
    try{

        const termino = req.params.termino;
        const pagina: any = req.params.pagina || 1;
        const regex = new RegExp(termino, 'i');

        const administradores: any =  await Administrador.paginate({$or:[{nombre: regex},{apellidos: regex}]},{limit: 12, page: pagina});

        if(administradores.docs == '') return res.status(200).send(msgSuccess('No Existen usuarios'));

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', administradores));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};




export const update = async (req: Request, res: Response) => {
    try{
        
        const idAdmin = req.params.id;
        const updateData = formatoUpdate(req);

        const administrador = await Administrador.findById(idAdmin);

        if(updateData.email != administrador.email){
            const emailExiste = await Administrador.findOne({email: updateData.email});
            if(emailExiste) return res.status(400).send(msgError('¡ El email ya ha sido utllizado !'));
        }

        const administradorNuevo = await Administrador.findByIdAndUpdate(idAdmin, updateData,{new: true});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', administradorNuevo));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

export const updatePassword = async (req: Request, res: Response) => {
    try{
        
        const idAdmin: any = req.params.id;
        const oldPassword = req.body.password;
        const newPassword = req.body.newPassword;

        const administrador: any =await Administrador.findById(idAdmin);

        const comparandoPasswordActual = bcryptjs.compareSync(oldPassword, administrador.password);
        if(!comparandoPasswordActual) return res.status(409).send(msgError('Tu password actual es incorrecto. Por favor ingresa tu password correctamente'));

        const comparandoPasswordNuevo = bcryptjs.compareSync(newPassword, administrador.password);
        if(comparandoPasswordNuevo) return res.status(409).send(msgError('Tu nuevo password  es igual al actual. Por fasvor ingrese uno distinto'));

        const passwordUpdate = await bcryptPassword(newPassword);
        await Administrador.findByIdAndUpdate(idAdmin,{password: passwordUpdate});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente'));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

export const updateImagen = async (req: Request, res: Response) => {

    try{
        const idAdmin = req.params.id;
        const file = req.file;
        
        if(!file) return res.status(409).send(msgError('Es necesario subir un archivo valido.'));
        
        const administrador = await Administrador.findById(idAdmin);
        const imgIdOld = administrador.imagenID || null;

        if(imgIdOld != null && imgIdOld != 'null' && imgIdOld != undefined) await eliminarImagenService(imgIdOld);

        const rutaImg = req.file.path;
        const {imagenID, imagenURL} = await subirImagenService(rutaImg) as any;
        await fs.unlink(rutaImg);

        const nuevoAdministrador = await Administrador.findByIdAndUpdate(idAdmin,{imagenID, imagenURL}, {new: true});

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', nuevoAdministrador));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

export const deleteImagen = async (req: Request, res: Response) => {
    try{

        const idAdmin = req.params.id;
        let administrador = await Administrador.findById(idAdmin);

        
        const imgAdmin = administrador.imagenID;

        if(imgAdmin != null && imgAdmin != 'null' && imgAdmin != undefined){
            await eliminarImagenService(imgAdmin);
            const imagenID= null, imagenURL= null;
            administrador = await Administrador.findByIdAndUpdate(idAdmin,{imagenID, imagenURL}, {new: true});
        }

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', administrador));

    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};

export const deleteAdmin = async (req: Request, res: Response) => {
    try{

        const idAdmin = req.params.id;
        const administrador = await Administrador.findByIdAndDelete(idAdmin);
        const imgAdmin = administrador.imagenID;
        if(imgAdmin != null && imgAdmin != 'null' && imgAdmin != undefined) await eliminarImagenService(imgAdmin);

        res.status(200).send(msgSuccess('Peticion realizado Exitosamente', administrador));
    }catch(error){
        res.status(500).json(msgError('Contacte con el administrador'));
    }
};
