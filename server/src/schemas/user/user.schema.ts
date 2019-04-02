// import Sequelize from 'sequelize';
// import { normalizeEmail, trim } from 'validator';
// import { hash, compare } from 'bcrypt';
// import { compose } from 'ramda';
//
// import { UserModel, UserInstance, UserAttributes } from './';
// import { ServerError } from '../../util/errors';
//
// export const UserFactory = (
//     sequelize: Sequelize.Sequelize,
//     DataTypes: Sequelize.DataTypes
// ): UserModel => {
//     const User: UserModel = sequelize.define<UserInstance, UserAttributes>(
//         'user',
//         {
//             email: {
//                 type: DataTypes.STRING,
//                 unique: true,
//                 allowNull: false,
//                 validate: {
//                     notEmpty: true,
//                     isEmail: true,
//                 },
//             },
//             password: {
//                 type: DataTypes.STRING(60),
//                 allowNull: false,
//                 validate: {
//                     len: [8, 50],
//                     isAscii: true,
//                 },
//             },
//             image_url: {
//                 type: DataTypes.STRING,
//                 validate: {
//                     isUrl: true,
//                 },
//             },
//         }
//     );
//
//     User.associate = models => {
//         // foreign key value has to match fk value in list schema association
//         // https://github.com/sequelize/sequelize/issues/6997
//         User.hasMany(models.List, {
//             as: 'list',
//             foreignKey: {
//                 name: 'author_id',
//                 allowNull: false,
//             },
//         });
//
//         User.hasMany(models.ListItem, {
//             as: 'listItem',
//             foreignKey: {
//                 name: 'author_id',
//                 allowNull: false,
//             },
//         });
//     };
//
//     User.beforeValidate(user => {
//         user.email = compose(
//             trim,
//             normalizeEmail
//         )(user.email);
//
//         user.password = trim(user.password);
//     });
//
//     User.beforeCreate(async (user, options) => {
//         user.email = normalizeEmail(user.email) as string;
//
//         try {
//             user.password = await hash(user.password, 12);
//         } catch (e) {
//             throw new ServerError(e);
//         }
//     });
//
//     User.prototype.isPasswordValid = async function(password: string) {
//         return await compare(password, this.password);
//     };
//
//     return User;
// };
