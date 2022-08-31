export const msgError = (mensaje: string) => ({ok:false, mensaje});


export const msgSuccess = (mensaje: string, data = {}, token: string) => {
    return {
        ok:true,
        mensaje,
        data,
        token
    };
};