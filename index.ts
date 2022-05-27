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
import {
    saveLog,
    getMyCourseByCourseId,
    updatePoint,
    getQuizById,
    saveQuiz,
    saveQuizLog,
} from '~/services';
import { SaveLogRequest, SubmitQuizRequest } from './src/dto';

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

const io = new Server(server, {
    cookie: true,
    cors: {
        origin: ['http://localhost:3000', '*'],
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

app.use(
    cors({
        origin: ['http://localhost:3000', '*'],
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

    if (sess) {
        next();
    } else {
        next(new Error('Authentication Failed'));
    }
});

io.on('connection', (socket) => {
    console.log(
        `a user ${socket.request.user?.userId} connected`,
        socket.request.user,
    );

    socket.on('showRoom', (info) => {
        socket.emit(
            'showRoom',
            JSON.stringify(Array.from(io.sockets.adapter.rooms.entries())),
        );
    });

    socket.on('test', (info, callback) => {
        console.log(socket.request.headers);
        console.log(socket.request.user);
        callback({
            headers: socket.request.headers,
            user: socket.request.user,
        });
    });

    socket.on('createRoom', (data: { courseId: string }, callback) => {
        const user = socket.request.user;
        const roomId = `${data.courseId}-${+new Date()}`;

        if (!user || user.userType !== 'PROFESSOR') {
            callback('Forbidden');
        }
        socket.join(roomId);

        callback(roomId);
    });

    socket.on('joinRoom', async (data: { courseId: string }, callback) => {
        const user = socket.request.user;
        const course = await getMyCourseByCourseId(user.id, data.courseId);

        if (!course) {
            callback('Forbidden');
        }

        const rooms = [...io.sockets.adapter.rooms.keys()];
        const roomIdRegex = new RegExp(`${data.courseId}-[0-9]+`);

        const foundRoomId = rooms.find((value) => roomIdRegex.test(value));
        if (foundRoomId) {
            socket.join(foundRoomId);

            socket.to(foundRoomId).emit('newStudent', {
                socketId: socket.id,
                userId: user.userId,
            });

            callback(foundRoomId);
        } else {
            callback('no course session opened');
        }
    });

    socket.on('leaveRoom', (data: { roomId: string }, callback) => {
        const user = socket.request.user;

        socket.leave(data.roomId);

        socket.to(data.roomId).emit('studentLeaved', {
            socketId: socket.id,
            userId: user.userId,
        });
        callback('success');
    });

    socket.on('message', (data) => {
        console.log(data);
    });

    socket.on('disconnect', () => {
        const user = socket.request.user;
        console.log(`a user ${user?.userId} disconnected`);
    });

    // 익명 질문, 포인트 증감, 퀴즈 출제
    socket.on(
        'question',
        async (
            data: {
                roomId: string;
                type: string;
                isAnonymous: boolean;
                content: string;
                courseId: string;
            },
            callback,
        ) => {
            const user = socket.request.user;

            const params = new SaveLogRequest(data);
            const savedLog = await saveLog(params, user.id);
            console.log(savedLog);
            if (!savedLog) {
                callback('Failed');
            }
            socket.to(data.roomId).emit('newQuestion', savedLog);
            callback('success');
        },
    );

    socket.on(
        'checkQuestion',
        async (data: { logId: number; point: boolean }, callback) => {
            const user = socket.request.user;

            if (!user || user.userType !== 'PROFESSOR') {
                callback('Forbidden');
            }

            const log = await updatePoint(data);
            if (!log) {
                callback('Failed');
            }
            callback(log);
        },
    );

    socket.on(
        'quiz',
        async (
            data: {
                roomId: string;
                content: string;
                list: { no: number; content: string }[];
                answer: number;
            },
            callback,
        ) => {
            const user = socket.request.user;

            if (!user || user.userType !== 'PROFESSOR') {
                callback('Forbidden');
            }

            const params = new SubmitQuizRequest(data);
            const savedQuiz = await saveQuiz(params);
            if (!savedQuiz) {
                callback('Failed');
            }
            socket.to(data.roomId).emit('quiz', savedQuiz);
            callback(savedQuiz);
        },
    );

    socket.on(
        'quizAnswer',
        async (data: { quizId: number; answer: number }, callback) => {
            const user = socket.request.user;
            const quiz = await getQuizById(data.quizId);

            if (!user) {
                callback('Forbidden');
            }

            const isAnswer = quiz.answer.no === data.answer;
            const savedQuizLog = await saveQuizLog({
                answer: data.answer,
                isAnswer,
                quizId: data.quizId,
                userId: user.id,
            });
            callback(savedQuizLog.isAnswer);
        },
    );
});

server.listen(+process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
});
