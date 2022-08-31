import {Router} from 'express';
import {check} from 'express-validator';

// controllers
import {
    login,
    confirmarCorreo,
    renewToken,
    googleSignIn    
} from './controller';

// middleware
import { validarCampos } from '../../middlewares/validar-campos';
import {validarUserJWT} from '../../middlewares/validar-jwt';

const route = Router();



route.post('/login',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El passsword debe ser mayor a 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    login
);

route.post('/login/google',
    [
        check('token', 'El token es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
);


route.get('/renew',
    validarUserJWT,
    renewToken
);


route.get('/confirmarCorreo/:token',
    validarUserJWT,
    confirmarCorreo
);



export default route;