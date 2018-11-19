import express from 'express';
import bodyParser from 'body-parser';

import {
    NextFunction,
    Response,
    Request
} from 'express-serve-static-core';

import { routes } from './routes';

interface CustomRequest extends Request {
    customData?: {
        [key: string]: boolean;
    };
}

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

app.use('/add-user', (req, res, next) => {
    console.log('body: ', req.body);
    res.json(req.body);
});

app.use('/user', (req: CustomRequest, res) => {
    return res.send('User!');
});

app.use('/', (req: CustomRequest, res) => {
    return res.json(req.customData);
});

app.listen(appPort, anounceOpenPort(appPort));
