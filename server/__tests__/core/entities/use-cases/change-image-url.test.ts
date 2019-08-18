import { makeChangeImageUrl } from '../../../../src/core/use-cases/user/image/change-image-url';
import { ChangeImageUrlAdapter } from '../../../../src/core/use-cases/data-access.model';
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
        describe('changeImageUrl', () => {
            it('should throw if image url is invalid string', () => {
                const dataAccess: ChangeImageUrlAdapter = {
                    changeImageUrl: (imageUrl, user) =>
                        Promise.resolve({
                            ...user,
                            imageUrl,
                            random: 'field',
                        }),
                };

                expect(() =>
                    makeChangeImageUrl(makeUser)(dataAccess)(
                        'invalid',
                        sampleUser
                    )
                ).toThrowError(
                    'Core -> Change image url: Image url has to be a string containing valid url'
                );
            });

            it('should throw if image url is null', () => {
                const dataAccess: ChangeImageUrlAdapter = {
                    changeImageUrl: (imageUrl, user) =>
                        Promise.resolve({
                            ...user,
                            imageUrl,
                            random: 'field',
                        }),
                };

                expect(() =>
                    makeChangeImageUrl(makeUser)(dataAccess)(null, sampleUser)
                ).toThrowError(
                    'Core -> Change image url: Image url has to be a string containing valid url'
                );
            });

            it('should call db adapter if image url is valid', async () => {
                const dataAccess: ChangeImageUrlAdapter = {
                    changeImageUrl: jest.fn((imageUrl, user) =>
                        Promise.resolve({
                            ...user,
                            imageUrl,
                            random: 'field',
                        })
                    ),
                };

                await makeChangeImageUrl(makeUser)(dataAccess)(
                    'www.yahoo.com',
                    sampleUser
                );

                expect(dataAccess.changeImageUrl).toHaveBeenCalled();
            });

            it('should delegate creation of domain user if image url is valid', async () => {
                const userCreator = jest.fn(makeUser);
                const dataAccess: ChangeImageUrlAdapter = {
                    changeImageUrl: (imageUrl, user) =>
                        Promise.resolve({
                            ...user,
                            imageUrl,
                            random: 'field',
                        }),
                };

                await makeChangeImageUrl(userCreator)(dataAccess)(
                    'www.google.com',
                    sampleUser
                );

                expect(userCreator).toHaveBeenCalled();
            });

            it('should return a user with updated image url when all inputs are valid', async () => {
                const dataAccess: ChangeImageUrlAdapter = {
                    changeImageUrl: (imageUrl, user) =>
                        Promise.resolve({
                            ...user,
                            imageUrl,
                            random: 'field',
                        }),
                };

                expect(
                    await makeChangeImageUrl(makeUser)(dataAccess)(
                        'www.yahoo.com',
                        sampleUser
                    )
                ).toEqual({
                    id: 1,
                    email: 'some@mail.com',
                    password: '1234567890',
                    imageUrl: 'www.yahoo.com',
                    listIds: [],
                    listItemIds: [],
                });
            });
        });
    });
});
