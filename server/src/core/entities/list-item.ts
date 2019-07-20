import { List } from './list';
import { User } from './user';
import { hasNoValue, isEmptyString, isIdInvalid } from '../../util/common';

export const createListItem = ({
    id,
    content,
    checked = false,
    listId,
    authorId,
}: ListItem): ListItem => {
    if (isIdInvalid(id)) {
        throw new Error('Core -> List item: Id has to be a positive number');
    }

    if (isEmptyString(content)) {
        throw new Error(
            'Core -> List item: Content has to be a string with some value'
        );
    }

    if (hasNoValue(checked)) {
        throw new Error('Core -> List item: Checked has to be true or false');
    }

    if (isIdInvalid(listId)) {
        throw new Error(
            'Core -> List item: List id has to be a positive number'
        );
    }

    if (isIdInvalid(authorId)) {
        throw new Error(
            'Core -> List item: Author id has to be a positive number'
        );
    }

    return { id, content, checked, listId, authorId };
};

export interface ListItem {
    id: number;
    content: string;
    checked?: boolean;
    listId: List['id'];
    authorId: User['id'];
}
