import { makeDomainErrorMessage } from '../util/common';

export const makeCoreError = makeDomainErrorMessage('Core');

export const invalidIdErrorMessage = 'Id has to be a positive number';

export const invalidEmailErrorMessage =
    'Email has to be a string in the form "name@domain.tld"';

export const invalidPasswordErrorMessage =
    'Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols';

export const invalidImageUrlErrorMessage =
    'Image url has to be a string containing valid url';

export const invalidListIdsErrorMessage =
    'List ids has to be a list of unique positive numbers';

export const invalidListItemIdsErrorMessage =
    'List item ids has to be a list of unique positive numbers';

export const invalidTitleErrorMessage = 'Title has to be non-empty string';

export const invalidAuthorIdErrorMessage =
    'Author id has to be a positive number';

export const invalidItemIdsErrorMessage =
    'Item ids has to be a list of unique positive numbers';

export const invalidContentErrorMessage =
    'Content has to be a non-empty string';

export const invalidCheckedErrorMessage = 'Checked has to be true or false';

export const invalidListIdErrorMessage = 'List id has to be a positive number';
