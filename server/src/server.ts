import 'reflect-metadata';
import './util/environment';

import { Connection } from 'typeorm';
// import { validate } from 'class-validator';

import app from './app';
import { db } from './util/database';
import { getUserRepository } from './entities';
import { getListRepository, ListEntity } from './entities';

const anounceOpenPort = (port: number | string) => () =>
    console.log(`Listening on port ${port}`);
const appPort = process.env.PORT || 3000;

// Unlike sequelize's sync, typeorm synchronize syncs the columns, but does not drop the table
db({ synchronize: true, dropSchema: false })
    .then(async (connection: Connection) => {
        console.log('Connected!');
        // await getListRepository().save({ title: 'Sample list' });
        // await getUserRepository().save({ email: 'kot@mail.com', password: '1234567890' });
        const user = await getUserRepository().findOne();
        const list = new ListEntity();
        list.title = 'Other list';
        list.author = user;
        await getListRepository().save(list);
        // user.lists = [list];
        // await getUserRepository().update(user.id, user);
        // const user = await getUserRepository().findOne({ email: 'pisanka@mail.com', password: '123' });
        // console.log(user);
        // validate({}).then(console.log);
        // await getUserRepository().delete(3);
        // await getUserRepository()
        //     .createQueryBuilder('user')
        //     .getManyAndCount();
        // await getUserRepository().save({
        //     email: 'pisanka@mail.com',
        //     password: 'miau miau'
        // });
        // await getUserRepository().createQueryBuilder('user').getManyAndCount();
        //
        // await getUserRepository().delete({ email: 'pisanka@mail.com' });
        //
        // await getUserRepository().createQueryBuilder('user').getManyAndCount();
        // const user = getUserRepository().create({
        //     email: 'kotat@mail.com',
        //     password: '1234567890',
        // });
        // await getUserRepository().save(user);
        // await getUserRepository().update(
        //     { email: 'kotat@mail.com' }, // or id, e.g. update(1, { field_to_update: 'value' })
        //     { password: '112233445566miau' }
        // );
        // const user = await getUserRepository()
        //     .createQueryBuilder('user')
        //     .where('user.email = :email', { email: 'kotat@mail.com' })
        //     .getOne();
        // console.log(user);
        // await getUserRepository().update(user.id, { email: 'kotkot@mail.com' });
        app.listen(appPort, anounceOpenPort(appPort));
    })
    .catch(err => console.log('CONNECTION ERROR: ', err));
