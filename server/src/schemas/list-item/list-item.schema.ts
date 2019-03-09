import Sequelize from 'sequelize';

import { BaseAttributes } from '../../models/base-attributes.model';

import { ListItemInstance, ListItemAttributes } from './';

export const ListItemFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes
): Sequelize.Model<ListItemInstance, ListItemAttributes> => {
    const ListItem = sequelize.define<ListItemInstance, ListItemAttributes>(
        'list_item',
        {
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            checked: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
        }
    );

    ListItem.associate = models => {
        ListItem.belongsTo(models.List, {
            as: 'list',
            foreignKey: {
                name: 'list_id',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });

        ListItem.belongsTo(models.User, {
            as: 'author',
            foreignKey: {
                name: 'author_id',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });
    };

    return ListItem;
};
