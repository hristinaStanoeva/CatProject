import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { envFile } from './util/path';
import { sequelize } from './util/database';

import apiRoutes from './routes/api.routes';

dotenv.config({ path: envFile });

const anounceOpenPort = (port: number) => () => console.log(`Listening on port ${port}`);
const appPort = 3000;

const app = express();

app.use(bodyParser.json());

app.use('/api', apiRoutes);

sequelize(process.env.DB_URL).authenticate()
    .then((res) => {
        console.log('Connected!');
        app.listen(appPort, anounceOpenPort(appPort));
    })
    .catch(console.log);
