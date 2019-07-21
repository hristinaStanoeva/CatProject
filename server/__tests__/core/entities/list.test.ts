import { toString } from 'ramda';
import { createList } from '../../../src/core/entities/list';

describe('core', () => {
    describe('entities', () => {
        describe('createList', () => {
            it('should throw when id is null', () => {
                expect(() =>
                    createList({
                        id: null,
                        title: 'some title',
                        authorId: 1,
                    })
                ).toThrow('Core -> List: Id has to be a positive number');
            });

            it('should throw when id is 0', () => {
                expect(() =>
                    createList({
                        id: 0,
                        title: 'some title',
                        authorId: 1,
                    })
                ).toThrow('Core -> List: Id has to be a positive number');
            });

            it('should throw when id is negative', () => {
                expect(() =>
                    createList({
                        id: -1,
                        title: 'some title',
                        authorId: 1,
                    })
                ).toThrow('Core -> List: Id has to be a positive number');
            });

            it('should throw when title is null', () => {
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

            it('should throw when author id is 0', () => {
                expect(() =>
                    createList({
                        id: 1,
                        title: 'Title',
                        authorId: 0,
                    })
                ).toThrow(
                    'Core -> List: Author id has to be a positive number'
                );
            });

            it('should throw when author id is negative number', () => {
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

            it('should throw when item ids is null', () => {
                expect(() =>
                    createList({
                        id: 1,
                        title: 'Title',
                        authorId: 1,
                        itemIds: null,
                    })
                ).toThrow(
                    'Core -> List: Item ids has to be a list of unique positive numbers'
                );
            });

            it('should throw when duplicated item ids are provided', () => {
                expect(() =>
                    createList({
                        id: 1,
                        title: 'Title',
                        authorId: 1,
                        itemIds: [1, 1],
                    })
                ).toThrow(
                    'Core -> List: Item ids has to be a list of unique positive numbers'
                );
            });

            it('should throw when item ids contains 0', () => {
                expect(() =>
                    createList({
                        id: 1,
                        title: 'Title',
                        authorId: 1,
                        itemIds: [1, 0],
                    })
                ).toThrow(
                    'Core -> List: Item ids has to be a list of unique positive numbers'
                );
            });

            it('should throw when item ids contains negative numbers', () => {
                expect(() =>
                    createList({
                        id: 1,
                        title: 'Title',
                        authorId: 1,
                        itemIds: [1, -1],
                    })
                ).toThrow(
                    'Core -> List: Item ids has to be a list of unique positive numbers'
                );
            });

            it('should return list object with provided id, title and authorId and all other fields are defaults', () => {
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

            it('should return list object with provided id, title, authorId and single item id', () => {
                expect(
                    createList({
                        id: 1,
                        title: 'Title',
                        authorId: 1,
                        itemIds: [1],
                    })
                ).toEqual({
                    id: 1,
                    title: 'Title',
                    authorId: 1,
                    itemIds: [1],
                });
            });

            it('should return list object with provided id, title, authorId and multiple item ids', () => {
                expect(
                    createList({
                        id: 1,
                        title: 'Title',
                        authorId: 1,
                        itemIds: [1, 2],
                    })
                ).toEqual({
                    id: 1,
                    title: 'Title',
                    authorId: 1,
                    itemIds: [1, 2],
                });
            });
        });
    });
});
