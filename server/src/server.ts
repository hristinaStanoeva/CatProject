import 'reflect-metadata';
import './util/environment';

import { Connection } from 'typeorm';

import app from './app';
import { db } from './util/database';

const anounceOpenPort = (port: number | string) => () =>
    console.log(`Listening on port ${port}`);
const appPort = process.env.PORT || 3000;

db()
    .then((connection: Connection) => {
        console.log('Connected! ');
        app.listen(appPort, anounceOpenPort(appPort));
    })
    .catch(err => console.log('CONNECTION ERROR: ', err));
