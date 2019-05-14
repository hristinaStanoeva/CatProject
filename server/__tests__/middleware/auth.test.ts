import { toString } from 'ramda';

import { LoginRequest, RegisterRequest } from '../../src/controllers';
import {
    ResponseWithUser,
    throwIfNoEmailOrPassword,
    throwIfNoEmailPasswordOrConfirmPassword,
    throwIfInvalidEmail,
    throwIfInvalidPassword,
    throwIfNoMatchingPasswords,
    throwIfUserExists,
} from '../../src/middlewares/auth.middleware';
import { OperationalError } from '../../src/util/errors';
import { UserEntity } from '../../src/entities';

const createMockRequest = ({
    email,
    password,
    confirmPassword,
}: {
    email?: any;
    password?: any;
    confirmPassword?: any;
}): Partial<LoginRequest | RegisterRequest> => ({
    body: {
        email,
        password,
        confirmPassword,
    },
});

const createMockResponse = ({
    user,
}: {
    user: UserEntity;
}): Partial<ResponseWithUser> => ({
    locals: { user },
});

describe('middleware', () => {
    describe('auth', () => {
        describe('throwIfNoEmailOrPassword', () => {
            it('should call next without parameters when email and password are provided and valid', async () => {
                const requestMock = createMockRequest({
                    email: 'test@mail.com',
                    password: '1234567890',
                });
                const nextFnMock = jest.fn();

                await throwIfNoEmailOrPassword(
                    requestMock as any,
                    {} as any,
                    nextFnMock
                );

                expect(nextFnMock).toHaveBeenCalledWith();
            });

            [
                {
                    email: 'invalid',
                    password: '123',
                },
                {
                    email: 'test@mail.com',
                    password: '123',
                },
                {
                    email: 'invalid',
                    password: '1234567890',
                },
            ].forEach(({ email, password }) => {
                it(`should call next without parameters when provided parameters are invalid: email=${toString(
                    email
                )}, password=${toString(password)}`, async () => {
                    const requestMock = createMockRequest({
                        email,
                        password,
                    });
                    const nextFnMock = jest.fn();

                    await throwIfNoEmailOrPassword(
                        requestMock as any,
                        {} as any,
                        nextFnMock
                    );

                    expect(nextFnMock).toHaveBeenCalledWith();
                });
            });

            [
                {},
                {
                    email: 'invalid',
                },
                {
                    password: '123',
                },
                {
                    email: [],
                    password: {},
                },
                {
                    email: [],
                    password: [],
                },
                {
                    email: [],
                },
                {
                    password: [],
                },
                {
                    email: {},
                    password: [],
                },
                {
                    email: null,
                    password: '123456',
                },
                {
                    email: '',
                    password: '12345',
                },
            ].forEach(({ email, password }) => {
                it(`should call next with new OperationalError(400, "Email and password are required") when email=${toString(
                    email
                )}, password=${toString(password)}`, async () => {
                    const requestMock = createMockRequest({
                        email,
                        password,
                    });
                    const nextFnMock = jest.fn();

                    await throwIfNoEmailOrPassword(
                        requestMock as any,
                        {} as any,
                        nextFnMock
                    );

                    expect(nextFnMock).toHaveBeenCalled();
                    expect(
                        nextFnMock.mock.calls[0][0] instanceof OperationalError
                    ).toBe(true);
                    expect(nextFnMock.mock.calls[0][0].statusCode).toBe(400);
                    expect(nextFnMock.mock.calls[0][0].errorMessage).toBe(
                        'Email and password are required'
                    );
                });
            });
        });

        describe('throwIfNoEmailPasswordOrConfirmPassword', () => {
            it('should call next without parameters when email, password and confirmPassword are provided and valid', async () => {
                const requestMock = createMockRequest({
                    email: 'test@mail.com',
                    password: '1234567890',
                    confirmPassword: '1234567890',
                });
                const nextFnMock = jest.fn();

                await throwIfNoEmailPasswordOrConfirmPassword(
                    requestMock as any,
                    {} as any,
                    nextFnMock
                );

                expect(nextFnMock).toHaveBeenCalledWith();
            });

            [
                {
                    email: 'invalid',
                    password: '123',
                    confirmPassword: '12345',
                },
                {
                    email: 'test@mail.com',
                    password: '11',
                    confirmPassword: '5543',
                },
                {
                    email: 'test@mail.com',
                    password: '1234567890' + String.fromCharCode(960), // String.fromCharCode(960) === pi
                    confirmPassword: 'f',
                },
                {
                    email: 'invalid',
                    password: '1234567890',
                    confirmPassword: '1234567890',
                },
            ].forEach(({ email, password, confirmPassword }) => {
                it(`should call next without parameters when provided parameters are invalid: email=${toString(
                    email
                )}, password=${toString(password)}, confirmPassword=${toString(
                    confirmPassword
                )}`, async () => {
                    const requestMock = createMockRequest({
                        email,
                        password,
                        confirmPassword,
                    });
                    const nextFnMock = jest.fn();

                    await throwIfNoEmailPasswordOrConfirmPassword(
                        requestMock as any,
                        {} as any,
                        nextFnMock
                    );

                    expect(nextFnMock).toHaveBeenCalledWith();
                });
            });

            [
                {},
                {
                    email: 'invalid',
                },
                {
                    password: '123',
                },
                {
                    confirmPassword: '123',
                },
                {
                    email: [],
                    password: {},
                    confirmPassword: '',
                },
                {
                    email: {},
                    password: [],
                    confirmPassword: '',
                },
                {
                    email: '',
                    password: {},
                    confirmPassword: [],
                },
                {
                    email: [],
                    password: [],
                    confirmPassword: [],
                },
                {
                    email: {},
                    password: {},
                    confirmPassword: {},
                },
                {
                    email: '',
                    password: '',
                    confirmPassword: '',
                },
                {
                    email: null,
                    password: null,
                    confirmPassword: null,
                },
                {
                    email: '',
                    password: '12345',
                    confirmPassword: '12345',
                },
                {
                    email: 'email',
                    password: null,
                    confirmPassword: '12345',
                },
                {
                    email: 'email',
                    password: '12345',
                    confirmPassword: [],
                },
            ].forEach(({ email, password, confirmPassword }) => {
                it(`should call next with new OperationalError(400, "Email, password and confirmPassword are required") when email=${toString(
                    email
                )}, password=${toString(password)}, confirmPassword=${toString(
                    confirmPassword
                )}`, async () => {
                    const requestMock = createMockRequest({
                        email,
                        password,
                        confirmPassword,
                    });
                    const nextFnMock = jest.fn();

                    await throwIfNoEmailPasswordOrConfirmPassword(
                        requestMock as any,
                        {} as any,
                        nextFnMock
                    );

                    expect(nextFnMock).toHaveBeenCalled();
                    expect(
                        nextFnMock.mock.calls[0][0] instanceof OperationalError
                    ).toBe(true);
                    expect(nextFnMock.mock.calls[0][0].statusCode).toBe(400);
                    expect(nextFnMock.mock.calls[0][0].errorMessage).toBe(
                        'Email, password and confirmPassword are required'
                    );
                });
            });
        });

        describe('throwIfInvalidEmail', () => {
            [
                {
                    email: 'test@mail.com',
                },
                {
                    email: 'user.name@mail.com',
                },
                {
                    email: 'user_name@gmail.com',
                },
            ].forEach(({ email }) => {
                it(`should call next without parameters when provided email is valid: email=${toString(
                    email
                )}`, async () => {
                    const requestMock = createMockRequest({
                        email,
                    });
                    const nextFnMock = jest.fn();

                    await throwIfInvalidEmail(
                        requestMock as any,
                        {} as any,
                        nextFnMock
                    );

                    expect(nextFnMock).toHaveBeenCalledWith();
                });
            });

            [
                {},
                {
                    email: 'invalid',
                },
                {
                    email: [],
                },
                {
                    email: {},
                },
                {
                    email: null,
                },
                {
                    email: '',
                },
                {
                    email: 't@t.t',
                },
            ].forEach(({ email }) => {
                it(`should call next with new OperationalError(400, "Invalid email address") when provided email is invalid: email=${toString(
                    email
                )}`, async () => {
                    const requestMock = createMockRequest({
                        email,
                    });
                    const nextFnMock = jest.fn();

                    await throwIfInvalidEmail(
                        requestMock as any,
                        {} as any,
                        nextFnMock
                    );

                    expect(nextFnMock).toHaveBeenCalled();
                    expect(
                        nextFnMock.mock.calls[0][0] instanceof OperationalError
                    ).toBe(true);
                    expect(nextFnMock.mock.calls[0][0].statusCode).toBe(400);
                    expect(nextFnMock.mock.calls[0][0].errorMessage).toBe(
                        'Invalid email address'
                    );
                });
            });
        });

        describe('throwIfInvalidPassword', () => {
            [
                {
                    password: '1234567890',
                },
                {
                    password: '_123@pass%',
                },
                {
                    password: '()0-=vvmdl;',
                },
            ].forEach(({ password }) => {
                it(`should call next without parameters when provided password is valid: password=${toString(
                    password
                )}`, async () => {
                    const requestMock = createMockRequest({
                        password,
                    });
                    const nextFnMock = jest.fn();

                    await throwIfInvalidPassword(
                        requestMock as any,
                        {} as any,
                        nextFnMock
                    );

                    expect(nextFnMock).toHaveBeenCalledWith();
                });
            });

            [
                {},
                {
                    password: '1',
                },
                {
                    password: '   j',
                },
                {
                    password: {},
                },
                {
                    password: null,
                },
                {
                    password: '',
                },
                {
                    password:
                        '12345678901234567890123456789012345678901234567890a', // length = 51
                },
                {
                    password: '🥰1234567890',
                },
                {
                    password: '1234567890' + String.fromCharCode(960), // String.fromCharCode(960) === pi
                },
            ].forEach(({ password }) => {
                it(`should call next with new OperationalError(400, "{Relevant-error-text}") when provided password is invalid: email=${toString(
                    password
                )}`, async () => {
                    const requestMock = createMockRequest({
                        password,
                    });
                    const nextFnMock = jest.fn();

                    await throwIfInvalidPassword(
                        requestMock as any,
                        {} as any,
                        nextFnMock
                    );

                    expect(nextFnMock).toHaveBeenCalled();
                    expect(
                        nextFnMock.mock.calls[0][0] instanceof OperationalError
                    ).toBe(true);
                    expect(nextFnMock.mock.calls[0][0].statusCode).toBe(400);
                    expect(
                        nextFnMock.mock.calls[0][0].errorMessage.toLowerCase()
                    ).toEqual(expect.stringContaining('password'));
                    expect(
                        nextFnMock.mock.calls[0][0].errorMessage.toLowerCase()
                    ).toEqual(expect.stringContaining('letters'));
                    expect(
                        nextFnMock.mock.calls[0][0].errorMessage.toLowerCase()
                    ).toEqual(expect.stringContaining('numbers'));
                    expect(
                        nextFnMock.mock.calls[0][0].errorMessage.toLowerCase()
                    ).toEqual(expect.stringContaining('symbols'));
                });
            });
        });

        describe('throwIfNoMatchingPasswords', () => {
            [
                {
                    password: '1234567890',
                    confirmPassword: '1234567890',
                },
                {
                    password: '_123@pass%',
                    confirmPassword: '_123@pass%',
                },
                {
                    password: '()0-=vvmdl;',
                    confirmPassword: '()0-=vvmdl;',
                },
            ].forEach(({ password, confirmPassword }) => {
                it(`should call next without parameters when provided password and confirmPassword match: password=${toString(
                    password
                )}, confirmPassword=${toString(confirmPassword)}`, async () => {
                    const requestMock = createMockRequest({
                        password,
                        confirmPassword,
                    });
                    const nextFnMock = jest.fn();

                    await throwIfNoMatchingPasswords(
                        requestMock as any,
                        {} as any,
                        nextFnMock
                    );

                    expect(nextFnMock).toHaveBeenCalledWith();
                });
            });

            [
                {
                    password: '1asd123asd',
                },
                {
                    confirmPassword: '1asd123asd',
                },
                {
                    password: '   j',
                    confirmPassword: '1asd123asd',
                },
                {
                    password: {},
                    confirmPassword: '1asd123asd',
                },
                {
                    password: null,
                    confirmPassword: '1asd123asd',
                },
                {
                    password: '',
                    confirmPassword: '1asd123asd',
                },
                {
                    password:
                        '12345678901234567890123456789012345678901234567890a', // length = 51
                    confirmPassword: '1asd123asd',
                },
                {
                    password: '🥰1234567890',
                    confirmPassword: '1asd123asd',
                },
                {
                    password: '1234567890' + String.fromCharCode(960), // String.fromCharCode(960) === pi
                    confirmPassword: '1asd123asd',
                },
            ].forEach(({ password, confirmPassword }) => {
                it(`should call next with new OperationalError(400, "Passwords must match") when provided password and confirmPassword do not match: email=${toString(
                    password
                )}, confirmPassword=${confirmPassword}`, async () => {
                    const requestMock = createMockRequest({
                        password,
                        confirmPassword,
                    });
                    const nextFnMock = jest.fn();

                    await throwIfNoMatchingPasswords(
                        requestMock as any,
                        {} as any,
                        nextFnMock
                    );

                    expect(nextFnMock).toHaveBeenCalled();
                    expect(
                        nextFnMock.mock.calls[0][0] instanceof OperationalError
                    ).toBe(true);
                    expect(nextFnMock.mock.calls[0][0].statusCode).toBe(400);
                    expect(nextFnMock.mock.calls[0][0].errorMessage).toBe(
                        'Passwords must match'
                    );
                });
            });
        });

        describe('throwIfUserExists', () => {
            [{}, undefined, null, '', []].forEach((user: any) => {
                it(`should call next without parameters when a user does not exist, user=${toString(
                    user
                )}`, async () => {
                    const requestMock = createMockRequest({
                        email: 'test@mail.com',
                        password: '1234567890',
                    });
                    const responseMock = createMockResponse({
                        user,
                    });
                    const nextFnMock = jest.fn();

                    await throwIfUserExists(
                        requestMock as any,
                        responseMock as any,
                        nextFnMock
                    );

                    expect(nextFnMock).toHaveBeenCalledWith();
                });
            });
            [true, false, { email: 'test@mail.com' }, 'test@mail.com'].forEach(
                (user: any) => {
                    it(`should call next without parameters when a user is not an instance of UserEntity, user=${toString(
                        user
                    )}`, async () => {
                        const requestMock = createMockRequest({
                            email: 'test@mail.com',
                            password: '1234567890',
                        });
                        const responseMock = createMockResponse({
                            user,
                        });
                        const nextFnMock = jest.fn();

                        await throwIfUserExists(
                            requestMock as any,
                            responseMock as any,
                            nextFnMock
                        );

                        expect(nextFnMock).toHaveBeenCalledWith();
                    });
                }
            );

            it('should call with new OperationalError(400, test@mail.com already exists) when user already exists', async () => {
                const requestMock = createMockRequest({
                    email: 'test@mail.com',
                    password: '1234567890',
                });
                const user = new UserEntity();
                user.email = 'test@mail.com';

                const responseMock = createMockResponse({
                    user,
                });
                const nextFnMock = jest.fn();

                await throwIfUserExists(
                    requestMock as any,
                    responseMock as any,
                    nextFnMock
                );

                expect(nextFnMock).toHaveBeenCalled();
                expect(
                    nextFnMock.mock.calls[0][0] instanceof OperationalError
                ).toBe(true);
                expect(nextFnMock.mock.calls[0][0].statusCode).toBe(400);
                expect(
                    nextFnMock.mock.calls[0][0].errorMessage.toLowerCase()
                ).toBe(`${user.email} already exists!`);
            });
        });
    });
});
