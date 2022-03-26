import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import redis from 'connect-redis';
import express from 'express';
import http from 'http';
import { redisClient } from './src/utils/index.js';

dotenv.config();

const app = express();

const server = http.createServer(app);

const redisStore = redis(session);

const io = new Server(server);

const db = mongoose.connection;

db.on('error', console.error);

db.once('open', () => {
    console.log('Sucessfully connected to mongoDB');
});

mongoose.connect('mongodb://localhost:27017/lupin');

app.use(
    session({
        store: new redisStore({
            client: redisClient,
        }),
        resave: false,
        saveUninitialized: false,
        secret: process.env.REDIS_SECRET,
    }),
);

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
        type: 'application/json',
    }),
);

app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    next();
});

app.get('/', (req, res) => {
    res.send('alive');
});

// app.use(router);

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
});
