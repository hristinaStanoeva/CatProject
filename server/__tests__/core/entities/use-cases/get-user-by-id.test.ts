import { makeGetUserById } from '../../../../src/core/use-cases/user/get-user-by-id';
import { GetUserByIdAdapter } from '../../../../src/core/use-cases/data-access.model';
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
        describe('getUserById', () => {
            it('should throw if id is invalid', () => {
                const userCreator = jest.fn();
                const dataAccess: GetUserByIdAdapter = {
                    getUserById: id => Promise.resolve(sampleUser),
                };

                expect(() =>
                    makeGetUserById(userCreator)(dataAccess)(-1)
                ).toThrowError(
                    'Core -> Get user by id: Id has to be a positive number'
                );
            });

            it('should delegate creation of domain user if id is valid', async () => {
                const userCreator = jest.fn();
                const dataAccess: GetUserByIdAdapter = {
                    getUserById: id => Promise.resolve(sampleUser),
                };

                await makeGetUserById(userCreator)(dataAccess)(3);

                expect(userCreator).toHaveBeenCalled();
            });

            it('should return user from user-like object', async () => {
                const dataAccess: GetUserByIdAdapter = {
                    getUserById: id =>
                        Promise.resolve({ ...sampleUser, otherValue: 'test' }),
                };

                expect(
                    await makeGetUserById(makeUser)(dataAccess)(sampleUser.id)
                ).toEqual(sampleUser);
            });

            it('should return user from user object', async () => {
                const dataAccess: GetUserByIdAdapter = {
                    getUserById: id => Promise.resolve(sampleUser),
                };

                expect(
                    await makeGetUserById(makeUser)(dataAccess)(sampleUser.id)
                ).toEqual(sampleUser);
            });
        });
    });
});
