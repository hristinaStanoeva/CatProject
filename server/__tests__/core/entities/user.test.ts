import { pipe, range, join, repeat } from 'ramda';
import { createUser } from '../../../src/core/entities/user';

const createStringOfLength = pipe(
    repeat('1'),
    join('')
);

describe('core', () => {
    describe('entities', () => {
        describe('createUser', () => {
            it('should throw if id is null or undefined', () => {
                expect(() =>
                    createUser({
                        id: undefined,
                        email: 'test@mail.com',
                        password: '1234567890',
                    })
                ).toThrow('User id has to be a positive number');

                expect(() =>
                    createUser({
                        id: null,
                        email: 'test@mail.com',
                        password: '1234567890',
                    })
                ).toThrow('User id has to be a positive number');
            });

            it('should throw if id is not positive', () => {
                expect(() =>
                    createUser({
                        id: -1,
                        email: 'test@mail.com',
                        password: '1234567890',
                    })
                ).toThrow('User id has to be a positive number');
            });

            it('should throw if email is invalid string', () => {
                expect(() =>
                    createUser({ id: 1, email: '', password: '1234567890' })
                ).toThrow('Invalid email for user');
                expect(() =>
                    createUser({ id: 1, email: 'test', password: '1234567890' })
                ).toThrow('Invalid email for user');
            });

            it('should throw if email is null or undefined', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: undefined,
                        password: '1234567890',
                    })
                ).toThrow('Invalid email for user');
                expect(() =>
                    createUser({ id: 1, email: null, password: '1234567890' })
                ).toThrow('Invalid email for user');
            });

            it('should throw if password is null or undefined', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: undefined,
                    })
                ).toThrow(
                    'Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
                );
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: null,
                    })
                ).toThrow(
                    'Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
                );
            });

            it('should throw if password is less than 8 characters', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: createStringOfLength(7),
                    })
                ).toThrow(
                    'Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
                );
            });

            it('should throw if password is more than 50 characters', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: createStringOfLength(51),
                    })
                ).toThrow(
                    'Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
                );
            });

            it('should throw if password includes invalid characters', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'mail@test.com',
                        password: '1234567890' + String.fromCharCode(960),
                    })
                ).toThrow(
                    'Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
                );
            });

            it('should return user object with email and password and all other fields are defaults', () => {
                expect(
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: '1234567890',
                    })
                ).toEqual({
                    id: 1,
                    email: 'test@mail.com',
                    password: '1234567890',
                    imageUrl: null,
                    listIds: [],
                    listItems: [],
                });
            });

            it('should throw when listIds is null or undefined', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: '1234567890',
                        listIds: null,
                    })
                ).toThrow(
                    'A user has to have list of unique positive list ids'
                );
            });

            it('should throw when duplicated list ids are provided', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: '1234567890',
                        listIds: [1, 1],
                    })
                ).toThrow(
                    'A user has to have list of unique positive list ids'
                );
            });

            it('should throw when list ids contains non-positive numbers', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: '1234567890',
                        listIds: [1, -1],
                    })
                ).toThrow(
                    'A user has to have list of unique positive list ids'
                );
            });

            it('should return user object with provided email, password and single list id', () => {
                expect(
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: '1234567890',
                        listIds: [1],
                    })
                ).toEqual({
                    id: 1,
                    email: 'test@mail.com',
                    password: '1234567890',
                    imageUrl: null,
                    listIds: [1],
                    listItems: [],
                });
            });

            it('should return user object with provided email, password and multiple list ids', () => {
                expect(
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: '1234567890',
                        listIds: [1, 2, 3],
                    })
                ).toEqual({
                    id: 1,
                    email: 'test@mail.com',
                    password: '1234567890',
                    imageUrl: null,
                    listIds: [1, 2, 3],
                    listItems: [],
                });
            });

            // add tests for list items ids
        });
    });
});
