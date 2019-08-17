import { makeCreateUser } from '../../../../src/core/use-cases/user/create-user';
import { CreateUserAdapter } from '../../../../src/core/use-cases/data-access.model';
import { User, makeUser } from '../../../../src/core/entities/user';

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
        describe('createUser', () => {
            it('should call db adapter', async () => {
                const dataAccess: CreateUserAdapter = {
                    createUser: jest.fn().mockReturnValue(
                        Promise.resolve({
                            ...sampleUser,
                        })
                    ),
                };

                await makeCreateUser(makeUser)(dataAccess)(sampleUser);

                expect(dataAccess.createUser).toHaveBeenCalled();
            });

            it('should delegate creation of domain user', async () => {
                const userCreator = jest.fn();

                const dataAccess: CreateUserAdapter = {
                    createUser: user =>
                        Promise.resolve({ ...user, random: 'field' }),
                };

                await makeCreateUser(userCreator)(dataAccess)(sampleUser);

                expect(userCreator).toHaveBeenCalled();
            });

            it('should return a new user', async () => {
                const dataAccess: CreateUserAdapter = {
                    createUser: user =>
                        Promise.resolve({ ...user, random: 'field' }),
                };

                expect(
                    await makeCreateUser(makeUser)(dataAccess)(sampleUser)
                ).toEqual({
                    id: 1,
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
