import 'reflect-metadata';
import './util/environment';

import { Connection } from 'typeorm';

import app from './app';
import { db } from './util/database';
import { getUserRepository } from './entities';

const anounceOpenPort = (port: number | string) => () =>
    console.log(`Listening on port ${port}`);
const appPort = process.env.PORT || 3000;

db({ synchronize: true })
    .then(async (connection: Connection) => {
        console.log('Connected! ');
        const user = getUserRepository().create({
            email: 'koot@mail.com',
            password: '1234567890',
        });
        await getUserRepository().save(user);
        // const user = await getUserRepository().findOne({ email: 'kote112@mail.com' });
        // await getUserRepository().update(user.id, { email: 'kotkot@mail.com' });
        app.listen(appPort, anounceOpenPort(appPort));
    })
    .catch(err => console.log('CONNECTION ERROR: ', err));
