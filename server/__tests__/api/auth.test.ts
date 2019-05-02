import request from 'supertest';
import app from '../../src/app';

describe('/api/auth', () => {
    // storing login as a const here is keeping the value received in the first test
    it('POST /login should set Content-Type to application/json', async () => {
        const result = await request(app).post('/api/auth/login');
        expect(result.type).toBe('application/json');
    });

    it('POST /login should return json object in the form { message: "error text" } on error', async () => {
        const result = await request(app).post('/api/auth/login');

        expect(result.body.message).toBeDefined();
    });

    it('POST /login should return 400 and relevant error text when email and/or password is missing', async () => {
        let result = await request(app).post('/api/auth/login');

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('required')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('email')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );

        result = await request(app)
            .post('/api/auth/login')
            .send({ email: 'somemail@mail.com' });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('required')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );

        result = await request(app)
            .post('/api/auth/login')
            .send({ password: '1234567890' });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('required')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('email')
        );
    });

    it('POST /login should return 400 and some error text when email is invalid but password is valid', async () => {
        let result = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'invalid',
                password: '1234567890',
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toBe('invalid email address');

        result = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'invalid@invalid',
                password: '1234567890',
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toBe('invalid email address');
    });

    it('POST /login should return 400 and some error text when password is invalid but email is valid', async () => {
        let result = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@mail.com',
                password: '1234567',
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('8')
        );

        result = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@mail.com',
                password: '012345678901234567890123456789012345678901234567890', // length = 51
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('50')
        );

        result = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@mail.com',
                password: '1234567890' + String.fromCharCode(960), // String.fromCharCode(960) === pi
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('letters')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('numbers')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('symbols')
        );

        result = await request(app)
            .post('/api/auth/login')
            .send({
                email: {},
                password: '123456789',
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('email')
        );

        result = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@mail.com',
                password: {},
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('letters')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('numbers')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('symbols')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('string')
        );
    });

    xit('POST /login should return 200 when both email and password are valid', async () => {
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

    it('POST /register should return json object in the form { message: "error text" } on error', async () => {
        const result = await request(app).post('/api/auth/register');

        expect(result.body.message).toBeDefined();
    });

    it('POST /register should return 400 and relevant error text when email, password and/or confirmPassword is missing', async () => {
        let result = await request(app).post('/api/auth/register');

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('required')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('email')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('confirmpassword')
        );

        result = await request(app)
            .post('/api/auth/register')
            .send({ email: 'test@mail.com' });
        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('required')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('confirmpassword')
        );

        result = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@mail.com',
                password: '1234567890',
            });
        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('required')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('email')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('confirmpassword')
        );
    });

    it('POST /register should return 400 with some error text when email is invalid but password and confirmPassword are valid', async () => {
        let result = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'invalid',
                password: '1234567890',
                confirmPassword: '1234567890',
            });
        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toBe('invalid email address');

        result = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'invalid@invalid',
                password: '1234567890',
                confirmPassword: '1234567890',
            });
        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toBe('invalid email address');
    });

    it('POST /register should return 400 and some error text when password(with non-matching confirmPassword) is invalid but email is valid', async () => {
        let result = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@mail.com',
                password: '1234567',
                confirmPassword: '12345',
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('8')
        );

        result = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@mail.com',
                password: '012345678901234567890123456789012345678901234567890', // length = 51
                confirmPassword:
                    '012345678901234567123456789012345678901234567890',
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('50')
        );

        result = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@mail.com',
                password: '1234567890' + String.fromCharCode(960), // String.fromCharCode(960) === pi
                confirmPassword: '1567890' + String.fromCharCode(960), // String.fromCharCode(960) === pi
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('letters')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('numbers')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('symbols')
        );

        result = await request(app)
            .post('/api/auth/register')
            .send({
                email: {},
                password: '123456789',
                confirmPassword: '15aaaaaaa6789',
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('email')
        );

        result = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@mail.com',
                password: {},
                confirmPassword: [],
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('letters')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('numbers')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('symbols')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('string')
        );
    });

    it('POST /register should return 400 and some error text when password(with matching confirmPassword) is invalid but email is valid', async () => {
        let result = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@mail.com',
                password: '1234567',
                confirmPassword: '1234567',
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('8')
        );

        result = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@mail.com',
                password: '012345678901234567890123456789012345678901234567890', // length = 51
                confirmPassword:
                    '012345678901234567890123456789012345678901234567890', // length = 51
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('50')
        );

        result = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@mail.com',
                password: '1234567890' + String.fromCharCode(960), // String.fromCharCode(960) === pi
                confirmPassword: '1234567890' + String.fromCharCode(960), // String.fromCharCode(960) === pi
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('letters')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('numbers')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('symbols')
        );

        result = await request(app)
            .post('/api/auth/register')
            .send({
                email: {},
                password: '123456789',
                confirmPassword: '123456789',
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('email')
        );

        result = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@mail.com',
                password: {},
                confirmPassword: {},
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('password')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('letters')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('numbers')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('symbols')
        );
        expect(result.body.message.toLowerCase()).toEqual(
            expect.stringContaining('string')
        );
    });

    it('POST /register should return 400 when password and confirmPassword are not the same but email is provided', async () => {
        const result = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'valid@mail.com',
                password: '12345678',
                confirmPassword: '22222',
            });

        expect(result.status).toBe(400);
        expect(result.body.message.toLowerCase()).toBe('passwords must match');
    });

    xit('POST /register should return status 200 when email, password and confirmPassword are valid', async () => {
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

    xit('POST /reset-password should return status 400 when an invalid email is provided', async () => {
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

    xit('POST /reset-password should return status 200 when a valid email is provided', async () => {
        const result = await request(app)
            .post('/api/auth/reset-password')
            .send({
                email: 'valid@mail.com',
            });

        expect(result.status).toBe(200);
    });
});
