const cloudinary = require('cloudinary');

const name: string =  process.env.cloudinary_CLOUD_NAME as string;
const key : string =  process.env.cloudinary_API_KEY as string;
const secret : string =  process.env.cloudinary_API_SECRET as string;

cloudinary.config({
    cloud_name: name,
    api_key: key,
    api_secret: secret
});


export const subirImagenService = async(rutaImagen: string) => {
    try{
        const resultadoCloudinary = await cloudinary.v2.uploader.upload(rutaImagen);

        return {imagenID: resultadoCloudinary.public_id,  imagenURL: resultadoCloudinary.url};

    }catch(error){
        return error;
    }
}

export const eliminarImagenService = async(imagenID: string) => {

    const resultadoCloudinary = await cloudinary.v2.uploader.destroy(imagenID);

    return resultadoCloudinary;
}

