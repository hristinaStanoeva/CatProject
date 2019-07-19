import { isNil, lte, anyPass, __ } from 'ramda';
import { List } from './list';
import { isEmailInvalid, isPasswordInvalid } from '../../util/middleware.utils';
import {
    hasNoValue,
    arrayHasDuplicates,
    arrayHasNonPositiveValues,
} from '../../util/common';

// think if this should be put somewhere else
const idIsInvalid = anyPass([hasNoValue, lte(__, 0)]);
const listIdsAreInvalid = anyPass([
    isNil,
    arrayHasDuplicates,
    arrayHasNonPositiveValues,
]);

// A user can be created without list and list items
// A list cannot be created without author, but can be created without list items
// A list item cannot be created without list and author
//
// A user maybe does not need validation for lists input(Clean architecture acyclic dependency principle)
// A user maybe needs reference to their lists and list items using ids - this guarantees that a list can exist only in one place and not duplicated.
export const createUser = ({
    id,
    email = '',
    password = '',
    imageUrl = null,
    listIds = [],
    listItems = [],
}: User): User => {
    // think about either monad instead of throwing exceptions
    if (idIsInvalid(id)) {
        throw new Error('User id has to be a positive number');
    }
    if (isEmailInvalid(email)) {
        throw new Error('Invalid email for user');
    }

    if (isPasswordInvalid(password)) {
        throw new Error(
            'Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
        );
    }

    if (listIdsAreInvalid(listIds)) {
        throw new Error('A user has to have list of unique positive list ids');
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