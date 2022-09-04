import {Router} from 'express';
import {check} from 'express-validator';

// Controllers
import {
    create,
    get,
    getRandomCancion,
    gets,
    getsPorAlbum,
    getsPorAlbumPaginado,
    search,
    update,
    updateCancion,
    updateImagen,
    deleteImagen,
    deleteCancion
} from './controller';

// middleware
import {validarCampos} from '../../middlewares/validar-campos';
import {validarAdminJWT, validarJWTAdminOUser} from '../../middlewares/validar-jwt';
import { uploadImagen, uploadCancion } from '../../middlewares/multer-upload';

// Validadores personalizadas
import { existeArtistaId, existeAlbumId, existeGeneroCancion, existeCancionId} from '../../validations/validaciones-personalizadas';

const router = Router();


router.post('/create',
    [
        check('album', 'El album al que pertenece es obligatorio.').isMongoId(),
        check('album').custom(existeAlbumId),
        check('artista', 'El artista al que pertenece es obligatorio.').isMongoId(),
        check('artista').custom(existeArtistaId),
        check('genero','El genero es obligatori').not().isEmpty(),
        check('genero').custom(existeGeneroCancion),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('duracion', 'La duracion de la cancion es necesario.').isFloat(),
        check('numero', 'El numero de la cancion es necesario.').isNumeric(),
        check('fechaLanzamiento', 'La fecha de Lanzamiento es obligatorio.').isDate(),
        validarCampos,
        validarAdminJWT,
    ],
    create
);

router.get('/get/:id',
    [
        check('id', 'No es un Id valido ').isMongoId(),
        check('id').custom(existeCancionId),
        validarCampos,
        validarJWTAdminOUser
    ],
    get
);

router.get('/getRandom',
    validarJWTAdminOUser,
    getRandomCancion
);

router.get('/gets/:pagina',
    [
        validarJWTAdminOUser
    ],
    gets
);


router.get('/gets/porAlbum/:idAlbum',
    [
        check('idAlbum', 'No es un Id valido ').isMongoId(),
        check('idAlbum').custom(existeAlbumId),
        validarCampos,
        validarJWTAdminOUser
    ],
    getsPorAlbum
);


router.get('/gets/porAlbumPaginado/:idAlbum/:pagina',
    [
        check('idAlbum', 'No es un Id valido ').isMongoId(),
        check('idAlbum').custom(existeAlbumId),
        validarCampos,
        validarJWTAdminOUser
    ],
    getsPorAlbumPaginado
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
        check('id').custom(existeCancionId),
        check('album', 'El album al que pertenece es obligatorio.').isMongoId(),
        check('album').custom(existeAlbumId),
        check('artista', 'El artista al que pertenece es obligatorio.').isMongoId(),
        check('artista').custom(existeArtistaId),
        check('genero','El genero es obligatori').not().isEmpty(),
        check('genero').custom(existeGeneroCancion),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('duracion', 'La duracion de la cancion es necesario.').isFloat(),
        check('numero', 'El numero de la cancion es necesario.').isNumeric(),
        check('fechaLanzamiento', 'La fecha de Lanzamiento es obligatorio.').isDate(),
        validarCampos,
        validarAdminJWT
    ],
    update
);

router.put('/updateCancion/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeCancionId),
        validarCampos,
        uploadCancion.single('cancion'),
        validarAdminJWT
    ],
    updateCancion
);

router.put('/updateImagen/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeCancionId),
        validarCampos,
        uploadImagen.single('imagen'),
        validarAdminJWT
    ],
    updateImagen
);

router.delete('/deleteImagen/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeCancionId),
        validarCampos,
        validarAdminJWT
    ],
    deleteImagen
);



router.delete('/delete/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeCancionId),
        validarCampos,
        validarAdminJWT
    ],
    deleteCancion
);

export default router;
