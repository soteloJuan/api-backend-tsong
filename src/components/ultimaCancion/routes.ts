import {Router} from 'express';
import {check} from 'express-validator';

// Controllers
import {
    create,
    get,
    gets,
    // search, // Por el momento no tiene uso.
    update, // Por el momento no tiene uso.
    deleteUltimaCancion
} from './controller';

// middleware
import {validarCampos} from '../../middlewares/validar-campos';
import { validarJWTUltimaCancionPropioOAdmin, validarJWTUserPropioOAdmin, validarAdminJWT } from '../../middlewares/validar-jwt';

// Validadores personalizadas
import { existeCancionId, existeUsuarioId, existeUltimaCancionID } from '../../validations/validaciones-personalizadas';

const router = Router();

// Solo lo puede agreggar un usuario en donde el id del token sea igual al que viene en el body.
router.post('/create',
    [
        check('cancion', 'La Canción es obligatorio.').isMongoId(),
        check('cancion').custom(existeCancionId),
        check('usuario', 'El usuario es obligatorio.').isMongoId(),
        check('usuario').custom(existeUsuarioId),
        validarCampos,
        validarJWTUltimaCancionPropioOAdmin
    ],
    create
);


// Se tiene que mandar el id del usuario en la url
router.get('/get/:id',
    [
        check('id', 'No es un Id valido ').isMongoId(),
        check('id').custom(existeUsuarioId),
        validarCampos,
        validarJWTUserPropioOAdmin
    ],
    get
);


// Solo lo puede consultar un administrador
router.get('/gets/:pagina',
    [
        validarAdminJWT
    ],
    gets
);

// // Por el momento solo estamos buscando por el nombre y apellidos. Pero puede cambiar a otras cosas.
// // router.get('/search/:termino/:pagina',
// //     [
// //         check('termino','El termino de busqueda obligatorio').not().isEmpty(),
// //         validarCampos,
// //         validarAdminJWT
// //     ],
// //     search
// // );


router.put('/update/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeUltimaCancionID),
        check('cancion', 'La Canción es obligatorio.').isMongoId(),
        check('cancion').custom(existeCancionId),
        check('usuario', 'El usuario es obligatorio.').isMongoId(),
        check('usuario').custom(existeUsuarioId),
        validarCampos,
        validarJWTUltimaCancionPropioOAdmin
    ],
    update
);

// Este servicio solo lo púede usar un administrador.
router.delete('/delete/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeUltimaCancionID),
        validarCampos,
        validarAdminJWT
    ],
    deleteUltimaCancion
);

export default router;
