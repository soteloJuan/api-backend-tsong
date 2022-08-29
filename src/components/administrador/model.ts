import mongoose from 'mongoose';

// paginacion con mongoose-paginate
import mongoosePaginte from 'mongoose-paginate-v2';

const schema = mongoose.Schema;


const AdministradorSchema = new schema({

    nombre: {
        type: String,
        require: true,
        lowercase: true
    },
    apellidos: {
        type: String,
        require: true,
        lowercase: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    bloqueado: {
        type: Boolean,
        require: false,
        default: false
    },
    confirmarCorreo:{
        type: Boolean,
        require: false,
        default: false
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
    role:{
        type: String,
        require: false,
        default:'ADMIN',
    }
});

AdministradorSchema.plugin(mongoosePaginte);

export default mongoose.model('administrador', AdministradorSchema);





