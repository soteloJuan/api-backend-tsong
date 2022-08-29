import {validationResult} from 'express-validator';
import {Request, Response, NextFunction} from 'express';


export const validarCampos = (req: Request, res: Response, next: NextFunction) => {

    const errores: any = validationResult(req);
    if(!errores.isEmpty()){
        const mensaje: any = errores.errors[0].msg;
        return res.status(400).json({
            ok:false,
            mensaje
        });
    }
    next();

}

