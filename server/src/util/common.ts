import {
    all,
    anyPass,
    map,
    curry,
    isEmpty,
    isNil,
    either,
    any,
    is,
    complement,
    converge,
    flatten,
    unless,
    concat,
    join,
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
    unary,
} from 'ramda';
import { isURL } from 'validator';

import { HttpError, Primitive } from '../models';

const createErrorObject = curry(
    (code: number, message: string): HttpError => ({
        code,
        message,
    })
);

export const createBadRequestError = createErrorObject(400);
export const isString = is(String);
const isArray = is(Array);
export const hasNoValue = either(isEmpty, isNil);
export const hasValue = complement(hasNoValue);
export const isNumber = both(is(Number), complement(Number.isNaN));
export const anyHasNoValue = any(hasNoValue);
export const isEmptyString: (x: string) => boolean = either(
    hasNoValue,
    complement(isString)
);
export const isIdInvalid = anyPass([
    complement(isNumber),
    hasNoValue,
    lte(__, 0),
]);
export const isIdValid = complement(isIdInvalid);

const getUniquesLength = pipe(
    uniq,
    length
);
export const hasOnlyUniqueElements: (xs: Primitive[]) => boolean = converge(
    equals,
    [getUniquesLength, length]
);
export const hasDuplicateElements: (xs: Primitive[]) => boolean = complement(
    hasOnlyUniqueElements
);

export const isUrlInvalidOrNotNull: (url: string | null) => boolean = both(
    hasValue,
    complement(unary(isURL))
);

export const hasOnlyPositiveElements = all(gt(__, 0));
export const hasNonPositiveElements = complement(hasOnlyPositiveElements);

export const isLengthBetween = (limit1: number, limit2: number) =>
    pipe(
        length,
        both(gte(__, min(limit1, limit2)), lte(__, max(limit1, limit2)))
    );

const arrayify = unless(isArray, v => [v]);

const makeLocation = pipe(
    map(arrayify),
    flatten,
    join(' -> ')
);

export const makeDomainErrorMessage = (domain: string | string[]) => (
    path: string | string[]
) => pipe(
        concat(': '),
        concat(makeLocation([domain, path]))
    );
