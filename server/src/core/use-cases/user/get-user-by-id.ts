import { GetUserByIdAdapter } from '../data-access.model';
import { User, MakeUser } from '../../entities/user';
import { isIdInvalid } from '../../../util/common';

export const makeGetUserById = (userCreator: MakeUser) => (
    db: GetUserByIdAdapter
) => (id: User['id']): Promise<User> => {
    if (isIdInvalid(id)) {
        throw new Error(
            'Core -> Get user by id: Id has to be a positive number'
        );
    }

    return db.getUserById(id).then(userCreator);
};
