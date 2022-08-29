import express,{Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index';

const app: Application = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes
app.use('/api', routes);

export default app;
