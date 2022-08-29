import {Router} from 'express';
import {check} from 'express-validator';

// Controllers
import {
    create,
    get,
    gets,
    search,
    update,
    updatePassword,
    updateImagen,
    deleteImagen,
    deleteAdmin
} from './controller';

// middleware
import {validarCampos} from '../../middlewares/validar-campos';
import { validarRoleAdminPro } from '../../middlewares/validar-roles';
import {validarAdminJWT, validarJWTAdminPropioAdminPro} from '../../middlewares/validar-jwt';
import {uploadImagen} from '../../middlewares/multer-upload';

// Validadores
import {existeEmailAdministrador, existeAdministradorId} from '../../validations/validaciones-personalizadas';

const router = Router();


router.post('/create',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidos', 'Los apellidos son  obligatorios').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('email').custom(existeEmailAdministrador),
        check('password', 'El passsword debe ser mayor a 6 caracteres').isLength({min: 6}),
        validarCampos,
        validarAdminJWT,
        validarRoleAdminPro
    ],
    create
);


router.get('/get/:id',
    [
        check('id', 'No es un Id valido ').isMongoId(),
        check('id').custom(existeAdministradorId),
        validarCampos,
        validarJWTAdminPropioAdminPro
    ],
    get
);


router.get('/gets/:pagina',
    [
        validarAdminJWT,
        validarRoleAdminPro,
    ],
    gets
);

router.get('/search/:termino/:pagina',
    [
        check('termino','El termino de busqueda obligatorio').not().isEmpty(),
        validarCampos,
        validarAdminJWT,
        validarRoleAdminPro,
    ],
    search
);


router.put('/update/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeAdministradorId),
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('apellidos', 'Los apellidos son  obligatorios.').not().isEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        check('bloqueado', 'El valor de Bloqueado es obligatorio.').isBoolean(),
        validarCampos,
        validarJWTAdminPropioAdminPro// Solo podra actualizarlo si es su propio perfil o si es un admin_PRo
    ],
    update
);


router.put('/updatePassword/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeAdministradorId),
        check('password', 'El passsword debe ser mayor a 6 caracteres').isLength({min: 6}),
        check('newPassword', 'El nuevo passsword debe ser mayor a 6 caracteres').isLength({min: 6}),
        validarCampos,
        validarJWTAdminPropioAdminPro
    ],
    updatePassword
);


router.put('/updateImagen/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeAdministradorId),
        validarCampos,
        uploadImagen.single('imagen'),
        validarJWTAdminPropioAdminPro
    ],
    updateImagen
);

router.delete('/deleteImagen/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeAdministradorId),
        validarCampos,
        validarJWTAdminPropioAdminPro
    ],
    deleteImagen
);

router.delete('/delete/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeAdministradorId),
        validarCampos,
        validarAdminJWT,
        validarRoleAdminPro,
    ],
    deleteAdmin
);

export default router;
