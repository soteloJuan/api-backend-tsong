import {Request, Response} from 'express';

// Modelos
import Models from '../models/index';

// interfaces
import { LoginInterface } from '../interfaces/login.interface';


export const  formateoRegistroAdmin = (req: Request) => {

    const {
        nombre,
        apellidos,
        email,
        password,
    } = req.body;

    const nuevoAdministrador = new Models.Administrador({
        nombre,
        apellidos,
        email,
        password,
    });

    return nuevoAdministrador;
}

export const  formateoRegistroUser = (req: Request) => {

    const {
        nombre,
        apellidos,
        email,
        password,
    } = req.body;

    const nuevoAdministrador = new Models.Usuario({
        nombre,
        apellidos,
        email,
        password,
    });

    return nuevoAdministrador;
}

export const  formateoRegistroArtista = (req: Request) => {

    const {
        nombre,
        pais,
        descripcion,
        fechaInicio
    } = req.body;

    const nuevoArtista = new Models.Artista({
        nombre,
        pais,
        descripcion,
        fechaInicio
    });

    return nuevoArtista;
}


export const formateoLogin = (req: Request) => {
    
    const loginData: LoginInterface = {
        email: req.body.email,
        password: req.body.password
    }

    return loginData;

};


export const formatoUpdate = (req: Request) => {

    return {
        nombre: req.body.nombre,
        apellidos :req.body.apellidos,
        email : req.body.email,
        bloqueado :req.body.bloqueado,
    }
}

export const formatoUpdateArtista = (req: Request) => {

    return {
        nombre: req.body.nombre,
        pais : req.body.pais,
        descripcion :req.body.descripcion,
        fechaInicio :req.body.fechaInicio,
        bloqueado: req.body.bloqueado
    }
}

export const formatoUpdateAlbum = (req: Request) => {

    return {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fechaLanzamiento :req.body.fechaLanzamiento,
        artista: req.body.artista,
        bloqueado: req.body.bloqueado
    }
}



export const  formateoRegistroAlbum = (req: Request) => {

    const {
        nombre,
        descripcion,
        fechaLanzamiento,
        artista
    } = req.body;

    const nuevoArtista = new Models.Album({
        nombre,
        descripcion,
        fechaLanzamiento,
        artista
    });

    return nuevoArtista;
}

export const  formateoRegistroCancion = (req: Request) => {

    const {
        nombre,
        numero,
        duracion,
        genero,
        fechaLanzamiento,
        album,
        artista,
    } = req.body;

    const nuevoArtista = new Models.Cancion({
        nombre,
        numero,
        duracion,
        genero,
        fechaLanzamiento,
        album,
        artista,
    });

    return nuevoArtista;
}

export const formatoUpdateCancion = (req: Request) => {

    return {
        nombre: req.body.nombre,
        numero : req.body.numero,
        duracion :req.body.duracion,
        genero :req.body.genero,
        fechaLanzamiento :req.body.fechaLanzamiento,
        bloqueado :req.body.bloqueado,
        album :req.body.album,
        artista :req.body.artista,
    }
}


export const formateoRegistroListaReproduccion = (req: Request) => {

    const {
        nombre,
        usuario,
    } = req.body;

    const nuevoArtista = new Models.ListaReproduccion({
        nombre,
        usuario,
    });

    return nuevoArtista;
}
export const formatoUpdateListaReproduccion = (req: Request) => {

    return {
        nombre: req.body.nombre,
        usuario:req.body.usuario,

    }
}


export const  formateoRegistroCancionListaReproduccion = (req: Request) => {

    const {
        listaReproduccion,
        cancion,
    } = req.body;

    const nuevoCancionListaReproduccion = new Models.CancionListaReproduccion({
        listaReproduccion,
        cancion,
    });

    return nuevoCancionListaReproduccion;
}
export const formatoUpdateCancionListaReproduccion = (req: Request) => {

    return {
        listaReproduccion: req.body.listaReproduccion,
        cancion:req.body.cancion,
    }
}



export const  formateoRegistroUsuariosInvitados = (req: Request) => {

    const {
        listaReproduccion,
        usuario
    } = req.body;

    const nuevoUsuariosInvitados = new Models.UsuariosInvitados({
        listaReproduccion,
        usuario
    });

    return nuevoUsuariosInvitados;
}

export const  formateoRegistroUltimaCancion = (req: Request) => {

    const {
        cancion,
        usuario
    } = req.body;

    const nuevoUsuariosInvitados = new Models.UltimaCancion({
        cancion,
        usuario
    });

    return nuevoUsuariosInvitados;
}

export const formatoUpdateUltimaCancion = (req: Request) => {

    return {
        cancion:req.body.cancion,
        usuario: req.body.usuario,
    }
}




