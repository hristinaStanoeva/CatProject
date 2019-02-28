import dotenv from 'dotenv';
import { envFile } from './util/path';

// environment variables are set before any other imports in order for them to be applied properly
dotenv.config({ path: envFile });

import app from './app';
import { db } from './util/database';

const anounceOpenPort = (port: number | string) => () =>
    console.log(`Listening on port ${port}`);
const appPort = process.env.PORT || 3000;

db.sequelize
    // .authenticate()
    .sync({ force: true })
    // .then(() =>
    //     db.ListItem.create({
    //         content: 'do this',
    //         checked: true,
    //     })
    // )
    // .then(() =>
    //     db.User.create({
    //         email: 'kote2@mail.com',
    //         password:
    //             '123456789012345678901234567890123456789012345678901234567890',
    //     })
    // )
    // .then(() =>
    //     db.User.create({
    //         email: 'kote1@mail.com',
    //         password:
    //             '123456789012345678901234567890123456789012345678901234567890',
    //     })
    // )
    // .then(() =>
    //     db.List.create({
    //         title: 'sample list',
    //         created_by: 1
    //     })
    // )
    // .then(() => db.List.findByPk(1))
    // .then(list => list.createAuthor({
    //     email: 'test@mail.com',
    //     password: '123456789012345678901234567890123456789012345678901234567890'
    // }))
    // .then(() =>
    //     db.User.create({
    //         email: 'kote2@mail.com',
    //         password:
    //             '123456789012345678901234567890123456789012345678901234567890',
    //         imageUrl: 'some url here',
    //     })
    // )
    .then(res => {
        console.log('Connected!');
        app.listen(appPort, anounceOpenPort(appPort));
    })
    .catch(err => console.log('ERROR: ', err));
