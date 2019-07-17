import { either, complement } from 'ramda';
import { User } from './user';

import { hasNoValue, isString } from '../../util/common';

const isNotNonEmptyString = either(hasNoValue, complement(isString));

export const createList = ({
    id,
    title = '',
    author = null,
    items = [],
}: List): List => {
    if (isNotNonEmptyString(title)) {
        throw new Error('List title has to be non empty string');
    }

    if (hasNoValue(author)) {
        throw new Error('Invalid author');
    }

    return { id, title, author, items };
};

export interface List {
    id: number;
    title: string;
    author: Pick<User, 'id'>;
    items?: any[];
}
