import {
    EventSubscriber,
    EntitySubscriberInterface,
    InsertEvent,
} from 'typeorm';
import { hash } from 'bcrypt';

import { UserEntity } from '../entities';
import { ServerError } from '../util/errors';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
    public listenTo() {
        return UserEntity;
    }

    public async beforeInsert(event: InsertEvent<UserEntity>) {
        try {
            event.entity.password = await hash(event.entity.password, 12);
        } catch (e) {
            throw new ServerError(e);
        }
    }
}
