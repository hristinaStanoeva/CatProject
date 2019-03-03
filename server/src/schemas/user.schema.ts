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
import { hash } from 'bcrypt';
import { compose } from 'ramda';

import { BaseAttributes } from '../models/base-attributes.model';
import { ListInstance, ListAttributes } from './';

export interface UserAttributes extends BaseAttributes {
    email: string;
    password: string;
    image_url?: string;
}

export interface UserInstance
    extends Sequelize.Instance<UserAttributes>,
        UserAttributes {
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
}

export const UserFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes
): Sequelize.Model<UserInstance, UserAttributes> => {
    const User = sequelize.define<UserInstance, UserAttributes>('user', {
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
    });

    User.associate = models => {
        // foreign key value has to match fk value in list schema association
        User.hasMany(models.List, { foreignKey: 'author_id' });
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

    return User;
};
