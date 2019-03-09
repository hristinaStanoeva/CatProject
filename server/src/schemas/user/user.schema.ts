import Sequelize from 'sequelize';
import { normalizeEmail, trim } from 'validator';
import { hash, compare } from 'bcrypt';
import { compose } from 'ramda';

import { UserModel, UserInstance, UserAttributes } from './';

import {
    juxt,
    pipe,
    head,
    tail,
    toUpper,
    join,
    flip,
    concat,
    ap,
    map,
    sort,
    comparator,
    lt,
    unnest,
} from 'ramda';

const createMethodNames = (methodName: string): string[] => {
    const capitalize = pipe(
        juxt([
            pipe(
                head,
                toUpper
            ),
            tail,
        ]),
        join('')
    );
    const pluralize = flip(concat)('s');
    const appendString = flip(concat);
    const appendMethodName = pipe<string, string, (list: string) => string>(
        capitalize,
        appendString
    )(methodName);

    const commonMethods = ['add', 'remove', 'has'];
    const pluralMethods = ['get', 'set', 'count'];
    const singularMethods = ['create'];

    const common = ap(
        [
            pipe(
                appendMethodName,
                pluralize
            ),
            appendMethodName,
        ],
        commonMethods
    );
    const plural = map(
        pipe(
            appendMethodName,
            pluralize
        ),
        pluralMethods
    );
    const singular = map(appendMethodName, singularMethods);
    const sortAscending = sort(comparator(lt));
    return unnest([common, plural, singular]);
};

console.log(createMethodNames('list'));

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
