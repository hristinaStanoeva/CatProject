import request from 'supertest';
import app from '../../src/app';

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
                    field: 'email',
                }),
            ])
        );

        result = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'invalid',
            });

        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'email',
                }),
            ])
        );

        result = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'invalid@invalid',
            });

        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'email',
                }),
            ])
        );
    });

    it('POST /login should return 400 and some error text when no password is provided', async () => {
        const result = await request(app).post('/api/auth/login');
        expect(result.status).toBe(400);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'password',
                }),
            ])
        );
    });

    it('POST /login should return 400 and some error text when a password is too short(< 8 chars)', async () => {
        const result = await request(app)
            .post('/api/auth/login')
            .send({
                password: '123456',
            });
        expect(result.status).toBe(400);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'password',
                }),
            ])
        );
    });

    it('POST /login should return 400 and some error text when a password is too long(> 50 chars)', async () => {
        const result = await request(app)
            .post('/api/auth/login')
            .send({
                password: '123456789012345678901234567890123456789012345678901',
            });

        expect(result.status).toBe(400);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'password',
                }),
            ])
        );
    });

    it('POST /login should return 400 and some error text when a password contains invalid characters', async () => {
        const result = await request(app)
            .post('/api/auth/login')
            .send({
                password: '1234567890' + String.fromCharCode(960), // String.fromCharCode(960) === pi
            });

        expect(result.status).toBe(400);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'password',
                }),
            ])
        );
    });

    it('POST /login should return 200 when both email and password are valid', async () => {
        const result = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'valid@mail.com',
                password: '12345678',
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
                    field: 'email',
                }),
            ])
        );

        result = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'invalid',
            });

        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'email',
                }),
            ])
        );

        result = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'invalid@invalid',
            });

        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'email',
                }),
            ])
        );
    });

    it('POST /register should return 400 and some error text when no password is provided', async () => {
        const result = await request(app).post('/api/auth/register');
        expect(result.status).toBe(400);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'password',
                }),
            ])
        );
    });

    it('POST /register should return 400 and some error text when a password is too short(< 8 chars)', async () => {
        const result = await request(app)
            .post('/api/auth/register')
            .send({
                password: '123456',
            });
        expect(result.status).toBe(400);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'password',
                }),
            ])
        );
    });

    it('POST /register should return 400 and some error text when a password is too long(> 50 chars)', async () => {
        const result = await request(app)
            .post('/api/auth/register')
            .send({
                password: '123456789012345678901234567890123456789012345678901',
            });

        expect(result.status).toBe(400);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'password',
                }),
            ])
        );
    });

    it('POST /register should return 400 and some error text when a password contains invalid characters', async () => {
        const result = await request(app)
            .post('/api/auth/register')
            .send({
                password: '1234567890' + String.fromCharCode(960), // String.fromCharCode(960) === pi
            });

        expect(result.status).toBe(400);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'password',
                }),
            ])
        );
    });

    it('POST /register should return 400 when password and confirmPassword are not the same', async () => {
        let result = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'valid@mail.com',
                password: '12345678',
                confirmPassword: '22222',
            });

        expect(result.status).toBe(400);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    error: expect.stringContaining('match'),
                }),
            ])
        );

        result = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'valid@mail.com',
                password: '12345678',
            });

        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    error: expect.stringContaining('match'),
                }),
            ])
        );
    });

    it('POST /register should return status 200 when email, password and confirmPassword are valid', async () => {
        const result = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'valid@mail.com',
                password: '12345678',
                confirmPassword: '12345678',
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
                    field: 'email',
                }),
            ])
        );

        result = await request(app)
            .post('/api/auth/reset-password')
            .send({
                email: 'invalid',
            });

        expect(result.status).toBe(400);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'email',
                }),
            ])
        );
    });

    it('POST /reset-password should return status 200 when a valid email is provided', async () => {
        const result = await request(app)
            .post('/api/auth/reset-password')
            .send({
                email: 'valid@mail.com',
            });

        expect(result.status).toBe(200);
    });
});
