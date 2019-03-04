import Sequelize, {
    HasManyGetAssociationsMixin,
    HasManySetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin,
    HasManyHasAssociationMixin,
    HasManyHasAssociationsMixin,
    HasManyCountAssociationsMixin,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin,
} from 'sequelize';
import { BaseAttributes } from '../models/base-attributes.model';
import {
    UserInstance,
    UserAttributes,
    ListItemInstance,
    ListItemAttributes,
} from './';

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

    getListItems: HasManyGetAssociationsMixin<ListItemInstance>;
    setListItems: HasManySetAssociationsMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    addListItem: HasManyAddAssociationMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    addListItems: HasManyAddAssociationsMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    createListItem: HasManyCreateAssociationMixin<
        ListItemAttributes,
        ListItemInstance
    >;
    removeListItem: HasManyRemoveAssociationMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    removeListItems: HasManyRemoveAssociationsMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    hasListItem: HasManyHasAssociationMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    hasListItems: HasManyHasAssociationsMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    countListItems: HasManyCountAssociationsMixin;
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

        List.hasMany(models.ListItem, {
            as: 'listItem',
            foreignKey: {
                name: 'list_id',
                allowNull: false,
            },
        });
    };

    return List;
};
