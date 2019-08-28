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

    return db.assignListIds(ids, user).then(userCreator);
};
