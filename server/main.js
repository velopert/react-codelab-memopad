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
const port = 3000;
const devPort = 4000;

/* setup express middlewares */
app.use(morgan('dev'));
app.use(bodyParser.json());
/* use session */
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));

/* serve static files */
app.use('/', express.static(path.join(__dirname, './../public')));

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
