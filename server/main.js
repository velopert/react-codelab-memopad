import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

/* express middlewares */
import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY
import session from 'express-session';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';


/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/codelab');

const app = express();
const port = 8080;
const devPort = 8081;

/* setup express middlewares */
app.use(morgan('dev'));
app.use(bodyParser.json());
/* use session */
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));



/* setup routers & static directory */
import api from './routes';
app.use('/api', api);

/* serve static files */
app.use('/', express.static(path.join(__dirname, './../public')));

/* support client-side routing */
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

/* listen server */
app.listen(port, () => {
    console.log('Express is listening on port', port);
});

/* setup webpack devserver */
if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}
