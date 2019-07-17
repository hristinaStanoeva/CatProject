import { List } from './list';
import { isEmailInvalid, isPasswordInvalid } from '../../util/middleware.utils';
import { arrayHasOnlyUniques } from '../../util/common';

export const createUser = ({
    id,
    email = '',
    password = '',
    imageUrl = null,
    listIds = [],
    listItems = [],
}: User): User => {
    // think about either monad instead of throwing exceptions
    if (isEmailInvalid(email)) {
        throw new Error('Invalid email for user');
    }

    if (isPasswordInvalid(password)) {
        throw new Error(
            'Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
        );
    }

    if (!arrayHasOnlyUniques(listIds)) {
        throw new Error('A user cannot have duplicated list ids');
    }

    return { id, email, password, imageUrl, listIds, listItems };
};

export interface User {
    id: number;
    email: string;
    password: string;
    imageUrl?: string;
    listIds?: Array<List['id']>;
    listItems?: any[];
}
