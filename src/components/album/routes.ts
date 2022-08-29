import {Router} from 'express';
import {check} from 'express-validator';

// Controllers
import {
    create,
    get,
    gets,
    getsNoPaginado,
    getsPorArtista,
    getsPorArtistaPaginado,
    search,
    update,
    updateImagen,
    deleteImagen,
    deleteAlbum
} from './controller';

// middleware
import {validarCampos} from '../../middlewares/validar-campos';
import {validarAdminJWT, validarJWTAdminOUser} from '../../middlewares/validar-jwt';
import {uploadImagen} from '../../middlewares/multer-upload';

// Validadores personalizadas
import { existeArtistaId, existeAlbumId } from '../../validations/validaciones-personalizadas';

const router = Router();


router.post('/create',
    [
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatorio.').not().isEmpty(),
        check('fechaLanzamiento', 'La fecha de Lanzamiento es obligatorio.').isDate(),
        check('artista', 'El artista es obligatorio.').isMongoId(),
        check('artista').custom(existeArtistaId),
        validarCampos,
        validarAdminJWT
    ],
    create
);

router.get('/get/:id',
    [
        check('id', 'No es un Id valido ').isMongoId(),
        check('id').custom(existeAlbumId),
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

router.get('/gets/porArtista/:idArtista',
    [
        check('idArtista', 'No es un Id valido ').isMongoId(),
        check('idArtista').custom(existeArtistaId),
        validarCampos,
        validarJWTAdminOUser
    ],
    getsPorArtista
);

router.get('/gets/porArtistaPaginado/:idArtista/:pagina',
    [
        check('idArtista', 'No es un Id valido ').isMongoId(),
        check('idArtista').custom(existeArtistaId),
        validarCampos,
        validarJWTAdminOUser
    ],
    getsPorArtistaPaginado
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
        check('id').custom(existeAlbumId),
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatorio.').not().isEmpty(),
        check('fechaLanzamiento', 'La fecha de Lanzamiento es obligatorio.').isDate(),
        check('artista', 'El artista es obligatorio.').isMongoId(),
        check('artista').custom(existeArtistaId),
        validarCampos,
        validarAdminJWT
    ],
    update
);

router.put('/updateImagen/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeAlbumId),
        validarCampos,
        uploadImagen.single('imagen'),
        validarAdminJWT,
    ],
    updateImagen
);

router.delete('/deleteImagen/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeAlbumId),
        validarCampos,
        validarAdminJWT
    ],
    deleteImagen
);



router.delete('/delete/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeAlbumId),
        validarCampos,
        validarAdminJWT
    ],
    deleteAlbum
);

export default router;
