import { isNil, anyPass, __ } from 'ramda';
import { List } from './list';
import { isEmailInvalid, isPasswordInvalid } from '../../util/middleware.utils';
import {
    isIdInvalid,
    hasDuplicateElements,
    hasNonPositiveElements,
} from '../../util/common';

// think about reusing isIdInvalid
const listIdsAreInvalid = anyPass([
    isNil,
    hasDuplicateElements,
    hasNonPositiveElements,
]);

// A user can be created without list and list items
// A list cannot be created without author, but can be created without list items
// A list item cannot be created without list and author
//
// Ids are not used in the context of db entities, but as a "component" for expressing dependencies between entities - this creates acyclic dependencies
export const createUser = ({
    id,
    email,
    password,
    imageUrl = null,
    listIds = [],
    listItemIds = [],
}: User): User => {
    // think about either monad instead of throwing exceptions
    if (isIdInvalid(id)) {
        throw new Error('Core -> User: Id has to be a positive number');
    }
    if (isEmailInvalid(email)) {
        throw new Error(
            'Core -> User: Email has to be a string in the form "name@domain.tld"'
        );
    }

    if (isPasswordInvalid(password)) {
        throw new Error(
            'Core -> User: Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
        );
    }

    if (listIdsAreInvalid(listIds)) {
        throw new Error(
            'Core -> User: List ids has to be a list of unique positive numbers'
        );
    }

    return { id, email, password, imageUrl, listIds, listItemIds };
};

export interface User {
    id: number;
    email: string;
    password: string;
    imageUrl?: string;
    listIds?: Array<List['id']>;
    listItemIds?: any[];
}
