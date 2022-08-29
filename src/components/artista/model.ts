import mongoose from 'mongoose';

// paginacion con mongoose-paginate
import mongoosePaginte from 'mongoose-paginate-v2';

// models
import Models from '../../models/index';

const schema = mongoose.Schema;


const ArtistaSchema = new schema({

    nombre: {
        type: String,
        require: true,
        lowercase: true
    },
    pais: {
        type: String,
        require: true,
        lowercase: true
    },
    descripcion: {
        type: String,
        require: true
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
    fechaInicio: {
        type: Date,
        require: true
    },
    bloqueado: {
        type: Boolean,
        require: false,
        default: false
    },
});

ArtistaSchema.plugin(mongoosePaginte);


ArtistaSchema.pre('remove', async function(next) {
	await Models.Album.remove({ artista: this._id }).exec();
    await Models.Cancion.remove({ artista: this._id }).exec();
	next();
});


export default mongoose.model('artista', ArtistaSchema);





