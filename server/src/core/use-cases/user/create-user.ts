import { CreateUserAdapter } from '../data-access.model';
import { MakeUser, User } from '../../entities/user';
import { Contains } from '../../../models';

export const makeCreateUser = (userCreator: MakeUser) => (
    db: CreateUserAdapter
) => (user: Contains<User>): Promise<User> => db.createUser(userCreator(user));
