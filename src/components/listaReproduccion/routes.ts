import {Router} from 'express';
import {check} from 'express-validator';

// Controllers
import {
    create,
    get,
    gets,
    getsGeneral,
    search,
    searchGeneral,
    update,
    updateImagen,
    deleteImagen,
    deleteListaReproduccion
} from './controller';

// middleware
import {validarCampos} from '../../middlewares/validar-campos';
import { validarUserJWT, validarJWTListaRepAdminOUserQueLoCreo, validarJWTUserPropioOAdmin, validarJWTAdminOUser, validarAdminJWT } from '../../middlewares/validar-jwt';
import {uploadImagen} from '../../middlewares/multer-upload';

// Validadores personalizadas
import { existeUsuarioId, existeListaReproduccionId } from '../../validations/validaciones-personalizadas';

const router = Router();


router.post('/create',
    [
        validarUserJWT,
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('usuario').custom(existeUsuarioId),
        validarCampos
    ],
    create
);


router.get('/get/:id',
    [
        check('id', 'No es un Id valido ').isMongoId(),
        check('id').custom(existeListaReproduccionId),
        validarCampos,
        validarJWTAdminOUser
    ],
    get
);


router.get('/gets/:id/:pagina',
    [
        validarJWTUserPropioOAdmin
    ],
    gets
);

router.get('/getsGeneral/:pagina',
    [
        validarAdminJWT
    ],
    getsGeneral
);


router.get('/search/:id/:termino/:pagina',
    [
        validarJWTUserPropioOAdmin,
        check('termino','El termino de busqueda obligatorio').not().isEmpty()
    ],
    search
);

router.get('/searchGeneral/:termino/:pagina',
    [
        validarAdminJWT,
        check('termino','El termino de busqueda obligatorio').not().isEmpty()
    ],
    searchGeneral
);


router.put('/update/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeListaReproduccionId),
        check('usuario', 'El usuario es obligatorio.').isMongoId(),
        check('usuario').custom(existeUsuarioId),
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        validarCampos,
        validarJWTListaRepAdminOUserQueLoCreo
    ],
    update
);

router.put('/updateImagen/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeListaReproduccionId),
        uploadImagen.single('imagen'),
        validarCampos,
        validarJWTListaRepAdminOUserQueLoCreo
    ],
    updateImagen
);

router.delete('/deleteImagen/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeListaReproduccionId),
        validarCampos,
        validarJWTListaRepAdminOUserQueLoCreo
    ],
    deleteImagen
);



router.delete('/delete/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeListaReproduccionId),
        validarCampos,
        validarJWTListaRepAdminOUserQueLoCreo
    ],
    deleteListaReproduccion
);

export default router;
