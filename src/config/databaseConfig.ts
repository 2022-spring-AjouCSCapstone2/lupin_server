import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_SCHEMA,
    NODE_ENV,
} = process.env;

export const dataSource = new DataSource({
    type: 'mysql',
    host: DATABASE_HOST,
    port: +DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_SCHEMA,
    logging: ['error', 'query'],
    entities: ['src/models/*.ts'],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: NODE_ENV !== 'production',
});

// export const databaseConfig = () => {
//     const db = mongoose.connection;
//
//     mongoose.connect(
//         `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_SCHEMA}?authSource=admin&authMechanism=SCRAM-SHA-1`,
//         (err) => {
//             if (err) {
//                 console.error(err);
//                 process.exit(1);
//             }
//             console.log('Database connected');
//         },
//     );
// };
