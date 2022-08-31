import {Router} from 'express';
import {check} from 'express-validator';

// Controllers
import {
    create,
    get,
    gets,
    deleteCancionListareproduccion
} from './controller';

// middleware
import {validarCampos} from '../../middlewares/validar-campos';
import { validarUserJWT, validarJWTCLR,validarJWTAdminOUser } from '../../middlewares/validar-jwt';
import {yoCreeListaReproduccion} from '../../middlewares/validar-listaReproduccion';

// Validadores personalizadas
import { existeListaReproduccionId, existeCancionId, existeCancionListaReproduccionId } from '../../validations/validaciones-personalizadas';

const router = Router();


router.post('/create',
    [
        check('listaReproduccion', 'La lista de Reproduccion es obligatorio.').isMongoId(),
        check('listaReproduccion').custom(existeListaReproduccionId),
        check('cancion', 'La Canción es obligatorio.').isMongoId(),
        check('cancion').custom(existeCancionId),
        validarCampos,
        validarUserJWT,
        yoCreeListaReproduccion
    ],
    create
);

router.get('/get/:id',
    [
        check('id', 'No es un Id valido ').isMongoId(),
        check('id').custom(existeCancionListaReproduccionId),
        validarCampos,
        validarJWTAdminOUser
    ],
    get
);


router.get('/gets/:id',
    [
        check('id', 'No es un Id valido ').isMongoId(),
        check('id').custom(existeListaReproduccionId),
        validarCampos,
        validarJWTAdminOUser
    ],
    gets
);

router.delete('/delete/:id',
    [
        check('id','No es un Id valido').isMongoId(),
        check('id').custom(existeCancionListaReproduccionId),
        validarCampos,
        validarJWTCLR
    ],
    deleteCancionListareproduccion
);

export default router;
