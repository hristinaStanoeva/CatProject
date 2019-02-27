import Sequelize from 'sequelize';
import { BaseAttributes } from '../models/base-attributes.model';

export interface ListAttributes extends BaseAttributes {
    title: string;
}

export interface ListInstance
    extends Sequelize.Instance<ListAttributes>,
        ListAttributes {}

export const ListFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes
): Sequelize.Model<ListInstance, ListAttributes> => {
    const List = sequelize.define<ListInstance, ListAttributes>('list', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return List;
};
