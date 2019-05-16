import {
    curry,
    isEmpty,
    isNil,
    either,
    any,
    is,
    complement,
    pipe,
    length,
    both,
    gte,
    lte,
    min,
    max,
    __,
} from 'ramda';

import { HttpError } from '../models';

const createErrorObject = curry(
    (code: number, message: string): HttpError => ({
        code,
        message,
    })
);

export const createBadRequestError = createErrorObject(400);
export const isString = is(String);
export const hasNoValue = either(isEmpty, isNil);
export const hasValue = complement(hasNoValue);
export const anyHasNoValue = (values: any[]) => any(hasNoValue, values);

export const isLengthBetween = (limit1: number, limit2: number) =>
    pipe(
        length,
        both(gte(__, min(limit1, limit2)), lte(__, max(limit1, limit2)))
    );
