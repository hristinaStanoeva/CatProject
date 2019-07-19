import { createListItem } from '../../../src/core/entities/list-item';
describe('core', () => {
    describe('entities', () => {
        describe('createListItem', () => {
            it('should throw if id is null or undefined', () => {
                expect(() =>
                    createListItem({
                        id: undefined,
                        content: 'Content',
                        checked: false,
                        listId: 1,
                        authorId: 1,
                    })
                ).toThrow('Core -> List item: Id has to be a positive number');

                expect(() =>
                    createListItem({
                        id: null,
                        content: 'Content',
                        checked: false,
                        listId: 1,
                        authorId: 1,
                    })
                ).toThrow('Core -> List item: Id has to be a positive number');
            });

            it('should throw if id is not positive number', () => {
                expect(() =>
                    createListItem({
                        id: -1,
                        content: 'Content',
                        checked: false,
                        listId: 1,
                        authorId: 1,
                    })
                ).toThrow('Core -> List item: Id has to be a positive number');
            });

            it('should throw if content is null or undefined', () => {
                expect(() =>
                    createListItem({
                        id: 1,
                        content: undefined,
                        checked: false,
                        listId: 1,
                        authorId: 1,
                    })
                ).toThrow(
                    'Core -> List item: Content has to be a string with some value'
                );

                expect(() =>
                    createListItem({
                        id: 1,
                        content: null,
                        checked: false,
                        listId: 1,
                        authorId: 1,
                    })
                ).toThrow(
                    'Core -> List item: Content has to be a string with some value'
                );
            });

            it('should throw if content is empty string', () => {
                expect(() =>
                    createListItem({
                        id: 1,
                        content: '',
                        checked: false,
                        listId: 1,
                        authorId: 1,
                    })
                ).toThrow(
                    'Core -> List item: Content has to be a string with some value'
                );
            });

            it('should throw if checked is null', () => {
                expect(() =>
                    createListItem({
                        id: 1,
                        content: 'Content',
                        checked: null,
                        listId: 1,
                        authorId: 1,
                    })
                ).toThrow('Core -> List item: Checked has to be true or false');
            });

            it('should throw if list id is null or undefined', () => {
                expect(() =>
                    createListItem({
                        id: 1,
                        content: 'Content',
                        listId: undefined,
                        authorId: 1,
                    })
                ).toThrow(
                    'Core -> List item: List id has to be a positive number'
                );

                expect(() =>
                    createListItem({
                        id: 1,
                        content: 'Content',
                        listId: null,
                        authorId: 1,
                    })
                ).toThrow(
                    'Core -> List item: List id has to be a positive number'
                );
            });

            it('should throw if list id is not positive number', () => {
                expect(() =>
                    createListItem({
                        id: 1,
                        content: 'Content',
                        listId: -1,
                        authorId: 1,
                    })
                ).toThrow(
                    'Core -> List item: List id has to be a positive number'
                );
            });

            it('should throw if author id is null or undefined', () => {
                expect(() =>
                    createListItem({
                        id: 1,
                        content: 'Content',
                        listId: 1,
                        authorId: null,
                    })
                ).toThrow(
                    'Core -> List item: Author id has to be a positive number'
                );

                expect(() =>
                    createListItem({
                        id: 1,
                        content: 'Content',
                        listId: 1,
                        authorId: undefined,
                    })
                ).toThrow(
                    'Core -> List item: Author id has to be a positive number'
                );
            });

            it('should throw if author id is not positive number', () => {
                expect(() =>
                    createListItem({
                        id: 1,
                        content: 'Content',
                        listId: 1,
                        authorId: -1,
                    })
                ).toThrow(
                    'Core -> List item: Author id has to be a positive number'
                );
            });

            it('should return a list item object with provided valid inputs and default checked property', () => {
                expect(
                    createListItem({
                        id: 1,
                        content: 'Content',
                        listId: 1,
                        authorId: 1,
                    })
                ).toEqual({
                    id: 1,
                    content: 'Content',
                    checked: false,
                    listId: 1,
                    authorId: 1,
                });
            });

            it('should return a list item object with provided valid inputs and checked = true', () => {
                expect(
                    createListItem({
                        id: 1,
                        content: 'Content',
                        checked: true,
                        listId: 1,
                        authorId: 1,
                    })
                ).toEqual({
                    id: 1,
                    content: 'Content',
                    checked: true,
                    listId: 1,
                    authorId: 1,
                });
            });
        });
    });
});
