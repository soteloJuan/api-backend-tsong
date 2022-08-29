import mongoose from 'mongoose';

// paginacion con mongoose-paginate
import mongoosePaginte from 'mongoose-paginate-v2';

const schema = mongoose.Schema;


const ultimaCancionSchema = new schema({

    cancion: {
        type: schema.Types.ObjectId,
        require: true,
        ref:"cancion"
    },
    usuario: {
        type: schema.Types.ObjectId,
        require: true,
        ref:"usuario"
    },

});

ultimaCancionSchema.plugin(mongoosePaginte);

export default mongoose.model('ultimaCancion', ultimaCancionSchema);





