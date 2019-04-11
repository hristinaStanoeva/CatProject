import 'reflect-metadata';
import './util/environment';

import { Connection } from 'typeorm';

import app from './app';
import { db } from './util/database';
// import { getUserRepository } from './entities';

const anounceOpenPort = (port: number | string) => () =>
    console.log(`Listening on port ${port}`);
const appPort = process.env.PORT || 3000;

// Unlike sequelize's sync, typeorm synchronize syncs the columns, but does not drop the table
db({ synchronize: false, dropSchema: false })
    .then(async (connection: Connection) => {
        console.log('Connected! ');
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
