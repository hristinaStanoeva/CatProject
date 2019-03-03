import Sequelize from 'sequelize';
import { normalizeEmail, trim } from 'validator';
import { hash } from 'bcrypt';
import { compose } from 'ramda';

import { BaseAttributes } from '../models/base-attributes.model';

export interface UserAttributes extends BaseAttributes {
    email: string;
    password: string;
    image_url?: string;
}

export interface UserInstance
    extends Sequelize.Instance<UserAttributes>,
        UserAttributes {}

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

    User.beforeValidate(user => {
        user.email = compose(
            trim,
            normalizeEmail
        )(user.email);

        user.password = trim(user.password);
    });

    User.beforeCreate(async (user, options) => {
        user.email = normalizeEmail(user.email) as string;
        // // hash here pls
        try {
            user.password = await hash(user.password, 12);
        } catch (e) {
            console.error('Hashing failed. Pls handle error');
        }
    });

    return User;
};
