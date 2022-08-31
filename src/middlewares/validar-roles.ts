import {Request, Response, NextFunction} from 'express';

import Models from '../models/index';

/* Para asegurar que un administradorPRO pueda hacer las operaciones.
Pero es muy importante que vaya despues del middleware que valida el token, ya que esta 
"validarRoleAdminPro" solo se encarga de validar el si es ADMIN_PRO*/ 
export const validarRoleAdminPro = async(req: Request, res: Response, next: NextFunction) => {

    try{

        const id = req.id;
        const administrador = await Models.Administrador.findById(id);

        if(administrador.role != 'ADMIN_PRO')
        return res.status(403).json({
            ok:false,
            mensaje:'El administrador no tiene permisos.'
        });


        next();

    }catch(error){
        res.status(500).json({
            ok:false,
            error
        });
    }
};
