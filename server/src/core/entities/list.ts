import { either, complement, lte, anyPass, __ } from 'ramda';
import { User } from './user';

import { hasNoValue, isString } from '../../util/common';

const isEmptyString = either(hasNoValue, complement(isString));
const idIsInvalid = anyPass([hasNoValue, lte(__, 0)]);

export const createList = ({
    id,
    title,
    authorId,
    itemIds = [],
}: List): List => {
    if (idIsInvalid(id)) {
        throw new Error('Core -> List: Id has to be a positive number');
    }

    if (isEmptyString(title)) {
        throw new Error('Core -> List: Title has to be non empty string');
    }

    if (idIsInvalid(authorId)) {
        throw new Error('Core -> List: Author id has to be a positive number');
    }

    return { id, title, authorId, itemIds };
};

export interface List {
    id: number;
    title: string;
    authorId: User['id'];
    itemIds?: any[];
}
