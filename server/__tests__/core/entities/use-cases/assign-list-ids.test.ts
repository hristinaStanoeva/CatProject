import { makeAssignListIds } from '../../../../src/core/use-cases/user/lists/assign-list-ids';
import { AssignListIdsAdapter } from '../../../../src/core/use-cases/data-access.model';
import { User, makeUser } from '../../../../src/core/entities/user';

const sampleUser: User = {
    id: 1,
    email: 'some@mail.com',
    password: '1234567890',
    imageUrl: 'www.google.com',
    listIds: [],
    listItemIds: [],
};

describe('core', () => {
    describe('use cases', () => {
        describe('assignListIds', () => {
            // throw if invalid inputs
            // hit db
            // delegate user creation
            // return correct user
            it('should throw if ids are invalid', () => {
                const dataAccess: AssignListIdsAdapter = {
                    assignListIds: (listIds, user) =>
                        Promise.resolve({
                            ...user,
                            listIds,
                            random: 'field',
                        }),
                };

                expect(() =>
                    makeAssignListIds(makeUser)(dataAccess)([-1], sampleUser)
                ).toThrowError(
                    'Core -> Assign list ids: List ids has to be a list of unique positive numbers'
                );
            });

            it('should call db adapter if ids are valid', async () => {
                const dataAccess: AssignListIdsAdapter = {
                    assignListIds: jest.fn((listIds, user) =>
                        Promise.resolve({
                            ...user,
                            listIds,
                            random: 'field',
                        })
                    ),
                };

                await makeAssignListIds(makeUser)(dataAccess)([1], sampleUser);

                expect(dataAccess.assignListIds).toHaveBeenCalled();
            });

            it('should delegate creation of domain user if ids are valid', async () => {
                const userCreator = jest.fn(makeUser);
                const dataAccess: AssignListIdsAdapter = {
                    assignListIds: (listIds, user) =>
                        Promise.resolve({
                            ...user,
                            listIds,
                            random: 'field',
                        }),
                };

                await makeAssignListIds(userCreator)(dataAccess)(
                    [1],
                    sampleUser
                );

                expect(userCreator).toHaveBeenCalled();
            });

            it('should return a user with newly assigned list ids when inputs are valid', async () => {
                const dataAccess: AssignListIdsAdapter = {
                    assignListIds: (listIds, user) =>
                        Promise.resolve({
                            ...user,
                            listIds,
                            random: 'field',
                        }),
                };

                expect(
                    await makeAssignListIds(makeUser)(dataAccess)(
                        [1, 2, 6],
                        sampleUser
                    )
                ).toEqual({
                    id: 1,
                    email: 'some@mail.com',
                    password: '1234567890',
                    imageUrl: 'www.google.com',
                    listIds: [1, 2, 6],
                    listItemIds: [],
                });
            });
        });
    });
});
