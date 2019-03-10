import request from 'supertest';
import app from '../../src/app';

describe('/api/list-items', () => {
    [
        { testValue: undefined, stringValue: 'undefined' },
        { testValue: null, stringValue: 'null' },
        { testValue: true, stringValue: 'true' },
        { testValue: false, stringValue: 'false' },
        { testValue: [], stringValue: 'array' },
        { testValue: {}, stringValue: 'object' },
        { testValue: '', stringValue: 'empty string' },
    ].forEach(v => {
        it(
            'POST / should return 400 when content is ' + v.stringValue,
            async () => {
                const result = await request(app)
                    .post('/api/list-items')
                    .send({
                        content: v.testValue,
                    });

                expect(result.status).toBe(400);
                expect(result.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            field: 'content',
                        }),
                    ])
                );
            }
        );
    });

    [
        { testValue: undefined, stringValue: 'undefined' },
        { testValue: null, stringValue: 'null' },
        { testValue: [], stringValue: 'array' },
        { testValue: {}, stringValue: 'object' },
        { testValue: 'some string', stringValue: 'some string' },
        { testValue: '', stringValue: 'empty string' },
    ].forEach(v => {
        it(
            'POST / should return 400 when checked is ' + v.stringValue,
            async () => {
                const result = await request(app)
                    .post('/api/list-items')
                    .send({
                        checked: v.testValue,
                    });

                expect(result.status).toBe(400);
                expect(result.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            field: 'checked',
                        }),
                    ])
                );
            }
        );
    });

    it('POST / should return 400 when no listId is provided', async () => {
        const result = await request(app).post('/api/list-items');

        expect(result.status).toBe(400);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'listId',
                }),
            ])
        );
    });

    it('POST / should not return 400 or error when content, checked and listId are valid', async () => {
        const result = await request(app)
            .post('/api/list-items')
            .send({
                checked: false,
                content: 'test content',
                listId: '123',
            });

        expect(result.status).not.toBe(400);
        expect(result.body).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'checked',
                }),
            ])
        );
        expect(result.body).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'content',
                }),
            ])
        );
        expect(result.body).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'listId',
                }),
            ])
        );
    });

    [
        { testValue: undefined, stringValue: 'undefined' },
        { testValue: null, stringValue: 'null' },
        { testValue: true, stringValue: 'true' },
        { testValue: false, stringValue: 'false' },
        { testValue: [], stringValue: 'array' },
        { testValue: {}, stringValue: 'object' },
        { testValue: '', stringValue: 'empty string' },
    ].forEach(v => {
        it(
            'PUT / should return 400 when content is ' + v.stringValue,
            async () => {
                const result = await request(app)
                    .put('/api/list-items/1')
                    .send({
                        content: v.testValue,
                    });

                expect(result.status).toBe(400);
                expect(result.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            field: 'content',
                        }),
                    ])
                );
            }
        );
    });

    [
        { testValue: undefined, stringValue: 'undefined' },
        { testValue: null, stringValue: 'null' },
        { testValue: [], stringValue: 'array' },
        { testValue: {}, stringValue: 'object' },
        { testValue: 'some string', stringValue: 'some string' },
        { testValue: '', stringValue: 'empty string' },
    ].forEach(v => {
        it(
            'PUT / should return 400 when checked is ' + v.stringValue,
            async () => {
                const result = await request(app)
                    .put('/api/list-items/1')
                    .send({
                        checked: v.testValue,
                    });

                expect(result.status).toBe(400);
                expect(result.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            field: 'checked',
                        }),
                    ])
                );
            }
        );
    });

    it('PUT / should return 400 when no listId is provided', async () => {
        const result = await request(app).put('/api/list-items/1');

        expect(result.status).toBe(400);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'listId',
                }),
            ])
        );
    });

    it('PUT / should not return 400 or error when content, checked and listId are valid', async () => {
        const result = await request(app)
            .put('/api/list-items/1')
            .send({
                checked: false,
                content: 'test content',
                listId: '123',
            });

        expect(result.status).not.toBe(400);
        expect(result.body).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'checked',
                }),
            ])
        );
        expect(result.body).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'content',
                }),
            ])
        );
        expect(result.body).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'listId',
                }),
            ])
        );
    });
});
