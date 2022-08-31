import 'dotenv/config';
import app from './app';
import {dbConnection} from './database/databse';

dbConnection();

app.listen( process.env.PORT);
