import expressSession from 'express-session';
import connectRedis from 'connect-redis';
import IORedis from 'ioredis';

const { REDIS_HOST, REDIS_PORT, REDIS_SECRET } = process.env;

const redisStore = connectRedis(expressSession);

export const client = new IORedis(+REDIS_PORT, REDIS_HOST, {
    showFriendlyErrorStack: true,
});

client.on('ready', () => {
    console.log('Redis is ready');
});

export const session = expressSession({
    store: new redisStore({
        client,
        host: REDIS_HOST,
        port: +REDIS_PORT,
    }),
    resave: false,
    saveUninitialized: false,
    secret: REDIS_SECRET,
    cookie: {
        secure: false,
    },
});
