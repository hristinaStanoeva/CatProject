import { ChangePasswordAdapter } from '../../../../src/core/use-cases/data-access.model';
import { makeChangePassword } from '../../../../src/core/use-cases/user/password/change-password';
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
        describe('changePassword', () => {
            it('should throw if password is invalid', () => {
                const userCreator = jest.fn(makeUser);
                const dataAccess: ChangePasswordAdapter = {
                    changePassword: (password, user) =>
                        Promise.resolve({ ...user, password }),
                };

                expect(() =>
                    makeChangePassword(userCreator)(dataAccess)(
                        '12',
                        sampleUser
                    )
                ).toThrowError(
                    'Core -> Change password: Password has to be string between 8 and 50 characters long and include latin letters, numbers and symbols'
                );
            });

            it('should call db adapter if password is valid', async () => {
                const dataAccess: ChangePasswordAdapter = {
                    changePassword: jest.fn((password, user) =>
                        Promise.resolve({
                            ...user,
                            password,
                            random: 'field',
                        })
                    ),
                };

                await makeChangePassword(makeUser)(dataAccess)(
                    'qwertyuiop',
                    sampleUser
                );

                expect(dataAccess.changePassword).toHaveBeenCalled();
            });

            it('should delegate domain user creation if password is valid', async () => {
                const userCreator = jest.fn(makeUser);
                const dataAccess: ChangePasswordAdapter = {
                    changePassword: (password, user) =>
                        Promise.resolve({
                            ...user,
                            password,
                            random: 'field',
                        }),
                };

                await makeChangePassword(userCreator)(dataAccess)(
                    'qwertyuiop',
                    sampleUser
                );

                expect(userCreator).toHaveBeenCalled();
            });

            it('should return user with updated password', async () => {
                const dataAccess: ChangePasswordAdapter = {
                    changePassword: (password, user) =>
                        Promise.resolve({
                            ...user,
                            password,
                            random: 'field',
                        }),
                };

                expect(
                    await makeChangePassword(makeUser)(dataAccess)(
                        'qwertyuiop',
                        sampleUser
                    )
                ).toEqual({
                    id: 1,
                    email: 'some@mail.com',
                    password: 'qwertyuiop',
                    imageUrl: 'www.google.com',
                    listIds: [],
                    listItemIds: [],
                });
            });
        });
    });
});
