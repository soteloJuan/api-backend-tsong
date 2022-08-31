import  {Request, Response, NextFunction} from 'express';


// models
import Models from '../models/index';



/* Esto es para verificar que el ID de ListaReproduccion lo haya creado yo. De lo contrario no me permitira agregarlo. */
export const yoCreeListaReproduccion = async(req: Request, res: Response, next: NextFunction) => {
    const idUser = req.id;
    const idListaReproduccion = req.body.listaReproduccion;

    const listaReproduccionDB = await Models.ListaReproduccion.findById(idListaReproduccion);

    if(listaReproduccionDB.usuario != idUser) return res.status(401).json({ msg: 'La lista de reproduccion no te pertenece.' });

    next();

};