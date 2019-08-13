import { ChangeEmailAdapter } from '../../data-access.model';
import { MakeUser, User } from '../../../entities/user';
import { isEmailInvalid } from '../../../../util/middleware.utils';
import { makeCoreError, invalidEmailErrorMessage } from '../../../errors.utils';

const makeUseCaseErrorMessage = makeCoreError('Change email');

// checks for unique email should be done in the data access layer
export const makeChangeEmail = (userCreator: MakeUser) => (
    db: ChangeEmailAdapter
) => (newEmail: User['email'], user: User): Promise<User> => {
    if (isEmailInvalid(newEmail)) {
        throw new Error(makeUseCaseErrorMessage(invalidEmailErrorMessage));
    }

    return db
        .changeEmail(newEmail, user)
        .then(u => userCreator({ ...u, email: newEmail }));
};
