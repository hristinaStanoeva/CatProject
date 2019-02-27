import dotenv from 'dotenv';
import { envFile } from './util/path';

// environment variables are set before any other imports in order for them to be applied properly
dotenv.config({ path: envFile });

import app from './app';
import { db } from './util/database';

const anounceOpenPort = (port: number | string) => () =>
    console.log(`Listening on port ${port}`);
const appPort = process.env.PORT || 3000;

db.sequelize
    .sync({ force: true })
    .then(() =>
        db.User.create({
            email: 'test@mail.com',
            password:
                '123456789012345678901234567890123456789012345678901234567890',
        })
    )
    .then(res => {
        console.log('Connected!');
        app.listen(appPort, anounceOpenPort(appPort));
    })
    .catch(err => console.log('ERROR: ', err));
