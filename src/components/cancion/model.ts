import mongoose from 'mongoose';

// paginacion con mongoose-paginate
import mongoosePaginte from 'mongoose-paginate-v2';

// models
import Models from '../../models/index';

const schema = mongoose.Schema;


const CancionSchema = new schema({

    nombre: {
        type: String,
        require: true,
        lowercase: true
    },
    numero: {
        type: Number,
        require: true,
    },
    duracion: {
        type: Number,
        require: true,
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
    cancionID: {
        type: String,
        require: false,
        default: null
    },

    cancionURL: {
        type: String,
        require: false,
        default: null
    },
    genero: {
        type: String,
        require: true,
        lowercase: true
    },
    fechaLanzamiento: {
        type: Date,
        require: true
    },
    bloqueado: {
        type: Boolean,
        require: false,
        default: false
    },
    album: {
        type: schema.Types.ObjectId,
        require: false,
        ref:"album"
    },
    artista: {
        type: schema.Types.ObjectId,
        require: false,
        ref:"artista"
    },

});

CancionSchema.plugin(mongoosePaginte);

CancionSchema.pre('remove', async function(next){

    await Models.CancionListaReproduccion.remove({cancion: this._id}).exec();


    next();
});

export default mongoose.model('cancion', CancionSchema);





