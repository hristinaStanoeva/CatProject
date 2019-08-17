import { makeChangeEmail } from '../../../../src/core/use-cases/user/email/change-email';
import { ChangeEmailAdapter } from '../../../../src/core/use-cases/data-access.model';
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
        describe('changeEmail', () => {
            it('should throw if email is invalid', () => {
                const userCreator = jest.fn();
                const dataAccess: ChangeEmailAdapter = {
                    changeEmail: (email, user) =>
                        Promise.resolve({
                            ...sampleUser,
                            email,
                            random: 'field',
                        }),
                };

                expect(() =>
                    makeChangeEmail(userCreator)(dataAccess)(
                        'invalid',
                        sampleUser
                    )
                ).toThrowError(
                    'Core -> Change email: Email has to be a string in the form "name@domain.tld"'
                );
            });

            it('should call db adapter if password is valid', async () => {
                const dataAccess: ChangeEmailAdapter = {
                    changeEmail: jest.fn().mockReturnValue(
                        Promise.resolve({
                            ...sampleUser,
                            email: 'valid@mail.com',
                            random: 'field',
                        })
                    ),
                };

                await makeChangeEmail(makeUser)(dataAccess)(
                    'valid@mail.com',
                    sampleUser
                );

                expect(dataAccess.changeEmail).toHaveBeenCalled();
            });

            it('should delegate creation of domain user if email is valid', async () => {
                const userCreator = jest.fn();
                const dataAccess: ChangeEmailAdapter = {
                    changeEmail: (email, user) =>
                        Promise.resolve({
                            ...sampleUser,
                            email,
                            random: 'field',
                        }),
                };

                await makeChangeEmail(userCreator)(dataAccess)(
                    'valid@mail.com',
                    sampleUser
                );

                expect(userCreator).toHaveBeenCalled();
            });

            it('should return a user with updated email when all inputs are valid', async () => {
                const dataAccess: ChangeEmailAdapter = {
                    changeEmail: (email, user) =>
                        Promise.resolve({
                            ...sampleUser,
                            email,
                            random: 'field',
                        }),
                };

                expect(
                    await makeChangeEmail(makeUser)(dataAccess)(
                        'valid@mail.com',
                        sampleUser
                    )
                ).toEqual({ ...sampleUser, email: 'valid@mail.com' });
            });
        });
    });
});
