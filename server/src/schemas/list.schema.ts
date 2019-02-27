import Sequelize from 'sequelize';
import { BaseAttributes } from '../models/base-attributes.model';
import { UserInstance } from './';

export interface ListAttributes extends BaseAttributes {
    title: string;
}

export interface ListInstance
    extends Sequelize.Instance<ListAttributes>,
    ListAttributes {
        getAuthor: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
        setAuthor: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
    }

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

    List.associate = models => {
        List.belongsTo(models.User, { as: 'author', foreignKey: 'createdBy' });
    };

    return List;
};
