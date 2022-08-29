import {Router} from 'express';
import {check} from 'express-validator';

// Controllers
import {
    create,
    get,
    getMergeMap,
    getPorEmail,
    gets,
    search,
    update,
    updatePassword,
    updateImagen,
    deleteImagen,
    deleteUser
} from './controller';

// middleware
import {validarCampos} from '../../middlewares/validar-campos';
import { validarAdminJWT, validarJWTUserPropioOAdmin, validarUserJWT, validarJWTAdminOUser } from '../../middlewares/validar-jwt';
import {uploadImagen} from '../../middlewares/multer-upload';

// Validadores
import {existeEmailUsuario, existeUsuarioId} from '../../validations/validaciones-personalizadas';



const router = Router();


router.post('/create',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidos', 'Los apellidos son  obligatorios').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('email').custom(existeEmailUsuario),
        check('password', 'El passsword debe ser mayor a 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    create
);

router.get('/get/:id',
    [
        check('id', 'No es un Id valido ').isMongoId(),
        check('id').custom(existeUsuarioId),
        validarCampos,
        validarJWTUserPropioOAdmin
    ],
    get
);

router.get('/get/mergeMap/:id',
    [
        check('id', 'No es un Id valido ').isMongoId(),
        check('id').custom(existeUsuarioId),
        validarCampos,
        validarJWTAdminOUser
    ],
    getMergeMap
);


router.get('/get/porEmail/:email',
    [
        validarUserJWT
    ],
    getPorEmail
);


router.get('/gets/:pagina',
    [
        validarAdminJWT,
    ],
    gets
);

router.get('/search/:termino/:pagina',
    [
        check('termino','El termino de busqueda obligatorio').not().isEmpty(),
        validarCampos,
        validarAdminJWT
    ],
    search
);


router.put('/update/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeUsuarioId),
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('apellidos', 'Los apellidos son  obligatorios.').not().isEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        check('bloqueado', 'El valor de Bloqueado es obligatorio.').isBoolean(),
        validarCampos,
        validarJWTUserPropioOAdmin
    ],
    update
);


router.put('/updatePassword/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeUsuarioId),
        check('password', 'El passsword debe ser mayor a 6 caracteres').isLength({min: 6}),
        validarCampos,
        validarJWTUserPropioOAdmin
    ],
    updatePassword
);


router.put('/updateImagen/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeUsuarioId),
        validarCampos,
        uploadImagen.single('imagen'),
        validarJWTUserPropioOAdmin
    ],
    updateImagen
);

router.delete('/deleteImagen/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeUsuarioId),
        validarCampos,
        validarJWTUserPropioOAdmin
    ],
    deleteImagen
);


router.delete('/delete/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeUsuarioId),
        validarCampos,
        validarAdminJWT // Solo un administrador puede borrar un usuario
    ],
    deleteUser
);


export default router;
