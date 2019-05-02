import { curry } from 'ramda';

import { HttpError } from '../models';

const createErrorObject = curry((code: number, message: string): HttpError => ({
    code,
    message,
}));

export const createBadRequestError = createErrorObject(400);
