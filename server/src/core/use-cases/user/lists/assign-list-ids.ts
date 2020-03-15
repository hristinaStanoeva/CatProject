import { MakeUser, User } from '../../../entities/user';
import { AssignListIdsAdapter } from '../../data-access.model';
import { listIdsAreInvalid } from '../../../../util/common';
import {
    makeCoreError,
    invalidListIdsErrorMessage,
} from '../../../errors.utils';

const makeUseCaseErrorMessage = makeCoreError('Assign list ids');

export const makeAssignListIds = (userCreator: MakeUser) => (
    db: AssignListIdsAdapter
) => (ids: User['listIds'], user: User): Promise<User> => {
    if (listIdsAreInvalid(ids)) {
        throw new Error(makeUseCaseErrorMessage(invalidListIdsErrorMessage));
    }
    console.log(ids);
    console.log(user.listIds);
    console.log({ ...user, listIds: [...user.listIds, ...ids] });
    console.log(
        db
            // @ts-ignore
            .assignListIds(ids, user, (u: User) =>
                userCreator({ ...u, listIds: ids })
            )
            .then(userCreator)
    );
    return db.assignListIds(ids, user).then(u => userCreator({ ...u }));
};

export const DB = (): AssignListIdsAdapter => {
    return {
        assignListIds: (ids, user, cb) => {
            // ... get user from DB?
            // ... append listIds to user's listIds -> cb(u)
            return Promise.resolve(user);
        },
    };
};
