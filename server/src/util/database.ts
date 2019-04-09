import {
    createConnection,
    getConnectionOptions,
    ConnectionOptions,
} from 'typeorm';

// import { UserEntity } from '../entities';

export const db = ({ synchronize = false, logging = true, dropSchema = false } = {}) =>
    getConnectionOptions().then((options: ConnectionOptions) =>
        createConnection({
            ...options,
            // entities: [UserEntity],
            // subscribers: [],
            // migrations: [],
            dropSchema,
            synchronize,
            logging
        })
    );
