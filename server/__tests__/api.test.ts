import request from 'supertest';
import app from '../src/app';

describe('api routes', () => {
    describe('/api/auth', () => {
        it('POST /login should set Content-Type to application/json', async () => {
            const result = await request(app).post('/api/auth/login');
            expect(result.type).toBe('application/json');
        });

        it('POST /login should return 400 and some error text when an invalid email is provided', async () => {
            let result = await request(app).post('/api/auth/login');

            expect(result.status).toBe(400);
            expect(result.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: 'email'
                    })
                ])
            );

            result = await request(app).post('/api/auth/login').send({
                email: 'invalid'
            });

            expect(result.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: 'email'
                    })
                ])
            );

            result = await request(app).post('/api/auth/login').send({
                email: 'invalid@invalid'
            });

            expect(result.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: 'email'
                    })
                ])
            );
        });

        it('POST /login should return 400 and some error text when an invalid password is provided', async () => {
            let result = await request(app).post('/api/auth/login');
            expect(result.status).toBe(400);
            expect(result.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "password"
                    })
                ])
            );

            result = await request(app).post('/api/auth/login').send({
                password: '123456'
            });
            expect(result.status).toBe(400);
            expect(result.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: 'password'
                    })
                ])
            );
        });

        it('POST /login should return 200 when both email and password are valid', async () => {
            const result = await request(app).post('/api/auth/login').send({
                email: 'valid@mail.com',
                password: '12345678'
            });

            expect(result.status).toBe(200);
            expect(result.body.token).toBeDefined();
            expect(result.body.userId).toBeDefined();
        });

        it('POST /register should set Content-Type to application/json', async () => {
            const result = await request(app).post('/api/auth/register');
            expect(result.type).toBe('application/json');
        });

        it('POST /register should return 400 with some error when an invalid email is provided', async () => {

            let result = await request(app).post('/api/auth/register');
            expect(result.status).toBe(400);
            expect(result.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: 'email'
                    })
                ])
            );

            result = await request(app).post('/api/auth/register').send({
                email: 'invalid'
            });

            expect(result.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: 'email'
                    })
                ])
            );

            result = await request(app).post('/api/auth/register').send({
                email: 'invalid@invalid'
            });

            expect(result.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: 'email'
                    })
                ])
            );
        });

        it('POST /register should return 400 when an ivalid password is provided', async () => {
            let result = await request(app).post('/api/auth/register').send({
                email: 'valid@mail.com',
                password: '1234'
            });

            expect(result.status).toBe(400);
            expect(result.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: 'password'
                    })
                ])
            );

            result = await request(app).post('/api/auth/register').send({
                email: 'valid@mail.com',
            });

            expect(result.status).toEqual(400);
            expect(result.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: 'password'
                    })
                ])
            );
        });

        it('POST /register should return 400 when password and confirmPassword are not the same', async () => {
            let result = await request(app).post('/api/auth/register').send({
                email: 'valid@mail.com',
                password: '12345678',
                confirmPassword: '22222'
            });

            expect(result.status).toBe(400);
            expect(result.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        error: expect.stringContaining('match')
                    })
                ])
            );

            result = await request(app).post('/api/auth/register').send({
                email: 'valid@mail.com',
                password: '12345678',
            });

            expect(result.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        error: expect.stringContaining('match')
                    })
                ])
            );
        });

        it('POST /register should return status 200 when email, password and confirmPassword are valid', async () => {
            const result = await request(app).post('/api/auth/register').send({
                email: 'valid@mail.com',
                password: '12345678',
                confirmPassword: '12345678'
            });

            expect(result.status).toBe(200);
            expect(result.body.token).toBeDefined();
            expect(result.body.userId).toBeDefined();
        });

        it('POST /reset-password should return status 400 when an invalid email is provided', async () => {
            let result = await request(app).post('/api/auth/reset-password');

            expect(result.status).toBe(400);
            expect(result.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: 'email'
                    })
                ])
            );

            result = await request(app).post('/api/auth/reset-password').send({
                email: 'invalid'
            });

            expect(result.status).toBe(400);
            expect(result.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: 'email'
                    })
                ])
            );
        });

        it('POST /reset-password should return status 200 when a valid email is provided', async () => {
            const result = await request(app).post('/api/auth/reset-password').send({
                email: 'valid@mail.com'
            });

            expect(result.status).toBe(200);
        });

    });
    describe('/api/list-items', () => {
        [
            { testValue: undefined, stringValue: 'undefined' },
            { testValue: null, stringValue: 'null' },
            { testValue: true, stringValue: 'true' },
            { testValue: false, stringValue: 'false' },
            { testValue: [], stringValue: 'array' },
            { testValue: {}, stringValue: 'object' },
            { testValue: '', stringValue: 'empty string' }
        ].forEach((v) => {
            it('POST / should return 400 when content is ' + v.stringValue, async () => {
                const result = await request(app).post('/api/list-items').send({
                    content: v.testValue
                });

                expect(result.status).toBe(400);
                expect(result.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            field: 'content'
                        })
                    ])
                );
            });
        });

        [
            { testValue: undefined, stringValue: 'undefined' },
            { testValue: null, stringValue: 'null' },
            { testValue: [], stringValue: 'array' },
            { testValue: {}, stringValue: 'object' },
            { testValue: 'some string', stringValue: 'some string' },
            { testValue: '', stringValue: 'empty string' }
        ].forEach((v) => {
            it('POST / should return 400 when checked is ' + v.stringValue, async () => {
                const result = await request(app).post('/api/list-items').send({
                    checked: v.testValue
                });

                expect(result.status).toBe(400);
                expect(result.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            field: 'checked'
                        })
                    ])
                );
            });
        });

        it('POST / should not return 400 or error when content and checked are valid', async () => {
            const result = await request(app).post('/api/list-items').send({
                checked: false,
                content: 'test content'
            });

            expect(result.status).not.toBe(400);
            expect(result.body).not.toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: 'checked'
                    })
                ])
            );
            expect(result.body).not.toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: 'content'
                    })
                ])
            );
        });
    });
});
