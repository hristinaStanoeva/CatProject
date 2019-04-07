import 'reflect-metadata';
import './util/environment';

import { createConnection, Connection } from 'typeorm';

import app from './app';
// import { db } from './util/database';

const anounceOpenPort = (port: number | string) => () =>
    console.log(`Listening on port ${port}`);
const appPort = process.env.PORT || 3000;
createConnection()
    .then((connection: Connection) => {
        console.log('Connected! ');
        app.listen(appPort, anounceOpenPort(appPort));
    })
    .catch(err => console.log('CONNECTION ERROR: ', err));
// let userInstance: UserInstance;
// let listInstance: ListInstance;
// db.sequelize
//     // .authenticate()
//     .sync(/* { force: true } */)
//     // .then(() =>
//     //     db.User.create({
//     //         email: 'kote1@mail.com',
//     //         password: '12345678',
//     //     })
//     // )
//     // .then(user => {
//     //     userInstance = user;
//     //     return user.createList({
//     //         title: 'test list',
//     //     });
//     // })
//     // .then(async list => {
//     //     const li = db.ListItem.build({
//     //         content: 'todo',
//     //         checked: false,
//     //     });
//     //     await li.setAuthor(userInstance, { save: false });
//     //     await li.setList(list, { save: false });
//     //     return li.save();
//     // })
//     // .then(() => userInstance.isPasswordValid('12345678'))
//     .then(res => {
//         // console.log(res);
//         console.log('Connected!');
//         app.listen(appPort, anounceOpenPort(appPort));
//     })
//     .catch(err => console.log('ERROR: ', err));
