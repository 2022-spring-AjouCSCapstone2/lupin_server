require('dotenv').config();
import 'module-alias/register';
import express from 'express';
import passport from 'passport';
import { Server } from 'socket.io';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import router from '~/routes';
import { session } from '~/middlewares';
import { databaseConfig, passportConfig } from '~/config';

const app = express();

const server = require('http').createServer(app);

const io = new Server(server);

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
        type: 'application/json',
    }),
);

app.use(cookieParser());

databaseConfig();

app.use(session);

app.use(passport.initialize());

app.use(passport.session());

passportConfig();

app.disable('etag');
app.disable('x-powered-by');

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    next();
});

app.get('/', (req, res) => {
    res.send('alive');
});

app.use(router);

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(+process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
});
