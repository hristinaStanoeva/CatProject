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

    getList_items: HasManyGetAssociationsMixin<ListItemInstance>;
    setList_items: HasManySetAssociationsMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    addList_item: HasManyAddAssociationMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    addList_items: HasManyAddAssociationsMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    createList_item: HasManyCreateAssociationMixin<
        ListItemAttributes,
        ListItemInstance
    >;
    removeList_item: HasManyRemoveAssociationMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    removeList_items: HasManyRemoveAssociationsMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    hasList_item: HasManyHasAssociationMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    hasList_items: HasManyHasAssociationsMixin<
        ListItemInstance,
        ListItemInstance['id']
    >;
    countList_items: HasManyCountAssociationsMixin;
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
            foreignKey: 'list_id',
        });
    };

    return List;
};
