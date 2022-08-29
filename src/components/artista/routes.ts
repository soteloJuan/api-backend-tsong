import {Router} from 'express';
import {check} from 'express-validator';

// Controllers
import {
    create,
    get,
    gets,
    getsNoPaginado,
    search,
    update,
    updateImagen,
    deleteImagen,
    deleteArtista
} from './controller';

// middleware
import {validarCampos} from '../../middlewares/validar-campos';
import {validarAdminJWT, validarJWTAdminOUser} from '../../middlewares/validar-jwt';
import {uploadImagen} from '../../middlewares/multer-upload';

// Validadores personalizadas
import { existePais, existeArtistaId } from '../../validations/validaciones-personalizadas';

const router = Router();


router.post('/create',
    [
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('pais', 'El pais es obligatorio.').not().isEmpty(),
        check('pais').custom(existePais),
        check('descripcion', 'La descripcion es obligatorio.').not().isEmpty(),
        check('fechaInicio', 'La fecha de Inicio es obligatorio.').isDate(),
        validarCampos,
        validarAdminJWT
    ],
    create
);

router.get('/get/:id',
    [
        check('id', 'No es un Id valido ').isMongoId(),
        check('id').custom(existeArtistaId),
        validarCampos,
        validarJWTAdminOUser
    ],
    get
);

router.get('/gets/noPaginado',
    [
        validarJWTAdminOUser
    ],
    getsNoPaginado
);

router.get('/gets/:pagina',
    [
        validarJWTAdminOUser
    ],
    gets
);

router.get('/search/:termino/:pagina',
    [
        check('termino','El termino de busqueda obligatorio').not().isEmpty(),
        validarCampos,
        validarJWTAdminOUser
    ],
    search
);


router.put('/update/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeArtistaId),
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('pais', 'El pais es obligatorio.').not().isEmpty(),
        check('pais').custom(existePais),
        check('descripcion', 'La descripcion es obligatorio.').not().isEmpty(),
        check('fechaInicio', 'La fecha de Inicio es obligatorio.').isDate(),
        validarCampos,
        validarAdminJWT
    ],
    update
);


router.put('/updateImagen/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeArtistaId),
        validarCampos,
        uploadImagen.single('imagen'),
        validarAdminJWT
    ],
    updateImagen
);

router.delete('/deleteImagen/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeArtistaId),
        validarCampos,
        validarAdminJWT
    ],
    deleteImagen
);


router.delete('/delete/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeArtistaId),
        validarCampos,
        validarAdminJWT
    ],
    deleteArtista
);


export default router;
