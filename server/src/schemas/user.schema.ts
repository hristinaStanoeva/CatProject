import Sequelize, {
    HasManyGetAssociationsMixin,
    HasManySetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin,
    HasManyHasAssociationMixin,
    HasManyHasAssociationsMixin,
    HasManyCountAssociationsMixin,
} from 'sequelize';
import { normalizeEmail, trim } from 'validator';
import { hash, compare } from 'bcrypt';
import { compose } from 'ramda';

import { BaseAttributes } from '../models/base-attributes.model';
import {
    ListInstance,
    ListAttributes,
    ListItemInstance,
    ListItemAttributes,
} from './';

// getLists: HasManyGetAssociationsMixin<ListInstance>;
// setLists: HasManySetAssociationsMixin<ListInstance, ListInstance['id']>;
// addList: HasManyAddAssociationMixin<ListInstance, ListInstance['id']>;
// addLists: HasManyAddAssociationsMixin<ListInstance, ListInstance['id']>;
// createList: HasManyCreateAssociationMixin<ListAttributes, ListInstance>;
// removeList: HasManyRemoveAssociationMixin<ListInstance, ListInstance['id']>;
// removeLists: HasManyRemoveAssociationsMixin<
//     ListInstance,
//     ListInstance['id']
// >;
// hasList: HasManyHasAssociationMixin<ListInstance, ListInstance['id']>;
// hasLists: HasManyHasAssociationsMixin<ListInstance, ListInstance['id']>;
// countLists: HasManyCountAssociationsMixin;

const getMethodName = Symbol('get' + 'list');
const modelName = 'list';
const enum methodName {
    get = 'get' + 'list',
}
interface Test<TInstance = any> {
    [methodName.get]: HasManyGetAssociationsMixin<TInstance>;
}
const test: Test = {
};

// Needed for instance methods
// https://gist.github.com/evfleet/810cc5f463f70c04e1ecb321ee30466e
// https://github.com/sequelize/sequelize/issues/9760
interface UserInstanceMethods {
    isPasswordValid: (password: string) => Promise<boolean>;
}

export interface UserAttributes extends BaseAttributes {
    email: string;
    password: string;
    image_url?: string;
}

interface UserModel extends Sequelize.Model<UserInstance, UserAttributes> {
    prototype?: UserInstanceMethods;
}

export interface UserInstance
    extends Sequelize.Instance<UserAttributes>,
        UserAttributes,
        UserInstanceMethods {
    getLists: HasManyGetAssociationsMixin<ListInstance>;
    setLists: HasManySetAssociationsMixin<ListInstance, ListInstance['id']>;
    addList: HasManyAddAssociationMixin<ListInstance, ListInstance['id']>;
    addLists: HasManyAddAssociationsMixin<ListInstance, ListInstance['id']>;
    createList: HasManyCreateAssociationMixin<ListAttributes, ListInstance>;
    removeList: HasManyRemoveAssociationMixin<ListInstance, ListInstance['id']>;
    removeLists: HasManyRemoveAssociationsMixin<
        ListInstance,
        ListInstance['id']
    >;
    hasList: HasManyHasAssociationMixin<ListInstance, ListInstance['id']>;
    hasLists: HasManyHasAssociationsMixin<ListInstance, ListInstance['id']>;
    countLists: HasManyCountAssociationsMixin;

    getListItems: HasManyGetAssociationsMixin<ListItemInstance>;
    setListItems: HasManySetAssociationsMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    addListItem: HasManyAddAssociationMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    addListItems: HasManyAddAssociationsMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    createListItem: HasManyCreateAssociationMixin<
        ListItemAttributes,
        ListItemInstance
    >;
    removeListItem: HasManyRemoveAssociationMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    removeListItems: HasManyRemoveAssociationsMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    hasListItem: HasManyHasAssociationMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    hasListItems: HasManyHasAssociationsMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    countListItems: HasManyCountAssociationsMixin;
}

export const UserFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes
): UserModel => {
    const User: UserModel = sequelize.define<UserInstance, UserAttributes>(
        'user',
        {
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING(60),
                allowNull: false,
                validate: {
                    len: [8, 50],
                    isAscii: true,
                },
            },
            image_url: {
                type: DataTypes.STRING,
                validate: {
                    isUrl: true,
                },
            },
        }
    );

    User.associate = models => {
        // foreign key value has to match fk value in list schema association
        // https://github.com/sequelize/sequelize/issues/6997
        User.hasMany(models.List, {
            as: 'list',
            foreignKey: {
                name: 'author_id',
                allowNull: false,
            },
        });

        User.hasMany(models.ListItem, {
            as: 'listItem',
            foreignKey: {
                name: 'author_id',
                allowNull: false,
            },
        });
    };

    User.beforeValidate(user => {
        user.email = compose(
            trim,
            normalizeEmail
        )(user.email);

        user.password = trim(user.password);
    });

    User.beforeCreate(async (user, options) => {
        user.email = normalizeEmail(user.email) as string;

        try {
            user.password = await hash(user.password, 12);
        } catch (e) {
            console.error('Hashing failed. Pls handle error');
        }
    });

    User.prototype.isPasswordValid = function(password: string) {
        return compare(password, this.password);
    };

    return User;
};
