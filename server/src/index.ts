import express from 'express';
import { join } from 'path';
import bodyParser from 'body-parser';
import {
    Request,
    Response
} from 'express';

import { path } from './util/path';

import listsRoutes from './routes/lists.routes';

const anounceOpenPort = (port: number) => () => console.log(`Listening on port ${port}`);
const appPort = 3000;

const app = express();

app.use(bodyParser.json());

app.use('/api/lists', listsRoutes);

app.listen(appPort, anounceOpenPort(appPort));
