import Sequelize, {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin,
} from 'sequelize';
import { BaseAttributes } from '../models/base-attributes.model';
import { UserInstance, UserAttributes } from './';

export interface ListAttributes extends BaseAttributes {
    title: string;
    author?: UserAttributes | UserAttributes['id'];
}

export interface ListInstance
    extends Sequelize.Instance<ListAttributes>,
        ListAttributes {
    getAuthor: BelongsToGetAssociationMixin<UserInstance>;
    setAuthor: BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
    createAuthor: BelongsToCreateAssociationMixin<UserAttributes, UserInstance>;
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
        List.belongsTo(models.User, {
            as: 'author',
            foreignKey: {
                name: 'author_id',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });
    };

    return List;
};
