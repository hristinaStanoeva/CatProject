import express from 'express';
import { join } from 'path';
import bodyParser from 'body-parser';
import {
    Request,
    Response
} from 'express';

import { path } from './util/path';

import {
    CustomRequest,
} from './models';

import sampleRoutes from './routes/sample';

const anounceOpenPort = (port: number) => () => console.log(`Listening on port ${port}`);
const appPort = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req: CustomRequest, res, next) => {
    req.customData = req.customData || {};

    req.customData = {
        ...req.customData,
        firstMiddleware: true
    };

    return next();
});

app.use((req: CustomRequest, res, next) => {
    req.customData = req.customData || {};

    req.customData = {
        ...req.customData,
        secondMiddleware: true
    };

    return next();
});

app.use('/api/', sampleRoutes);

app.get('/home', (req, res, next) => {
    res.sendFile(join(path.projectRoot, 'views', 'home.html'));
});

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.listen(appPort, anounceOpenPort(appPort));
