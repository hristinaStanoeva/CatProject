import dotenv from 'dotenv';

import app from './app';
import { sequelize } from './util/database';
import { envFile } from './util/path';

const anounceOpenPort = (port: number | string) => () => console.log(`Listening on port ${port}`);
const appPort = process.env.PORT || 3000;

dotenv.config({ path: envFile });

sequelize(process.env.DB_URL).authenticate()
    .then((res) => {
        console.log('Connected!');
        app.listen(appPort, anounceOpenPort(appPort));
    })
    .catch(console.log);
