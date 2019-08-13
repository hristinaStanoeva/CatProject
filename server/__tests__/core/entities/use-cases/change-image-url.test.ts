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
                    changeImageUrl: (newImageUrl, user) =>
                        Promise.resolve(sampleUser),
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
                    changeImageUrl: (newImageUrl, user) =>
                        Promise.resolve(sampleUser),
                };

                expect(() =>
                    makeChangeImageUrl(makeUser)(dataAccess)(null, sampleUser)
                ).toThrowError(
                    'Core -> Change image url: Image url has to be a string containing valid url'
                );
            });

            it('should not throw if image url is valid string', () => {
                const dataAccess: ChangeImageUrlAdapter = {
                    changeImageUrl: (newImageUrl, user) =>
                        Promise.resolve(sampleUser),
                };

                expect(() =>
                    makeChangeImageUrl(makeUser)(dataAccess)(
                        'www.google.com',
                        sampleUser
                    )
                ).not.toThrow();
            });

            it('should delegate creation of domain user if image url is valid', async () => {
                const userCreator = jest.fn();
                const dataAccess: ChangeImageUrlAdapter = {
                    changeImageUrl: (newImageUrl, user) =>
                        Promise.resolve(sampleUser),
                };

                await makeChangeImageUrl(userCreator)(dataAccess)(
                    'www.google.com',
                    sampleUser
                );

                expect(userCreator).toHaveBeenCalled();
            });

            it('should return a user with updated image url when all inputs are valid', async () => {
                const dataAccess: ChangeImageUrlAdapter = {
                    changeImageUrl: (newImageUrl, user) =>
                        Promise.resolve(sampleUser),
                };

                expect(
                    await makeChangeImageUrl(makeUser)(dataAccess)(
                        'www.google.com',
                        sampleUser
                    )
                ).toEqual({ ...sampleUser, imageUrl: 'www.google.com' });
            });
        });
    });
});
