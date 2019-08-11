import { GetUserByEmailAdapter } from '../data-access.model';
import { User, MakeUser } from '../../entities/user';
import { isEmailInvalid } from '../../../util/middleware.utils';

// This should be called only if a user is found.
// The case for not found user(or any other entity) should be handled by the data access layer.
export const makeGetUserByEmail = (userCreator: MakeUser) => (
    db: GetUserByEmailAdapter
) => (email: string): Promise<User> => {
    if (isEmailInvalid(email)) {
        throw new Error(
            'Core -> Get user by email: Email has to be in the form "name@domain.tld"'
        );
    }

    return db.getUserByEmail(email).then(userCreator);
};
