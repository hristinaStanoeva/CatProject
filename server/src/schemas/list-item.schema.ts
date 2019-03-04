import Sequelize, {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin,
} from 'sequelize';
import { BaseAttributes } from '../models/base-attributes.model';
import { ListAttributes, ListInstance, UserInstance, UserAttributes } from './';

export interface ListItemAttributes extends BaseAttributes {
    content: string;
    checked: boolean;
    list?: ListAttributes | ListAttributes['id'];
    author?: UserAttributes | UserAttributes['id'];
}

export interface ListItemInstance
    extends Sequelize.Instance<ListItemAttributes>,
        ListItemAttributes {
    getList: BelongsToGetAssociationMixin<ListInstance>;
    setList: BelongsToSetAssociationMixin<ListInstance, ListInstance['id']>;
    createList: BelongsToCreateAssociationMixin<ListAttributes, ListInstance>;

    getAuthor: BelongsToGetAssociationMixin<UserInstance>;
    setAuthor: BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
    createAuthor: BelongsToCreateAssociationMixin<UserAttributes, UserInstance>;
}

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
