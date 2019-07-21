import { pipe, range, join, repeat } from 'ramda';
import { createUser } from '../../../src/core/entities/user';

const createStringOfLength = pipe(
    repeat('1'),
    join('')
);

describe('core', () => {
    describe('entities', () => {
        describe('createUser', () => {
            it('should throw if id is null', () => {
                expect(() =>
                    createUser({
                        id: null,
                        email: 'test@mail.com',
                        password: '1234567890',
                    })
                ).toThrow('Core -> User: Id has to be a positive number');
            });

            it('should throw if id is 0', () => {
                expect(() =>
                    createUser({
                        id: 0,
                        email: 'test@mail.com',
                        password: '1234567890',
                    })
                ).toThrow('Core -> User: Id has to be a positive number');
            });

            it('should throw if id is negative', () => {
                expect(() =>
                    createUser({
                        id: -1,
                        email: 'test@mail.com',
                        password: '1234567890',
                    })
                ).toThrow('Core -> User: Id has to be a positive number');
            });

            it('should throw if email is invalid string', () => {
                expect(() =>
                    createUser({ id: 1, email: '', password: '1234567890' })
                ).toThrow(
                    'Core -> User: Email has to be a string in the form "name@domain.tld"'
                );
                expect(() =>
                    createUser({ id: 1, email: 'test', password: '1234567890' })
                ).toThrow(
                    'Core -> User: Email has to be a string in the form "name@domain.tld"'
                );
            });

            it('should throw if email is null', () => {
                expect(() =>
                    createUser({ id: 1, email: null, password: '1234567890' })
                ).toThrow(
                    'Core -> User: Email has to be a string in the form "name@domain.tld"'
                );
            });

            it('should throw if password is null', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: null,
                    })
                ).toThrow(
                    'Core -> User: Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
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
                    'Core -> User: Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
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
                    'Core -> User: Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
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
                    'Core -> User: Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
                );
            });

            it('should not throw when image url is null', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'mail@test.com',
                        password: '1234567890',
                        imageUrl: null,
                        listIds: [1],
                        listItemIds: [1],
                    })
                ).not.toThrow();
            });

            it('should not throw if image url is a valid url', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'mail@test.com',
                        password: '1234567890',
                        imageUrl: 'http://www.google.com',
                        listIds: [1],
                        listItemIds: [1],
                    })
                ).not.toThrow();
            });

            it('should throw if image url is not a valid url', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'mail@test.com',
                        password: '1234567890',
                        imageUrl: 'invalid url',
                        listIds: [1],
                        listItemIds: [1],
                    })
                ).toThrow('Core -> User: Image url has to be a string containing valid url');
            });

            it('should throw when list Ids is null', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: '1234567890',
                        listIds: null,
                    })
                ).toThrow(
                    'Core -> User: List ids has to be a list of unique positive numbers'
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
                    'Core -> User: List ids has to be a list of unique positive numbers'
                );
            });

            it('should throw when list ids contains 0', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: '1234567890',
                        listIds: [1, 0],
                    })
                ).toThrow(
                    'Core -> User: List ids has to be a list of unique positive numbers'
                );
            });

            it('should throw when list ids contains negative numbers', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: '1234567890',
                        listIds: [1, -1],
                    })
                ).toThrow(
                    'Core -> User: List ids has to be a list of unique positive numbers'
                );
            });

            it('should throw when list item ids is null', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: '1234567890',
                        listIds: [1],
                        listItemIds: null,
                    })
                ).toThrow(
                    'Core -> User: List item ids has to be a list of unique positive numbers'
                );
            });

            it('should throw when duplicated list item ids are provided', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: '1234567890',
                        listIds: [1],
                        listItemIds: [1, 1],
                    })
                ).toThrow(
                    'Core -> User: List item ids has to be a list of unique positive numbers'
                );
            });

            it('should throw when list item ids contains 0', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: '1234567890',
                        listIds: [1],
                        listItemIds: [1, 0],
                    })
                ).toThrow(
                    'Core -> User: List item ids has to be a list of unique positive numbers'
                );
            });

            it('should throw when list item ids contains negative numbers', () => {
                expect(() =>
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: '1234567890',
                        listIds: [1],
                        listItemIds: [1, -1],
                    })
                ).toThrow(
                    'Core -> User: List item ids has to be a list of unique positive numbers'
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
                    listItemIds: [],
                });
            });

            it('should return user object with provided id, email, password, single list id and single list item id', () => {
                expect(
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: '1234567890',
                        listIds: [1],
                        listItemIds: [1],
                    })
                ).toEqual({
                    id: 1,
                    email: 'test@mail.com',
                    password: '1234567890',
                    imageUrl: null,
                    listIds: [1],
                    listItemIds: [1],
                });
            });

            it('should return user object with provided id, email, password, multiple list ids and multiple list item ids', () => {
                expect(
                    createUser({
                        id: 1,
                        email: 'test@mail.com',
                        password: '1234567890',
                        listIds: [1, 2, 3],
                        listItemIds: [1, 2, 3],
                    })
                ).toEqual({
                    id: 1,
                    email: 'test@mail.com',
                    password: '1234567890',
                    imageUrl: null,
                    listIds: [1, 2, 3],
                    listItemIds: [1, 2, 3],
                });
            });
        });
    });
});
