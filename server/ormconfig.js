const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: ['src/entities/**/*.entity.ts'],
    migrations: ['src/migrations/**/*.migration.ts'],
    subscribers: ['src/subscribers/**/*.subscriber.ts'],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers',
    },
};
