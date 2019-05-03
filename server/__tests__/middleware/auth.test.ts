import { toString } from 'ramda';

import { LoginRequest, RegisterRequest } from '../../src/controllers';
import {
    throwIfNoEmailOrPassword,
    throwIfNoEmailPasswordOrConfirmPassword,
} from '../../src/middlewares/auth.middleware';
import { OperationalError } from '../../src/util/errors';

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
    });
});
