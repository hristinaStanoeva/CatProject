import dotenv from 'dotenv';
import { envFile } from './util/path';

// environment variables are set before any other imports in order for them to be applied properly
dotenv.config({ path: envFile });

import app from './app';
import { db } from './util/database';
import { ListInstance, UserInstance } from './schemas';

const anounceOpenPort = (port: number | string) => () =>
    console.log(`Listening on port ${port}`);
const appPort = process.env.PORT || 3000;
let userInstance: UserInstance;
// let listInstance: ListInstance;
db.sequelize
    // .authenticate()
    .sync({ force: true })
    .then(() =>
        db.User.create({
            email: 'kote1@mail.com',
            password: '12345678',
        })
    )
    .then(user => {
        userInstance = user;
        return user.createList({
            title: 'test list',
        });
    })
    .then(async (list) => {
        const li = db.ListItem.build({
            content: 'todo',
            checked: false
        });
        await li.setAuthor(userInstance, { save: false });
        await li.setList(list, { save: false });
        return li.save();
    })
    .then(res => {
        console.log('Connected!');
        app.listen(appPort, anounceOpenPort(appPort));
    })
    .catch(err => console.log('ERROR: ', err));
