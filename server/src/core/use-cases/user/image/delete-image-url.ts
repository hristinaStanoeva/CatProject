import { DeleteImageUrlAdapter } from '../../data-access.model';
import { MakeUser, User } from '../../../entities/user';

export const makeDeleteImageUrl = (userCreator: MakeUser) => (
    db: DeleteImageUrlAdapter
) => (user: User): Promise<User> => db.deleteImageUrl(user).then(userCreator);
