import * as express from 'express';
import routes from './routes';

const app = express();
const cors = require('cors');

const bodyParser = require('body-parser'); 

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit:50000
}));

app.use(cors())
app.use(express.json());
app.use(routes);

/*app.use(express.bodyParser.json({limit: '50mb'}) );
app.use(express.bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));*/



export default app;


