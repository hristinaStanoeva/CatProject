import { MakeUser, User } from '../../../entities/user';
import { ChangePasswordAdapter } from '../../data-access.model';
import { isPasswordInvalid } from '../../../../util/middleware.utils';
import {
    makeCoreError,
    invalidPasswordErrorMessage,
} from '../../../errors.utils';

const makeUseCaseErrorMessage = makeCoreError('Change password');

export const makeChangePassword = (userCreator: MakeUser) => (
    db: ChangePasswordAdapter
) => (newPassword: User['password'], user: User): Promise<User> => {
    if (isPasswordInvalid(newPassword)) {
        throw new Error(makeUseCaseErrorMessage(invalidPasswordErrorMessage));
    }

    return db.changePassword(newPassword, user).then(userCreator);
};
