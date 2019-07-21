import { isNil, any, anyPass, __ } from 'ramda';

import { User } from './user';
import { ListItem } from './list-item';

import {
    isEmptyString,
    isIdInvalid,
    hasDuplicateElements,
} from '../../util/common';

const listIdsAreInvalid = anyPass([
    isNil,
    hasDuplicateElements,
    any(isIdInvalid),
]);

export const createList = ({
    id,
    title,
    authorId,
    itemIds = [],
}: List): List => {
    if (isIdInvalid(id)) {
        throw new Error('Core -> List: Id has to be a positive number');
    }

    if (isEmptyString(title)) {
        throw new Error('Core -> List: Title has to be non-empty string');
    }

    if (isIdInvalid(authorId)) {
        throw new Error('Core -> List: Author id has to be a positive number');
    }

    if (listIdsAreInvalid(itemIds)) {
        throw new Error(
            'Core -> List: Item ids has to be a list of unique positive numbers'
        );
    }

    return { id, title, authorId, itemIds };
};

export interface List {
    id: number;
    title: string;
    authorId: User['id'];
    itemIds?: Array<ListItem['id']>;
}
