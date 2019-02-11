import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { envFile } from './util/path';
import { sequelize } from './util/database';

import listsRoutes from './routes/lists.routes';
import listItemsRoutes from './routes/list-items.routes';
import authRoutes from './routes/auth';

dotenv.config({ path: envFile });

const anounceOpenPort = (port: number) => () => console.log(`Listening on port ${port}`);
const appPort = 3000;

const app = express();

app.use(bodyParser.json());

app.use('/api/lists', listsRoutes);
app.use('/api/list-items', listItemsRoutes);
app.use('/api/auth', authRoutes);

sequelize(process.env.DB_URL).authenticate()
    .then((res) => {
        console.log('Connected!');
        app.listen(appPort, anounceOpenPort(appPort));
    })
    .catch(console.log);
