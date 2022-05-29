import expressSession from 'express-session';
import connectRedis from 'connect-redis';
import sessionFileStore from 'session-file-store';
import IORedis from 'ioredis';

const { REDIS_HOST, REDIS_PORT, REDIS_SECRET, SESSION_MODE } = process.env;

const FileStore = sessionFileStore(expressSession);

const RedisStore = connectRedis(expressSession);

export const client = new IORedis(+REDIS_PORT, REDIS_HOST, {
    showFriendlyErrorStack: true,
});

client.on('ready', () => {
    console.log('Redis is ready');
});

export const session = expressSession({
    store:
        SESSION_MODE === 'redis'
            ? new RedisStore({
                  client,
                  host: REDIS_HOST,
                  port: +REDIS_PORT,
              })
            : new FileStore(),
    resave: false,
    saveUninitialized: false,
    secret: REDIS_SECRET,
    cookie: {
        secure: false,
        maxAge: 3600000 * 24,
    },
});
