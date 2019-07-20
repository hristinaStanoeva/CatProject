import { toString } from 'ramda';

import {
    isString,
    isNumber,
    hasValue,
    hasNoValue,
    isEmptyString,
    isIdInvalid,
    isIdValid,
    anyHasNoValue,
    hasOnlyUniqueElements,
    hasDuplicateElements,
    hasOnlyPositiveElements,
    hasNonPositiveElements,
} from '../../src/util/common';

import { isEmailValid, isEmailInvalid } from '../../src/util/middleware.utils';

describe('utils', () => {
    describe('isString', () => {
        it('should return true when string is supplied', () => {
            expect(isString('some string')).toBe(true);
        });

        it('should return true when empty string is supplied', () => {
            expect(isString('')).toBe(true);
        });

        // tslint:disable-next-line:no-empty
        [undefined, null, {}, [], () => {}, 123].forEach(t => {
            it(`should return false when ${toString(t)} is provided`, () => {
                expect(isString(t)).toBe(false);
            });
        });
    });

    describe('isNumber', () => {
        it('should return true when positive number is provided', () => {
            expect(isNumber(123)).toBe(true);
        });

        it('should return true when negative number is provided', () => {
            expect(isNumber(-123)).toBe(true);
        });

        it('should return true when 0 is provided', () => {
            expect(isNumber(0)).toBe(true);
        });

        it('should return false when NaN is provided', () => {
            expect(isNumber(NaN)).toBe(false);
        });

        // tslint:disable-next-line:no-empty
        [undefined, null, {}, [], () => {}, '123', ''].forEach(t => {
            it(`should return false when ${toString(t)} is provided`, () => {
                expect(isNumber(t)).toBe(false);
            });
        });
    });

    describe('hasNoValue and hasValue', () => {
        [{}, undefined, null, '', []].forEach(t => {
            it(`hasValue should return false and hasNoValue should return true when ${toString(
                t
            )} is provided`, () => {
                expect(hasValue(t)).toBe(false);
                expect(hasNoValue(t)).toBe(true);
            });
        });
        [
            true,
            false,
            { email: 'test@mail.com' },
            'test@mail.com',
            { email: 'test@mail.com', password: '1234567890' },
        ].forEach(t => {
            it(`hasValue should return true and hasNoValue should return false when ${toString(
                t
            )}`, () => {
                expect(hasValue(t)).toBe(true);
                expect(hasNoValue(t)).toBe(false);
            });
        });
    });

    describe('anyHasNoValue', () => {
        [
            {},
            {
                f: 'invalid',
            },
            {
                s: '123',
            },
            {
                f: [],
                s: {},
            },
            {
                f: [],
                s: [],
            },
            {
                f: [],
            },
            {
                s: [],
            },
            {
                f: null,
                s: '123456',
            },
            {
                f: '',
                s: '12345',
            },
        ].forEach(({ f, s }) => {
            it(`2 values: should return true when first value is ${toString(
                f
            )} and second value is ${toString(s)}`, () => {
                expect(anyHasNoValue([f, s])).toBe(true);
            });
        });

        it('5 values: should return true if some values are not present', () => {
            expect(
                anyHasNoValue([
                    '',
                    false,
                    'test',
                    1234,
                    { email: 'test@mail.com' },
                ])
            ).toBe(true);
        });

        [
            {
                f: 'test@mail.com',
                s: '123',
            },
            {
                f: true,
                s: false,
            },
            {
                f: { email: 'test@mail.com' },
                s: 123,
            },
        ].forEach(({ f, s }) => {
            it(`2 values: should return false when first value is ${toString(
                f
            )} and second value is ${toString(s)}`, () => {
                expect(anyHasNoValue([f, s])).toBe(false);
            });
        });

        it('5 values: should return false if all values are present', () => {
            expect(
                anyHasNoValue([
                    true,
                    false,
                    'test',
                    1234,
                    { email: 'test@mail.com' },
                ])
            ).toBe(false);
        });
    });

    describe('isEmptyString', () => {
        it('should return false if string is not empty', () => {
            expect(isEmptyString('some string')).toBe(false);
        });

        it('should return true if string is empty', () => {
            expect(isEmptyString('')).toBe(true);
        });

        it('should return true if input is null or undefined', () => {
            expect(isEmptyString(null)).toBe(true);
            expect(isEmptyString(undefined)).toBe(true);
        });
    });

    describe('isIdValid', () => {
        it('should return false if id is null or undefined', () => {
            expect(isIdValid(null)).toBe(false);
            expect(isIdValid(undefined)).toBe(false);
        });

        it('should return false if id is string', () => {
            expect(isIdValid('some string')).toBe(false);
        });

        it('should return false if id is boolean', () => {
            expect(isIdValid(true)).toBe(false);
            expect(isIdValid(false)).toBe(false);
        });

        it('should return false if id is array', () => {
            expect(isIdValid([])).toBe(false);
            expect(isIdValid([1, 2])).toBe(false);
        });

        it('should return false if id is an object', () => {
            expect(isIdValid({})).toBe(false);
            expect(
                isIdValid({
                    foo: 'bar',
                })
            ).toBe(false);
        });

        it('should return false if id is 0', () => {
            expect(isIdValid(0)).toBe(false);
        });

        it('should return false if id is negative number', () => {
            expect(isIdValid(-2)).toBe(false);
        });

        it('should return true if id is positive number', () => {
            expect(isIdValid(1)).toBe(true);
        });
    });

    describe('isIdInvalid', () => {
        it('should return true if id is null or undefined', () => {
            expect(isIdInvalid(null)).toBe(true);
            expect(isIdInvalid(undefined)).toBe(true);
        });

        it('should return true if id is string', () => {
            expect(isIdInvalid('some string')).toBe(true);
        });

        it('should return true if id is boolean', () => {
            expect(isIdInvalid(true)).toBe(true);
            expect(isIdInvalid(false)).toBe(true);
        });

        it('should return true if id is array', () => {
            expect(isIdInvalid([])).toBe(true);
            expect(isIdInvalid([1, 2])).toBe(true);
        });

        it('should return true if id is an object', () => {
            expect(isIdInvalid({})).toBe(true);
            expect(
                isIdInvalid({
                    foo: 'bar',
                })
            ).toBe(true);
        });

        it('should return true if id is 0', () => {
            expect(isIdInvalid(0)).toBe(true);
        });

        it('should return true if id is negative number', () => {
            expect(isIdInvalid(-2)).toBe(true);
        });

        it('should return false if id is positive number', () => {
            expect(isIdInvalid(1)).toBe(false);
        });
    });

    describe('hasOnlyUniqueElements', () => {
        it('should return false if array has duplicate number values', () => {
            expect(hasOnlyUniqueElements([1, 1, 2, 3])).toBe(false);
        });

        it('should return true if array has no duplicate number values', () => {
            expect(hasOnlyUniqueElements([1, 2, 3])).toBe(true);
        });

        it('should return false if array has duplicate string values', () => {
            expect(hasOnlyUniqueElements(['a', 'a', 'b', 'c'])).toBe(false);
        });

        it('should return true if array has no duplicate string values', () => {
            expect(hasOnlyUniqueElements(['a', 'b', 'c'])).toBe(true);
        });

        it('should return false if array has duplicate boolean values', () => {
            expect(hasOnlyUniqueElements([true, true, false])).toBe(false);
        });

        it('should return true if array has no duplicate boolean values', () => {
            expect(hasOnlyUniqueElements([true, false])).toBe(true);
        });
    });

    describe('hasDuplicateElements', () => {
        it('should return true if array has duplicate number values', () => {
            expect(hasDuplicateElements([1, 1, 2, 3])).toBe(true);
        });

        it('should return false if array has no duplicate number values', () => {
            expect(hasDuplicateElements([1, 2, 3])).toBe(false);
        });

        it('should return true if array has duplicate string values', () => {
            expect(hasDuplicateElements(['a', 'a', 'b', 'c'])).toBe(true);
        });

        it('should return false if array has no duplicate string values', () => {
            expect(hasDuplicateElements(['a', 'b', 'c'])).toBe(false);
        });

        it('should return true if array has duplicate boolean values', () => {
            expect(hasDuplicateElements([true, true, false])).toBe(true);
        });

        it('should return false if array has no duplicate boolean values', () => {
            expect(hasDuplicateElements([true, false])).toBe(false);
        });
    });

    describe('hasOnlyPositiveElements', () => {
        it('should return false if array has negative numbers', () => {
            expect(hasOnlyPositiveElements([1, -2])).toBe(false);
        });

        it('should return true if array is empty', () => {
            expect(hasOnlyPositiveElements([])).toBe(true);
        });

        it('should return true if array contains only positive numbers', () => {
            expect(hasOnlyPositiveElements([1, 2, 3])).toBe(true);
        });
    });

    describe('hasNonPositiveElements', () => {
        it('should return true if array contains negative value', () => {
            expect(hasNonPositiveElements([1, -2, 3])).toBe(true);
        });

        it('should return false if array is empty', () => {
            expect(hasNonPositiveElements([])).toBe(false);
        });
        it('should return false if array has only positive numbers', () => {
            expect(hasNonPositiveElements([1, 2, 3])).toBe(false);
        });
    });

    describe('isEmailValid and isEmailInvalid', () => {
        [
            'mail@test.com',
            'test_mail@gmail.com',
            '  some@mail.com',
            'SomE@mail.cOm',
        ].forEach(v => {
            it(`isEmailValid should return true and isEmailInvalid should return false when ${toString(
                v
            )} is provided`, () => {
                expect(isEmailValid(v)).toBe(true);
                expect(isEmailInvalid(v)).toBe(false);
            });
        });

        [
            'invalid',
            [],
            {},
            null,
            '',
            't@t.t',
            true,
            false,
            undefined,
            'some_mail@invalid',
            'invalid_email',
        ].forEach(v => {
            it(`isEmailValid should return false and isEmailInvalid should return true when ${toString(
                v
            )} is provided`, () => {
                expect(isEmailValid(v as any)).toBe(false);
                expect(isEmailInvalid(v)).toBe(true);
            });
        });
    });
});
