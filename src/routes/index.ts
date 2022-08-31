import {Router} from 'express';

// Routes
import administrador from '../components/administrador/routes';
import authAdministrador from '../components/authAdministrador/routes';
import usuario from '../components/usuario/routes';
import authUsuario from '../components/authUsuario/routes';
import artista from '../components/artista/routes';
import album from '../components/album/routes';
import Cancion from '../components/cancion/routes';
import listaReproduccion from '../components/listaReproduccion/routes';
import cancionListaReproduccion from '../components/cancionListaReproduccion/routes';
import usuariosInvitado from '../components/usuariosInvitados/routes';
import ultimaCancion from '../components/ultimaCancion/routes';

const router = Router();



router.use('/administrador', administrador);
router.use('/authAdministrador', authAdministrador);
router.use('/usuario', usuario);
router.use('/authUsuario', authUsuario);
router.use('/artista', artista);
router.use('/album', album);
router.use('/cancion', Cancion);
router.use('/listaReproduccion', listaReproduccion);
router.use('/cancionListaReproduccion', cancionListaReproduccion);
router.use('/usuariosInvitados', usuariosInvitado);
router.use('/ultimaCancion', ultimaCancion);


export default router;

