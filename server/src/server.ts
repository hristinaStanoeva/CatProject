import 'reflect-metadata';
import './util/environment';

import { Connection } from 'typeorm';
// import { validate } from 'class-validator';

import app from './app';
import { db } from './util/database';
// import { getUserRepository, UserEntity } from './entities';
// import { getListRepository, ListEntity } from './entities';
// import { getListItemRepository, ListItemEntity } from './entities';

const anounceOpenPort = (port: number | string) => () =>
    console.log(`Listening on port ${port}`);
const appPort = process.env.PORT || 3000;

// Unlike sequelize's sync, typeorm synchronize syncs the columns, but does not drop the table
db({ synchronize: false, dropSchema: false })
    .then(async (connection: Connection) => {
        console.log('Connected!');
        // const user = await getUserRepository().findOne({
        //     email: 'kot@mail.com',
        // });
        // const list = await getListRepository().findOne({
        //     title: 'Other other list',
        // });
        // const listItem = new ListItemEntity();
        // listItem.content = 'Pls pls Pls do me as well';
        // listItem.author = user;
        // listItem.list = list;
        // await getListItemRepository().save(listItem);
        // const list = await getListRepository().findOne({ id: 5 });
        // const listItem = new ListItemEntity();
        // listItem.content = 'some todo';
        // listItem.list = list;
        // await getListItemRepository().save(listItem);
        // await getListRepository().delete({ id: 5 });
        // const list = await getListRepository().findOne();
        // await getListRepository().delete({ id: list.id });
        // await getListRepository().save({ title: 'Sample list' });
        // await getUserRepository().save({ email: 'kot@mail.com', password: '1234567890' });
        // const user = await getUserRepository().findOne({ email: 'kotkot@mail.com' });
        // await getUserRepository().delete({ email: user.email });
        // const list = new ListEntity();
        // list.title = 'Other other list';
        // list.author = user;
        // await getListRepository().save(list);
        // const userWithLists = await getUserRepository().find({
        //     where: { email: 'kot@mail.com' },
        //     relations: ['lists'],
        // });
        // console.log(userWithLists[0].lists.map(l => l.title));
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
