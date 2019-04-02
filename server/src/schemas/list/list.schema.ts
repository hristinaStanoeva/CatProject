// import Sequelize from 'sequelize';
// import { ListInstance, ListAttributes } from './';
//
// export const ListFactory = (
//     sequelize: Sequelize.Sequelize,
//     DataTypes: Sequelize.DataTypes
// ): Sequelize.Model<ListInstance, ListAttributes> => {
//     const List = sequelize.define<ListInstance, ListAttributes>('list', {
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     });
//
//     List.associate = models => {
//         List.belongsTo(models.User, {
//             as: 'author',
//             foreignKey: {
//                 name: 'author_id',
//                 allowNull: false,
//             },
//             onDelete: 'CASCADE',
//         });
//
//         List.hasMany(models.ListItem, {
//             as: 'listItem',
//             foreignKey: {
//                 name: 'list_id',
//                 allowNull: false,
//             },
//         });
//     };
//
//     return List;
// };
