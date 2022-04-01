import mongoose from 'mongoose';

const {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_SCHEMA,
} = process.env;

export const databaseConfig = () => {
    const db = mongoose.connection;

    mongoose.connect(
        `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_SCHEMA}?authSource=admin&authMechanism=SCRAM-SHA-1`,
        (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log('Database connected');
        },
    );
};
