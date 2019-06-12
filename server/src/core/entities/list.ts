import { either, complement } from 'ramda';
import { User } from './user';

import { hasNoValue, isString } from '../../util/common';

const isNotNonEmptyString = either(hasNoValue, complement(isString));

export const createList = ({
    title = '',
    author = null,
    items = [],
}: List): List => {
    // call createUser somewhere to go through all user checks
    if (isNotNonEmptyString(title)) {
        throw new Error('List title has to be non empty string');
    }

    if (hasNoValue(author)) {
        throw new Error('Invalid author');
    }

    return { title, author, items };
};

interface List {
    title: string;
    author: User;
    items?: any[];
}
