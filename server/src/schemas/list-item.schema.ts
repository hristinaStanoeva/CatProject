import Sequelize from 'sequelize';
import { BaseAttributes } from '../models/base-attributes.model';

export interface ListItemAttributes extends BaseAttributes {
    content: string;
    checked: boolean;
}

export interface ListItemInstance
    extends Sequelize.Instance<ListItemAttributes>,
        ListItemAttributes {}

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
                allowNull: false,
            },
        }
    );

    return ListItem;
};
