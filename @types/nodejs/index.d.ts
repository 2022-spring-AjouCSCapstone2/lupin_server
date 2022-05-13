import { Session } from 'express-session';

declare namespace NodeJS {
    interface ProcessEnv {
        REDIS_HOST: string;
        REDIS_PORT: string;
        REDIS_SECRET: string;

        PORT: string;

        DATABASE_PORT: string;
        DATABASE_HOST: string;
        DATABASE_USER: string;
        DATABASE_PASSWORD: string;
        DATABASE_SCHEMA: string;

        SESSION_MODE: string;

        NODE_ENV: string;
    }
}

declare module 'http' {
    interface IncomingMessage {
        session: Session;
    }
}
