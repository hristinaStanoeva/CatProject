import express from 'express';
import bodyParser from 'body-parser';

import { envFile } from './util/path';

import listsRoutes from './routes/lists.routes';
import listItemsRoutes from './routes/list-items.routes';

const anounceOpenPort = (port: number) => () => console.log(`Listening on port ${port}`);
const appPort = 3000;

const app = express();

app.use(bodyParser.json());

app.use('/api/lists', listsRoutes);
app.use('/api/list-items', listItemsRoutes);

app.listen(appPort, anounceOpenPort(appPort));
