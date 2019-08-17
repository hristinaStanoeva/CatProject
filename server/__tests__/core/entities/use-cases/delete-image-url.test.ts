import { makeDeleteImageUrl } from '../../../../src/core/use-cases/user/image/delete-image-url';
import { User, makeUser } from '../../../../src/core/entities/user';
import { DeleteImageUrlAdapter } from '../../../../src/core/use-cases/data-access.model';

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
        describe('deleteImageUrl', () => {
            it('should call db adapter', async () => {
                const dataAccess: DeleteImageUrlAdapter = {
                    deleteImageUrl: jest.fn().mockReturnValue(
                        Promise.resolve({
                            ...sampleUser,
                            imageUrl: null,
                            random: 'field',
                        })
                    ),
                };

                await makeDeleteImageUrl(makeUser)(dataAccess)(sampleUser);

                expect(dataAccess.deleteImageUrl).toHaveBeenCalled();
            });

            it('should delegate image url deletion', async () => {
                const userCreator = jest.fn();

                const dataAccess: DeleteImageUrlAdapter = {
                    deleteImageUrl: user =>
                        Promise.resolve({
                            ...user,
                            imageUrl: null,
                            random: 'field',
                        }),
                };

                await makeDeleteImageUrl(userCreator)(dataAccess)(sampleUser);

                expect(userCreator).toHaveBeenCalled();
            });

            it('should set image url to null', async () => {
                const dataAccess: DeleteImageUrlAdapter = {
                    deleteImageUrl: user =>
                        Promise.resolve({
                            ...user,
                            imageUrl: null,
                            random: 'field',
                        }),
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
