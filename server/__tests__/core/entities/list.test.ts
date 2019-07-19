import { toString } from 'ramda';
import { createList } from '../../../src/core/entities/list';

describe('core', () => {
    describe('entities', () => {
        describe('createList', () => {
            it('should throw when id is null or undefined', () => {
                expect(() =>
                    createList({
                        id: undefined,
                        title: 'some title',
                        authorId: 1,
                    })
                ).toThrow('Core -> List: Id has to be a positive number');

                expect(() =>
                    createList({
                        id: null,
                        title: 'some title',
                        authorId: 1,
                    })
                ).toThrow('Core -> List: Id has to be a positive number');
            });

            it('should throw when id is not positive', () => {
                expect(() =>
                    createList({
                        id: -1,
                        title: 'some title',
                        authorId: 1,
                    })
                ).toThrow('Core -> List: Id has to be a positive number');
            });

            it('should throw when title is null or undefined', () => {
                expect(() =>
                    createList({
                        id: 1,
                        title: null,
                        authorId: 1,
                    })
                ).toThrow('Core -> List: Title has to be non empty string');
            });

            it('should throw when title is empty string', () => {
                expect(() =>
                    createList({
                        id: 1,
                        title: '',
                        authorId: 1,
                    })
                ).toThrow('Core -> List: Title has to be non empty string');
            });

            it('should throw if author id is null or undefined', () => {
                expect(() =>
                    createList({
                        id: 1,
                        title: 'Title',
                        authorId: undefined,
                    })
                ).toThrow(
                    'Core -> List: Author id has to be a positive number'
                );

                expect(() =>
                    createList({
                        id: 1,
                        title: 'Title',
                        authorId: null,
                    })
                ).toThrow(
                    'Core -> List: Author id has to be a positive number'
                );
            });

            it('should throw when author id is not positive number', () => {
                expect(() =>
                    createList({
                        id: 1,
                        title: 'Title',
                        authorId: -1,
                    })
                ).toThrow(
                    'Core -> List: Author id has to be a positive number'
                );
            });

            it('should return list object with provided id, title and authorId', () => {
                expect(
                    createList({
                        id: 1,
                        title: 'Title',
                        authorId: 1,
                    })
                ).toEqual({
                    id: 1,
                    title: 'Title',
                    authorId: 1,
                    itemIds: [],
                });
            });
        });
    });
});
