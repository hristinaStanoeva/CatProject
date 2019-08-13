import { GetUserByIdAdapter } from '../data-access.model';
import { User, MakeUser } from '../../entities/user';
import { isIdInvalid } from '../../../util/common';
import { makeCoreError, invalidIdErrorMessage } from '../../errors.utils';

const makeUseCaseErrorMessage = makeCoreError('Get user by id');

export const makeGetUserById = (userCreator: MakeUser) => (
    db: GetUserByIdAdapter
) => (id: User['id']): Promise<User> => {
    if (isIdInvalid(id)) {
        throw new Error(makeUseCaseErrorMessage(invalidIdErrorMessage));
    }

    return db.getUserById(id).then(userCreator);
};
