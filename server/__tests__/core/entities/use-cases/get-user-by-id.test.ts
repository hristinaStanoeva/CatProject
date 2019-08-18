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
                const dataAccess: GetUserByIdAdapter = {
                    getUserById: id =>
                        Promise.resolve({ ...sampleUser, id, random: 'field' }),
                };

                expect(() =>
                    makeGetUserById(makeUser)(dataAccess)(-1)
                ).toThrowError(
                    'Core -> Get user by id: Id has to be a positive number'
                );
            });

            it('should call db adapter if id is valid', async () => {
                const dataAccess: GetUserByIdAdapter = {
                    getUserById: jest.fn(id =>
                        Promise.resolve({ ...sampleUser, id, random: 'field' })
                    ),
                };

                await makeGetUserById(makeUser)(dataAccess)(2);

                expect(dataAccess.getUserById).toHaveBeenCalled();
            });

            it('should delegate creation of domain user if id is valid', async () => {
                const userCreator = jest.fn(makeUser);
                const dataAccess: GetUserByIdAdapter = {
                    getUserById: id =>
                        Promise.resolve({ ...sampleUser, id, random: 'field' }),
                };

                await makeGetUserById(userCreator)(dataAccess)(3);

                expect(userCreator).toHaveBeenCalled();
            });

            it('should return user if id is valid', async () => {
                const dataAccess: GetUserByIdAdapter = {
                    getUserById: id => Promise.resolve({ ...sampleUser, id }),
                };

                expect(await makeGetUserById(makeUser)(dataAccess)(2)).toEqual({
                    id: 2,
                    email: 'some@mail.com',
                    password: '1234567890',
                    imageUrl: 'www.google.com',
                    listIds: [],
                    listItemIds: [],
                });
            });
        });
    });
});
