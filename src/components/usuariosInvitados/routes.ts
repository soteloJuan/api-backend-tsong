import {Router} from 'express';
import {check} from 'express-validator';

// Controllers
import {
    create,
    get,
    gets,
    getsPorIdUsuario,
    // search, // Por el momento no tiene uso.
    // update, // Por el momento no tiene uso.
    deleteUsuriosInvitados
} from './controller';

// middleware
import {validarCampos} from '../../middlewares/validar-campos';
import { validarUserJWT, validarJWTUsuariosInvitados, validarJWTListaRepAdminOUserQueLoCreo } from '../../middlewares/validar-jwt';
import {yoCreeListaReproduccion} from '../../middlewares/validar-listaReproduccion';

// Validadores personalizadas
import { existeListaReproduccionId, existeUsuarioId, existeUsuariosInvitadosId } from '../../validations/validaciones-personalizadas';

const router = Router();


router.post('/create',
    [
        check('listaReproduccion', 'La lista de Reproduccion es obligatorio.').isMongoId(),
        check('listaReproduccion').custom(existeListaReproduccionId),
        check('usuario', 'El usuario es obligatorio.').isMongoId(),
        check('usuario').custom(existeUsuarioId),
        validarCampos,
        validarUserJWT,
        yoCreeListaReproduccion // Este middleware tiene que ir detras del middleware principal.
    ],
    create
);


// // Este servicio solo podra acceder el usuario que haya creado la listaReproduccion. Y tambien el administrador.
router.get('/get/:id',
    [
        check('id', 'No es un Id valido ').isMongoId(),
        check('id').custom(existeUsuariosInvitadosId),
        validarCampos,
        validarJWTUsuariosInvitados
    ],
    get
);


// Id es el de la listaReproduccion
// Solo lo puede hacer un usuario que haya creado la lista de reproduccion un administrador 
router.get('/gets/:id',
    [
        check('id', 'No es un Id valido ').isMongoId(),
        check('id').custom(existeListaReproduccionId),
        validarCampos,
        validarJWTListaRepAdminOUserQueLoCreo
    ],
    gets
);

router.get('/gets/porUsuario/:idUsuario',
    [
        check('idUsuario', 'No es un Id valido ').isMongoId(),
        check('idUsuario').custom(existeUsuarioId),
        validarCampos,
        validarUserJWT
    ],
    getsPorIdUsuario
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


// // Por el momento solo estamos buscando por el nombre y apellidos. Pero puede cambiar a otras cosas.
// // router.put('/update/:id',
// //     [
// //         check('id','No es un Id valido').isMongoId(),
// //         check('id').custom(existeCancionListaReproduccionId),
// //         check('listaReproduccion', 'La lista de Reproduccion es obligatorio.').isMongoId(),
// //         check('listaReproduccion').custom(existeListaReproduccionId),
// //         check('cancion', 'La Canción es obligatorio.').isMongoId(),
// //         check('cancion').custom(existeCancionId),
// //         validarCampos,
// //         validarJWTCLR
// //     ],
// //     update
// // );

router.delete('/delete/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeUsuariosInvitadosId),
        validarCampos,
        validarJWTUsuariosInvitados
    ],
    deleteUsuriosInvitados
);

export default router;
