import 'dotenv/config';
import app from './app';
import {dbConnection} from './database/databse';

// Conexion base de datos
dbConnection();

app.listen( process.env.PORT ,() => {
    console.log('Escuchando en el puerto:', process.env.PORT);
});
