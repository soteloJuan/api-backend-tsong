import mongoose from 'mongoose';

// paginacion con mongoose-paginate
import mongoosePaginte from 'mongoose-paginate-v2';

// models 
import Models from '../../models/index';

const schema = mongoose.Schema;


const UsuarioSchema = new schema({

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
    google:{
        type: Boolean,
        require:false,
        default:false
    },
    bloqueado: {
        type: Boolean,
        require: false,
        default: false
    },
    confirmarCorreo:{
        type: Boolean,
        require: false,
        default: true
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
        default:'USER',
    }
});

UsuarioSchema.plugin(mongoosePaginte);


UsuarioSchema.pre('remove', async function(next){

    const arrayListaReproduccion: any[] = await Models.ListaReproduccion.find({usuario: this._id});
    await Models.ListaReproduccion.remove({usuario: this._id}).exec();

    arrayListaReproduccion.forEach((elemento: any) => {

		Models.CancionListaReproduccion.find({ listaReproduccion: elemento._id }).remove().exec();
        Models.UsuariosInvitados.find({ listaReproduccion: elemento._id }).remove().exec();

	});

    next();

});


export default mongoose.model('Usuario', UsuarioSchema);





