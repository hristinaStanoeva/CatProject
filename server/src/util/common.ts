import {
    all,
    anyPass,
    curry,
    isEmpty,
    isNil,
    either,
    any,
    is,
    complement,
    converge,
    pipe,
    length,
    both,
    gt,
    gte,
    lte,
    equals,
    min,
    max,
    __,
    uniq,
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
export const isNumber = both(is(Number), complement(Number.isNaN));
export const anyHasNoValue = any(hasNoValue);
export const isEmptyString: (value: string) => boolean = either(
    hasNoValue,
    complement(isString)
);
export const idIsInvalid = anyPass([
    complement(isNumber),
    hasNoValue,
    lte(__, 0),
]);

const getUniquesLength = pipe(
    uniq,
    length
);
export const arrayHasOnlyUniques = converge(equals, [getUniquesLength, length]);
export const arrayHasDuplicates = complement(arrayHasOnlyUniques);

export const arrayHasOnlyPositiveValues = all(gt(__, 0));
export const arrayHasNonPositiveValues = complement(arrayHasOnlyPositiveValues);

export const isLengthBetween = (limit1: number, limit2: number) =>
    pipe(
        length,
        both(gte(__, min(limit1, limit2)), lte(__, max(limit1, limit2)))
    );
