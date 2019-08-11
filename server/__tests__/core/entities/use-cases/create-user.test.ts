import { makeCreateUser } from '../../../../src/core/use-cases/user/create-user';
import { CreateUserAdapter } from '../../../../src/core/use-cases/data-access.model';
import { User } from '../../../../src/core/entities/user';

describe('core', () => {
    describe('use cases', () => {
        describe('createUser', () => {
            it('should delegate creation of domain user', async () => {
                const userCreator = jest.fn();

                const sampleUser: User = {
                    id: 1,
                    email: 'some@mail.com',
                    password: '1234567890',
                    imageUrl: 'www.google.com',
                    listIds: [],
                    listItemIds: [],
                };

                const dataAccess: CreateUserAdapter = {
                    createUser: user => Promise.resolve(user),
                };

                await makeCreateUser(userCreator)(dataAccess)(sampleUser);

                expect(userCreator).toHaveBeenCalled();
            });
        });
    });
});
