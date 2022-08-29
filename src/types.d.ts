declare namespace Express {
    export interface Request {
        id: string,
        tokenAdmin: any,
        idAlbum: string,
        idArtista: string,
        idCancion: string
    }
}