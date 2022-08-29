import mongoose from 'mongoose';

// paginacion con mongoose-paginate
import mongoosePaginte from 'mongoose-paginate-v2';

const schema = mongoose.Schema;


const UsuariosInvitadosSchema = new schema({

    listaReproduccion: {
        type: schema.Types.ObjectId,
        require: true,
        ref:"listaReproduccion"
    },
    usuario: {
        type: schema.Types.ObjectId,
        require: true,
        ref:"usuario"
    },

});

UsuariosInvitadosSchema.plugin(mongoosePaginte);

export default mongoose.model('usuariosInvitados', UsuariosInvitadosSchema);





