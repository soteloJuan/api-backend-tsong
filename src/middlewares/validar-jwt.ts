import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

// modelos
import Models from '../models/index';

// interface
import { TokenPayload } from '../interfaces/tokenPayload.interface';


/* De esta forma verificamos que solo un  administrador pueda realizar la operación */ 
export const validarAdminJWT = async(req: Request, res: Response, next: NextFunction) => {

    try{

        let token: any;
        // Evaluamos en donde viene el token.
        (!req.header('token'))? (token = req.params.token): ( token = req.header('token'))
    
        // Si esta vacion significa que no mandaron el token por ningun medio.
        if(!token) return res.status(400).json({ ok:false, mensage:'El token es obligatorio' });
    
        const respuestaJWT: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY!);
        const administrador = await Models.Administrador.findById(respuestaJWT.id);

        if(!administrador) return res.status(401).json({ msg: 'Token no válido el administrador no existente' });
        
        const {id} = respuestaJWT as TokenPayload;

        req.id = id;

        next();

    }catch(error){
        res.status(500).json({
            ok:false,
            error
        });
    }

}


/* Esta funcion es para validar que el administrador que vaya a actualizar los datos, sea un administrador con
role ADMIN_PRO o que sea un administrador que actualizara sus propios datos los que quiere modificar */
export const validarJWTAdminPropioAdminPro = async(req: Request, res: Response, next: NextFunction) => {

    try{
        
        const token = req.header('token');
    
        if(!token) return res.status(400).json({ ok:false, mensage:'El token es obligatorio'});


        const resJWT: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY!);
        const administrador:any = await Models.Administrador.findById(resJWT.id);

        if(!administrador) return res.status(401).json({ msg: 'Token no válido el administrador no existente' });
        
        if(resJWT.id != req.params.id && administrador.role != 'ADMIN_PRO')return res.status(401).json({ msg: 'Token no válido,  No  tienes accedeso a este servicio.' });

        const {id} = resJWT as TokenPayload;
        req.id = id;

        next();

    }catch(error){
        res.status(500).json({
            ok:false,
            error
        });
    }

}

// esto es solo para verificar que sea un usuario o un admin nadamas. No revisa ningun otro parametro
export const validarJWTAdminOUser = async(req: Request, res: Response, next: NextFunction) => {

    try{

        
        const token = req.header('token') || null;
    
        // Si esta vacion significa que no mandaron el token por ningun medio.
        if(!token) return res.status(400).json({ ok:false, mensage:'El token es obligatorio' });
        

        const respuestaJWT: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY!);


        // Para confirmar que sea un administrador o un usuario.
        const [administradorDB, usuarioDB] = await Promise.all([
            Models.Administrador.findById(respuestaJWT.id),
            Models.Usuario.findById(respuestaJWT.id)            
        ]);

        if(!administradorDB && !usuarioDB) return res.status(401).json({ msg: 'Token no válido el administrador no existente' });
        
        const {id} = respuestaJWT as TokenPayload;

        req.id = id;

        next();

    }catch(error){
        res.status(500).json({
            ok:false,
            error
        });
    }

}


/* De esta forma verificamos que solo un usuario  pueda realizar la operación */ 
export const validarUserJWT = async(req: Request, res: Response, next: NextFunction) => {

    try{

        let token: any;
        // Evaluamos en donde viene el token.
        (!req.header('token'))? (token = req.params.token): ( token = req.header('token'))
    
        // Si esta vacion significa que no mandaron el token por ningun medio.
        if(!token) return res.status(400).json({ ok:false, mensage:'El token es obligatorio' });
    
        const respuestaJWT: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY!);
        const administrador = await Models.Usuario.findById(respuestaJWT.id);

        if(!administrador) return res.status(401).json({ msg: 'Token no válido, el Usuario no existente' });
        
        const {id} = respuestaJWT as TokenPayload;

        req.id = id;

        next();

    }catch(error){
        res.status(500).json({
            ok:false,
            error
        });
    }

}

/* De esta forma verificamos que solo un usuario  pueda actualizar/consultar/elimnar sus propios datos,
    y que un Administrador tambien lo pueda hacer. */ 
export const validarJWTUserPropioOAdmin = async(req: Request, res: Response, next: NextFunction) => {

    try{

        const token = req.header('token') || null;
        let usuario: any;
        let administrador: any;
    

        if(!token) return res.status(400).json({ ok:false, mensage:'El token es obligatorio' });
    

        const respuestaJWT: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY!);
        usuario = await Models.Usuario.findById(respuestaJWT.id);

        if(!usuario){
            administrador = await Models.Administrador.findById(respuestaJWT.id);
            if(!administrador) return res.status(401).json({ msg: 'Token no válido, el Usuario/Administrador no existente' });
        }
        if(!administrador && (usuario._id != req.params.id) ) return res.status(401).json({ msg: 'Token no válido,  No  tienes accedeso a este servicio.'  });


        const {id} = respuestaJWT as TokenPayload;
        req.id = id;
        next();

    }catch(error){
        res.status(500).json({
            ok:false,
            error
        });
    }

}


/* El id que viene en el token tiene que ser igual al de un administrador.
Si el id que viene es la de un usuaruio entonces se consulta la ListaReproduccion y se compara la propiedad usuario que viene ahi 
con el usuarioID que vienen en el token.*/
export const validarJWTListaRepAdminOUserQueLoCreo = async(req: Request, res: Response, next: NextFunction) => {

    try{
        
        const token = req.header('token') || null;
        const listaReproduccionID =req.params.id;
        let usuario: any;
        let administrador: any;


        if(!token) return res.status(400).json({ ok:false, mensage:'El token es obligatorio' });
    

        const respuestaJWT: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY!);
        usuario = await Models.Usuario.findById(respuestaJWT.id);

        if(!usuario){
            administrador = await Models.Administrador.findById(respuestaJWT.id);
            if(!administrador) return res.status(401).json({ msg: 'Token no válido, el Usuario/Administrador no existente' });
        }

        
        if(!administrador && usuario){
            let listaReproduccionDB: any = await Models.ListaReproduccion.findById(listaReproduccionID);
            
            if(listaReproduccionDB.usuario != usuario.id) return res.status(401).json({ msg: 'Token no válido,  No puedes acceder a este servicio..' });
        }
        
        if(!administrador && !usuario) return res.status(401).json({ msg: 'Token no válido,  No  tienes accedeso a este servicio.' });



        const {id} = respuestaJWT as TokenPayload;
        req.id = id;
        next();

    }catch(error){
        res.status(500).json({
            ok:false,
            error
        });
    }

}

/*CLR = CANCIONLISTAREPRODUCCION
Para asegurar que el que haga uso del servico sea un administrador. Y si es un usuario, tiene que ser el usuario
que creo la Lista de Reproduccion, de lo contrario se le denegara el servicio.
*/
export const validarJWTCLR = async(req: Request, res: Response, next: NextFunction) => {

    try{

        const token = req.header('token') || null;
        const CLRID =req.params.id;
        let usuario: any;
        let administrador: any;


        if(!token) return res.status(400).json({ ok:false, mensage:'El token es obligatorio' });


        const respuestaJWT: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY!);

        const CLRDB = await Models.CancionListaReproduccion.findById(CLRID);    

        usuario = await Models.Usuario.findById(respuestaJWT.id);

        if(!usuario){
            administrador = await Models.Administrador.findById(respuestaJWT.id);
            if(!administrador) return res.status(401).json({ msg: 'Token no válido, el Usuario/Administrador no existente' });
        }

        if(!administrador && !usuario) return res.status(401).json({ msg: 'Token no válido,  No puedes acceder a este servicio..' });
        
        if(!administrador && usuario){
            let listaReproduccionDB: any = await Models.ListaReproduccion.findById(CLRDB.listaReproduccion);
            if(listaReproduccionDB.usuario != usuario.id) return res.status(401).json({ msg: 'Token no válido,  No  tienes accedeso a este servicio.'  });
        }


        const {id} = respuestaJWT as TokenPayload;
        req.id = id;
        next();

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            error
        });
    }

}


/* Para asegurar que el que haga uso del servico sea un administrador. Y si es un usuario, tiene que ser el usuario
que creo la Lista de Reproduccion, de lo contrario se le denegara el servicio.
*/
export const validarJWTUsuariosInvitados = async(req: Request, res: Response, next: NextFunction) => {

    try{

        const token = req.header('token') || null;
        const usuariosInvitadosID =req.params.id;
        let usuario: any;
        let administrador: any;
        

        if(!token) return res.status(400).json({ ok:false, mensage:'El token es obligatorio' });


        const respuestaJWT: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY!);

        const usuariosInvitadosDB = await Models.UsuariosInvitados.findById(usuariosInvitadosID);    

        usuario = await Models.Usuario.findById(respuestaJWT.id);

        if(!usuario){
            administrador = await Models.Administrador.findById(respuestaJWT.id);
            if(!administrador) return res.status(401).json({ msg: 'Token no válido, el Usuario/Administrador no existente' });
        }

        if(!administrador && !usuario) return res.status(401).json({ msg: 'Token no válido,  No puedes acceder a este servicio.' });
        
        if(!administrador && usuario){
            let listaReproduccionDB: any = await Models.ListaReproduccion.findById(usuariosInvitadosDB.listaReproduccion);
            if(listaReproduccionDB.usuario != usuario.id) return res.status(401).json({ msg: 'Token no válido,  No tienes accedeso a este servicio.' });
        }

        const {id} = respuestaJWT as TokenPayload;
        req.id = id;
        next();

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            error
        });
    }

}



/*
Para verificar que sea un administrador. Y en el caso de que sea un usuario tiene que ser el mismo que is que viene en el 
" req.body.usuario "
*/
export const validarJWTUltimaCancionPropioOAdmin = async(req: Request, res: Response, next: NextFunction) => {

    try{

        const token = req.header('token') || null;
        let usuario: any;
        let administrador: any;


        if(!token) return res.status(400).json({ ok:false, mensage:'El token es obligatorio' });


        const respuestaJWT: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY!);

        usuario = await Models.Usuario.findById(respuestaJWT.id);

        if(!usuario){
            administrador = await Models.Administrador.findById(respuestaJWT.id);
            if(!administrador) return res.status(401).json({ msg: 'Token no válido, el Usuario/Administrador no existente' });
        }

        if(!administrador && !usuario) return res.status(401).json({ msg: 'Token no válido,  No puedes acceder a este servicio.' });
        
        if(!administrador && usuario){
            if(req.body.usuario != usuario.id) return res.status(401).json({ msg: 'Token no válido,  No tienes accedeso a este servicio.' });
        }

        const {id} = respuestaJWT as TokenPayload;
        req.id = id;
        next();

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            error
        });
    }

}


