import { User } from './user';
import { ListItem } from './list-item';

import { isEmptyString, isIdInvalid } from '../../util/common';

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
        throw new Error('Core -> List: Title has to be non empty string');
    }

    if (isIdInvalid(authorId)) {
        throw new Error('Core -> List: Author id has to be a positive number');
    }

    // Add checks for list item ids

    return { id, title, authorId, itemIds };
};

export interface List {
    id: number;
    title: string;
    authorId: User['id'];
    itemIds?: Array<ListItem['id']>;
}
