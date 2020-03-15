import { MakeUser, User } from '../../../entities/user';
export const makeUnassignListIds = (userCreator: MakeUser) => (
    db: UnassignListIdsAdapter
) => (ids: User['listIds'], user: User): Promise<User> => {};
