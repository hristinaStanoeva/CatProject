import { makeGetUserByEmail } from '../../../../src/core/use-cases/user/get-user-by-email';
import { GetUserByEmailAdapter } from '../../../../src/core/use-cases/data-access.model';
import { makeUser, User } from '../../../../src/core/entities/user';

const sampleUser: User = {
    id: 1,
    email: 'some@mail.com',
    password: '1234567890',
    imageUrl: 'www.google.com',
    listIds: [],
    listItemIds: [],
};

describe('core', () => {
    describe('use cases', () => {
        describe('getUserByEmail', () => {
            it('should throw if email is invalid', () => {
                const userCreator = jest.fn();
                const dataAccess: GetUserByEmailAdapter = {
                    getUserByEmail: email => Promise.resolve(sampleUser),
                };

                expect(() =>
                    makeGetUserByEmail(userCreator)(dataAccess)('invalid')
                ).toThrowError(
                    'Core -> Get user by email: Email has to be a string in the form "name@domain.tld"'
                );
            });

            it('should delegate creation of domain user if email is valid', async () => {
                const userCreator = jest.fn();
                const dataAccess: GetUserByEmailAdapter = {
                    getUserByEmail: email => Promise.resolve(sampleUser),
                };

                await makeGetUserByEmail(userCreator)(dataAccess)(
                    'valid@mail.com'
                );

                expect(userCreator).toHaveBeenCalled();
            });

            it('should return user from user-like object', async () => {
                const dataAccess: GetUserByEmailAdapter = {
                    getUserByEmail: email =>
                        Promise.resolve({ ...sampleUser, otherValue: 'test' }),
                };

                expect(
                    await makeGetUserByEmail(makeUser)(dataAccess)(
                        sampleUser.email
                    )
                ).toEqual(sampleUser);
            });

            it('should return user from user object', async () => {
                const dataAccess: GetUserByEmailAdapter = {
                    getUserByEmail: email => Promise.resolve(sampleUser),
                };

                expect(
                    await makeGetUserByEmail(makeUser)(dataAccess)(
                        sampleUser.email
                    )
                ).toEqual(sampleUser);
            });
        });
    });
});
