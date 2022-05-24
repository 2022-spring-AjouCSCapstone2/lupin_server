import dotenv from 'dotenv';

dotenv.config();

import 'module-alias/register';
import express from 'express';
import passport from 'passport';
import { Server } from 'socket.io';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import router from '~/routes';
import { session } from '~/middlewares';
import { dataSource, passportConfig } from '~/config';

dataSource
    .initialize()
    .then(() => {
        console.log('Database has been initialized');
    })
    .catch((err) => {
        console.error('Database config error', err);
    });

const app = express();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const server = require('http').createServer(app);

const io = new Server(server, { cookie: true });

app.use(
    cors({
        origin: '*',
        credentials: true,
    }),
);

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
        type: 'application/json',
    }),
);

app.use(cookieParser());

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

const wrap = (middleware) => (socket, next) => {
    middleware(socket.request, {}, next);
};

io.use(wrap(session));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
    const sess = socket.request.session;

    console.log(sess);

    if (sess) {
        next();
    } else {
        next(new Error('Authentication Failed'));
    }
});

// 임시 값
const rooms = new Map();
let newRoomId = 90000001;

io.on('connection', (socket) => {
    console.log(
        'a user connected',
        socket.handshake.auth,
        socket.handshake.headers,
    );

    socket.on('showRoom', (info) => {
        socket.emit('showRoom', JSON.stringify(Array.from(rooms.entries())));
    });

    socket.on('createRoom', (roomData, info, callback) => {
        console.log('createRoom', info);
        const roomId = String(newRoomId);
        newRoomId += 1;
        rooms.set(roomId, roomData);
        console.log(rooms);
        socket.join(roomId);
        callback(roomId);
    });

    socket.on('joinRoom', (info, callback) => {
        console.log('joinRoom', info);
        const roomId = String(info.roomId);
        const roomData = rooms.get(roomId);
        console.log(roomId, roomData);

        if (roomData !== undefined) {
            socket.join(roomId);

            socket.to(roomId).emit('newStudent', socket.id);

            console.log(io.sockets.adapter.rooms);
            callback({
                sessions: [...io.sockets.adapter.rooms.get(roomId)],
                roomData,
            });
            // callback([...io.sockets.adapter.rooms.get(roomId)], roomData);
        } else {
            socket.emit('noRoom', 'Wrong Room ID');
        }
    });

    socket.on('leaveRoom', (roomId, info, callback) => {
        console.log('leaveRoom', info);
        socket.to(roomId).emit('studentLeaved', socket.id);
        socket.leave(roomId);
        callback();
    });

    socket.on('message', (data) => {
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(+process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
});
