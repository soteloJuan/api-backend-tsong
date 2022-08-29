import mongoose from 'mongoose';

// paginacion con mongoose-paginate
import mongoosePaginte from 'mongoose-paginate-v2';

// Modelos
import Models from '../../models/index';


const schema = mongoose.Schema;


const listaReproduccionSchema = new schema({

    nombre: {
        type: String,
        require: true,
        lowercase: true
    },
    imagenID:{
        type: String,
        require: false,
        default: null
    },
    imagenURL:{
        type: String,
        require: false,
        default: null
    },
    usuario: {
        type: schema.Types.ObjectId,
        require: true,
        ref:"usuario"
    },
});

listaReproduccionSchema.plugin(mongoosePaginte);

listaReproduccionSchema.pre('remove', async function(next){

    await Models.CancionListaReproduccion.remove({listaReproduccion: this._id}).exec();

    await Models.UsuariosInvitados.remove({listaReproduccion: this._id}).exec();


    next();
});

export default mongoose.model('listaReproduccion', listaReproduccionSchema);





