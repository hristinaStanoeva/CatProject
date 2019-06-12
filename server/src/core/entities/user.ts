import { isEmailInvalid, isPasswordInvalid } from '../../util/middleware.utils';

export const createUser = ({
    email = '',
    password = '',
    imageUrl = null,
    lists = [],
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

    return { email, password, imageUrl, lists, listItems };
};

export interface User {
    email: string;
    password: string;
    imageUrl?: string;
    lists?: any[];
    listItems?: any[];
}
