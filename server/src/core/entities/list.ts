import { isNil, any, anyPass, __ } from 'ramda';

import { User } from './user';
import { ListItem } from './list-item';

import {
    isEmptyString,
    isIdInvalid,
    hasDuplicateElements,
} from '../../util/common';
import {
    makeCoreError,
    invalidTitleErrorMessage,
    invalidAuthorIdErrorMessage,
    invalidItemIdsErrorMessage,
    invalidIdErrorMessage,
} from '../errors.utils';

const listIdsAreInvalid = anyPass([
    isNil,
    hasDuplicateElements,
    any(isIdInvalid),
]);

const makeListErrorMessage = makeCoreError('List');

export const createList = ({
    id,
    title,
    authorId,
    itemIds = [],
}: List): List => {
    if (isIdInvalid(id)) {
        throw new Error(makeListErrorMessage(invalidIdErrorMessage));
    }

    if (isEmptyString(title)) {
        throw new Error(makeListErrorMessage(invalidTitleErrorMessage));
    }

    if (isIdInvalid(authorId)) {
        throw new Error(makeListErrorMessage(invalidAuthorIdErrorMessage));
    }

    if (listIdsAreInvalid(itemIds)) {
        throw new Error(makeListErrorMessage(invalidItemIdsErrorMessage));
    }

    return { id, title, authorId, itemIds };
};

export interface List {
    id: number;
    title: string;
    authorId: User['id'];
    itemIds?: Array<ListItem['id']>;
}
