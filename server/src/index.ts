import express from 'express';
import bodyParser from 'body-parser';
import {
    Request,
    Response
} from 'express';

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

app.use(sampleRoutes);

app.listen(appPort, anounceOpenPort(appPort));
