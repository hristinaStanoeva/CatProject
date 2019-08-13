import {
    makeCoreError,
    invalidImageUrlErrorMessage,
} from '../../../errors.utils';
import { ChangeImageUrlAdapter } from '../../data-access.model';
import { MakeUser, User } from '../../../entities/user';
import { isUrlInvalid } from '../../../../util/common';

const makeUseCaseErrorMessage = makeCoreError('Change image url');

export const makeChangeImageUrl = (userCreator: MakeUser) => (
    db: ChangeImageUrlAdapter
) => (newImageUrl: User['imageUrl'], user: User): Promise<User> => {
    if (isUrlInvalid(newImageUrl)) {
        throw new Error(makeUseCaseErrorMessage(invalidImageUrlErrorMessage));
    }

    return db.changeImageUrl(newImageUrl, user).then(userCreator);
};
