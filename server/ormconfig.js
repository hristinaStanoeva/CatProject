const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // next three entries are needed for cli migration generation
    entities: ['dist/entities/**/*.entity.js'],
    migrations: ['dist/migrations/**/*.js'],
    subscribers: ['dist/subscribers/**/*.subscriber.js'],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers',
    },
};
