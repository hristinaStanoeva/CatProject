import { makeCoreError } from './domain-error-creator';
import { List } from './list';
import { User } from './user';
import { hasNoValue, isEmptyString, isIdInvalid } from '../../util/common';
import {
    invalidIdErrorMessage,
    invalidContentErrorMessage,
    invalidCheckedErrorMessage,
    invalidListIdErrorMessage,
    invalidAuthorIdErrorMessage,
} from '../errors.constants';

const makeListItemErrorMessage = makeCoreError('List item');

export const createListItem = ({
    id,
    content,
    checked = false,
    listId,
    authorId,
}: ListItem): ListItem => {
    if (isIdInvalid(id)) {
        throw new Error(makeListItemErrorMessage(invalidIdErrorMessage));
    }

    if (isEmptyString(content)) {
        throw new Error(makeListItemErrorMessage(invalidContentErrorMessage));
    }

    if (hasNoValue(checked)) {
        throw new Error(makeListItemErrorMessage(invalidCheckedErrorMessage));
    }

    if (isIdInvalid(listId)) {
        throw new Error(makeListItemErrorMessage(invalidListIdErrorMessage));
    }

    if (isIdInvalid(authorId)) {
        throw new Error(makeListItemErrorMessage(invalidAuthorIdErrorMessage));
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
