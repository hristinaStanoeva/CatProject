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
    .then(() =>
        db.User.create({
            email: 'kote1@mail.com',
            password: '12345678',
        })
    )
    .then(user =>
        user.createList({
            title: 'test list',
        })
    )
    .then(list =>
        list.createListItem(
            {
                content: 'task 1',
                checked: false,
                author_id: 1
            }, {
                include: [{ model: db.User, as: 'author' }]
            }
        )
    )
    .then(res => {
        // console.log(res);
        console.log('Connected!');
        app.listen(appPort, anounceOpenPort(appPort));
    })
    .catch(err => console.log('ERROR: ', err));
