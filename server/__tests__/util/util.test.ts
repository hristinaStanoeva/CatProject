import { toString } from 'ramda';

import {
    isString,
    hasValue,
    hasNoValue,
    anyHasNoValue,
} from '../../src/util/common';

import { isEmailValid, isEmailInvalid } from '../../src/util/middleware.utils';

describe('utils', () => {
    describe('isString', () => {
        it('should return true if string is supplied', () => {
            expect(isString('some string')).toBe(true);
        });

        it('should return true if empty string is supplied', () => {
            expect(isString('')).toBe(true);
        });

        // tslint:disable-next-line:no-empty
        [undefined, null, {}, [], () => {}, 123].forEach(t => {
            it(`should return false when ${toString(t)} is provided`, () => {
                expect(isString(t)).toBe(false);
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
