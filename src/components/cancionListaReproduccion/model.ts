import mongoose from 'mongoose';

// paginacion con mongoose-paginate
import mongoosePaginte from 'mongoose-paginate-v2';

const schema = mongoose.Schema;


const cancionListaReproduccionSchema = new schema({

    listaReproduccion: {
        type: schema.Types.ObjectId,
        require: true,
        ref:"listaReproduccion"
    },
    cancion: {
        type: schema.Types.ObjectId,
        require: true,
        ref:"cancion"
    },

});

cancionListaReproduccionSchema.plugin(mongoosePaginte);

export default mongoose.model('cancionListaReproduccion', cancionListaReproduccionSchema);





