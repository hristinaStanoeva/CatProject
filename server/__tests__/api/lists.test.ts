import request from 'supertest';
import app from '../../src/app';

xdescribe('/api/lists', () => {
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
            'POST / should return 400 when title is ' + v.stringValue,
            async () => {
                const result = await request(app)
                    .post('/api/lists')
                    .send({
                        title: v.testValue,
                    });

                expect(result.status).toBe(400);
                expect(result.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            field: 'title',
                        }),
                    ])
                );
            }
        );
    });

    it('POST / should not return 400 or error when title is valid', async () => {
        const result = await request(app)
            .post('/api/lists')
            .send({
                title: 'valid',
            });

        expect(result.status).not.toBe(400);
        expect(result.body).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'title',
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
            'PUT / should return 400 when title is ' + v.stringValue,
            async () => {
                const result = await request(app)
                    .put('/api/lists/1')
                    .send({
                        title: v.testValue,
                    });

                expect(result.status).toBe(400);
                expect(result.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            field: 'title',
                        }),
                    ])
                );
            }
        );
    });

    it('PUT / should not return 400 or error when title is valid', async () => {
        const result = await request(app)
            .put('/api/lists/1')
            .send({
                title: 'valid',
            });

        expect(result.status).not.toBe(400);
        expect(result.body).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'title',
                }),
            ])
        );
    });
});
