import { toString } from 'ramda';
import { createList } from '../../../src/core/entities/list';

describe('core', () => {
    describe('entities', () => {
        describe('list', () => {
            it('should throw when title is null or undefined', () => {
                expect(() =>
                    createList({
                        title: null,
                        author: {
                            email: 'test@mail.com',
                            password: '123456798',
                        },
                    })
                ).toThrow('List title has to be non empty string');
            });

            // it('should throw if author is not provided', () => {
            //     expect(() => createList({ title: 'Title' } as any)).toThrow(
            //         'Invalid author'
            //     );
            // });
        });
    });
});
