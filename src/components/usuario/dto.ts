export const msgError = (mensaje: string) => ({ok:false, mensaje});


export const msgSuccess = (mensaje: string, data = null) => {
    return {
        ok:true,
        mensaje,
        data
    };
};