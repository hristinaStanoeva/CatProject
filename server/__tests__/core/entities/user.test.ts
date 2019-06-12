import { createUser } from '../../../src/core/entities/user';
describe('core', () => {
    describe('entities', () => {
        describe('createUser', () => {
            it('should throw if no email is provided', () => {
                expect(() => createUser({})).toThrow('Invalid email for user');
            });

            it('should throw if email is invalid string', () => {
                expect(() => createUser({ email: '' })).toThrow(
                    'Invalid email for user'
                );
                expect(() => createUser({ email: 'test' })).toThrow(
                    'Invalid email for user'
                );
            });

            it('should throw if email is null or undefined', () => {
                expect(() => createUser({ email: undefined })).toThrow(
                    'Invalid email for user'
                );
                expect(() => createUser({ email: null })).toThrow(
                    'Invalid email for user'
                );
            });

            // maybe move as last test
            it('should return object with provided valid email', () => {
                expect(
                    createUser({
                        email: 'test@mail.com',
                        password: '1234567890',
                    })
                ).toEqual(
                    expect.objectContaining({
                        email: 'test@mail.com',
                    })
                );
            });

            it('should throw if no password is provided', () => {
                expect(() => createUser({ email: 'test@mail.com' })).toThrow(
                    'Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
                );
            });

            it('should throw if password is not a string', () => {
                expect(() =>
                    createUser({
                        email: 'test@mail.com',
                        password: 123123123123 as any,
                    })
                ).toThrow(
                    'Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
                );
                expect(() =>
                    createUser({ email: 'test@mail.com', password: [] as any })
                ).toThrow(
                    'Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
                );
                expect(() =>
                    createUser({ email: 'test@mail.com', password: null })
                ).toThrow(
                    'Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
                );
            });

            it('should throw if password includes invalid characters', () => {
                expect(() =>
                    createUser({
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
                        email: 'test@mail.com',
                        password: '1234567890',
                    })
                ).toEqual({
                    email: 'test@mail.com',
                    password: '1234567890',
                    imageUrl: null,
                    lists: [],
                    listItems: [],
                });
            });
        });
    });
});
