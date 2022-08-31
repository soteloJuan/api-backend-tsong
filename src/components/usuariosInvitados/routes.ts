import {Router} from 'express';
import {check} from 'express-validator';

// Controllers
import {
    create,
    get,
    gets,
    getsPorIdUsuario,
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
        yoCreeListaReproduccion
    ],
    create
);

router.get('/get/:id',
    [
        check('id', 'No es un Id valido ').isMongoId(),
        check('id').custom(existeUsuariosInvitadosId),
        validarCampos,
        validarJWTUsuariosInvitados
    ],
    get
);

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
