import dotenv from 'dotenv';
import { envFile } from './util/path';

// environment variables are set before any other imports in order for them to be applied properly
dotenv.config({ path: envFile });

import app from './app';
import { sequelize } from './util/database';

const anounceOpenPort = (port: number | string) => () =>
    console.log(`Listening on port ${port}`);
const appPort = process.env.PORT || 3000;

sequelize
    .sync({ force: true })
    .then(res => {
        console.log('Connected!');
        app.listen(appPort, anounceOpenPort(appPort));
    })
    .catch(err => console.log('ERROR: ', err));
