import { List } from './list';
import { ListItem } from './list-item';

import { isEmailInvalid, isPasswordInvalid } from '../../util/middleware.utils';
import {
    isIdInvalid,
    isUrlInvalidOrNotNull,
    listIdsAreInvalid,
} from '../../util/common';
import { Contains } from '../../models';

import {
    makeCoreError,
    invalidIdErrorMessage,
    invalidEmailErrorMessage,
    invalidPasswordErrorMessage,
    invalidImageUrlErrorMessage,
    invalidListIdsErrorMessage,
    invalidListItemIdsErrorMessage,
} from '../errors.utils';

const makeUserErrorMessage = makeCoreError('User');

// A user can be created without list and list items
// A list cannot be created without author, but can be created without list items
// A list item cannot be created without list and author
//
// Ids are not used in the context of db entities, but as a "component" for expressing dependencies between entities - this creates acyclic dependencies
export const makeUser: MakeUser = ({
    id,
    email,
    password,
    imageUrl = null,
    listIds = [],
    listItemIds = [],
}) => {
    // think about either monad instead of throwing exceptions
    if (isIdInvalid(id)) {
        throw new Error(makeUserErrorMessage(invalidIdErrorMessage));
    }

    if (isEmailInvalid(email)) {
        throw new Error(makeUserErrorMessage(invalidEmailErrorMessage));
    }

    if (isPasswordInvalid(password)) {
        throw new Error(makeUserErrorMessage(invalidPasswordErrorMessage));
    }

    if (isUrlInvalidOrNotNull(imageUrl)) {
        throw new Error(makeUserErrorMessage(invalidImageUrlErrorMessage));
    }

    if (listIdsAreInvalid(listIds)) {
        throw new Error(makeUserErrorMessage(invalidListIdsErrorMessage));
    }

    if (listIdsAreInvalid(listItemIds)) {
        throw new Error(makeUserErrorMessage(invalidListItemIdsErrorMessage));
    }

    return { id, email, password, imageUrl, listIds, listItemIds };
};

export interface User {
    id: number;
    email: string;
    password: string;
    imageUrl?: string;
    listIds?: Array<List['id']>;
    listItemIds?: Array<ListItem['id']>;
}

export type MakeUser = (u: Contains<User>) => User;
