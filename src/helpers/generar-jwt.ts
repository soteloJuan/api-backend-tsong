import jwt from 'jsonwebtoken';



export const generarJWT = (id: string) => {

    return new Promise( (resolve, reject): string | any  => {

        const payload = {id};

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY!, {
            expiresIn: '24h'
        },(error, token) => {
            (error) ? (reject('No se pudo general el token')) : (resolve(token));
        });
    });
};



// Aqui generamos el token para mandarlo por correo. Y confirmar el correo del usuario.
export const generarJWTEmail = (id: string) => {

    return new Promise( (resolve, reject): string | any  => {

        const payload = {id};

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY!, {
            expiresIn: '365d'
        },(error, token) => {
            (error) ? (reject('No se pudo genera el token')) : (resolve(token));
        });
    });

};
