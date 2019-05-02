import { curry } from 'ramda';

const createErrorObject = curry((code: number, message: string) => ({
    code,
    message,
}));

export const createBadRequestError = createErrorObject(400);
