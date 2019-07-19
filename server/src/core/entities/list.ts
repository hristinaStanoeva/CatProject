import { either, complement, lte, anyPass, __ } from 'ramda';
import { User } from './user';

import { hasNoValue, isString } from '../../util/common';

const isEmptyString = either(hasNoValue, complement(isString));
const idIsInvalid = anyPass([hasNoValue, lte(__, 0)]);

export const createList = ({
    id,
    title = '',
    authorId = null,
    itemIds = [],
}: List): List => {
    if (idIsInvalid(id)) {
        throw new Error('List id has to be a positive number');
    }

    if (isEmptyString(title)) {
        throw new Error('List title has to be non empty string');
    }

    if (idIsInvalid(authorId)) {
        throw new Error('A list has to have a positive author id');
    }

    return { id, title, authorId, itemIds };
};

export interface List {
    id: number;
    title: string;
    authorId: User['id'];
    itemIds?: any[];
}
