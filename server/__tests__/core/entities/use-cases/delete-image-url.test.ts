import { makeDeleteImageUrl } from '../../../../src/core/use-cases/user/image/delete-image-url';
import { User, makeUser } from '../../../../src/core/entities/user';
import { DeleteImageUrlAdapter } from '../../../../src/core/use-cases/data-access.model';

describe('core', () => {
    describe('use cases', () => {
        describe('deleteImageUrl', () => {
            it('should delegate image url deletion', async () => {
                const userCreator = jest.fn();

                const sampleUser: User = {
                    id: 1,
                    email: 'some@mail.com',
                    password: '1234567890',
                    imageUrl: 'www.google.com',
                    listIds: [],
                    listItemIds: [],
                };

                const dataAccess: DeleteImageUrlAdapter = {
                    deleteImageUrl: user => Promise.resolve(user),
                };

                await makeDeleteImageUrl(userCreator)(dataAccess)(sampleUser);

                expect(userCreator).toHaveBeenCalled();
            });

            it('should set image url to null', async () => {
                const sampleUser: User = {
                    id: 1,
                    email: 'some@mail.com',
                    password: '1234567890',
                    imageUrl: 'www.google.com',
                    listIds: [],
                    listItemIds: [],
                };

                const dataAccess: DeleteImageUrlAdapter = {
                    deleteImageUrl: user => Promise.resolve(user),
                };

                expect(
                    await makeDeleteImageUrl(makeUser)(dataAccess)(sampleUser)
                ).toEqual({
                    id: 1,
                    email: 'some@mail.com',
                    password: '1234567890',
                    imageUrl: null,
                    listIds: [],
                    listItemIds: [],
                });
            });
        });
    });
});
