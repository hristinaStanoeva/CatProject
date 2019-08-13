import { GetUserByEmailAdapter } from '../data-access.model';
import { User, MakeUser } from '../../entities/user';
import { isEmailInvalid } from '../../../util/middleware.utils';
import { makeCoreError, invalidEmailErrorMessage } from '../../errors.utils';

const makeUseCaseErrorMessage = makeCoreError('Get user by email');

// This should be called only if a user is found.
// The case for not found user(or any other entity) should be handled by the data access layer.
export const makeGetUserByEmail = (userCreator: MakeUser) => (
    db: GetUserByEmailAdapter
) => (email: User['email']): Promise<User> => {
    if (isEmailInvalid(email)) {
        throw new Error(makeUseCaseErrorMessage(invalidEmailErrorMessage));
    }

    return db.getUserByEmail(email).then(userCreator);
};
