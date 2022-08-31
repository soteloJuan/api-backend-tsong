import {Router} from 'express';
import {check} from 'express-validator';

// controllers
import { login, confirmarCorreo, renewToken } from './controller';

// middleware
import { validarCampos } from '../../middlewares/validar-campos';
import {validarAdminJWT} from '../../middlewares/validar-jwt';

const route = Router();



route.post('/login',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El passsword debe ser mayor a 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    login
);

route.get('/renew',
    validarAdminJWT,
    renewToken
);


route.get('/confirmarCorreo/:token',
    validarAdminJWT,
    confirmarCorreo
);



export default route;