import mongoose from 'mongoose';

// paginacion con mongoose-paginate
import mongoosePaginte from 'mongoose-paginate-v2';

// models
import Cancion from '../cancion/model';
import Models from '../../models/index';

const schema = mongoose.Schema;


const AlbumSchema = new schema({

    nombre: {
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
    fechaLanzamiento: {
        type: Date,
        require: true
    },
    bloqueado: {
        type: Boolean,
        require: false,
        default: false
    },
    artista: {
        type: schema.Types.ObjectId,
        require: true,
        ref:"artista"
    },

});

AlbumSchema.plugin(mongoosePaginte);

AlbumSchema.pre('remove', async function(next) {
    await Models.Cancion.remove({ album: this._id }).exec();
	next();
});

export default mongoose.model('album', AlbumSchema);





