import { User } from './user';

import { isEmptyString, idIsInvalid } from '../../util/common';

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
