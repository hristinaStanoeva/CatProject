import {
    createConnection,
    getConnectionOptions,
    ConnectionOptions,
} from 'typeorm';

import { User } from '../entities/User.entity';

export const db = ({ synchronize = false, logging = true } = {}) =>
    getConnectionOptions().then((options: ConnectionOptions) =>
        createConnection({
            ...options,
            entities: [User],
            subscribers: [],
            migrations: [],
            synchronize,
            logging
        })
    );
