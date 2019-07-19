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
                ).toThrow('List id has to be a positive number');

                expect(() =>
                    createList({
                        id: null,
                        title: 'some title',
                        authorId: 1,
                    })
                ).toThrow('List id has to be a positive number');
            });

            it('should throw when id is not positive', () => {
                expect(() =>
                    createList({
                        id: -1,
                        title: 'some title',
                        authorId: 1,
                    })
                ).toThrow('List id has to be a positive number');
            });

            it('should throw when title is null or undefined', () => {
                expect(() =>
                    createList({
                        id: 1,
                        title: null,
                        authorId: 1,
                    })
                ).toThrow('List title has to be non empty string');
            });

            it('should throw when title is empty string', () => {
                expect(() =>
                    createList({
                        id: 1,
                        title: '',
                        authorId: 1,
                    })
                ).toThrow('List title has to be non empty string');
            });

            it('should throw if author id is null or undefined', () => {
                expect(() =>
                    createList({
                        id: 1,
                        title: 'Title',
                        authorId: undefined,
                    })
                ).toThrow('A list has to have a positive author id');

                expect(() =>
                    createList({
                        id: 1,
                        title: 'Title',
                        authorId: null,
                    })
                ).toThrow('A list has to have a positive author id');
            });

            it('should throw when author id is not positive number', () => {
                expect(() =>
                    createList({
                        id: 1,
                        title: 'Title',
                        authorId: -1,
                    })
                ).toThrow('A list has to have a positive author id');
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
