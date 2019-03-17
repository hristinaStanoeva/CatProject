import Sequelize, {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin,
} from 'sequelize';

import { BaseAttributes } from '../../models';

import { ListAttributes, ListInstance } from '../list';
import { UserAttributes, UserInstance } from '../';

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
