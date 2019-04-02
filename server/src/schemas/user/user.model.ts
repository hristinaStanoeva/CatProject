// import Sequelize, {
//     HasManyGetAssociationsMixin,
//     HasManySetAssociationsMixin,
//     HasManyAddAssociationMixin,
//     HasManyAddAssociationsMixin,
//     HasManyCreateAssociationMixin,
//     HasManyRemoveAssociationMixin,
//     HasManyRemoveAssociationsMixin,
//     HasManyHasAssociationMixin,
//     HasManyHasAssociationsMixin,
//     HasManyCountAssociationsMixin,
// } from 'sequelize';
//
// import { BaseAttributes } from '../../models';
// import { ListInstance, ListAttributes } from '../list';
// import { ListItemInstance, ListItemAttributes } from '../';
//
// // Needed for instance methods
// // https://gist.github.com/evfleet/810cc5f463f70c04e1ecb321ee30466e
// // https://github.com/sequelize/sequelize/issues/9760
// interface UserInstanceMethods {
//     isPasswordValid: (password: string) => Promise<boolean>;
// }
//
// export interface UserAttributes extends BaseAttributes {
//     email: string;
//     password: string;
//     image_url?: string;
// }
//
// export interface UserModel
//     extends Sequelize.Model<UserInstance, UserAttributes> {
//     prototype?: UserInstanceMethods;
// }
//
// export interface UserInstance
//     extends Sequelize.Instance<UserAttributes>,
//         UserAttributes,
//         UserInstanceMethods {
//     getLists: HasManyGetAssociationsMixin<ListInstance>;
//     setLists: HasManySetAssociationsMixin<ListInstance, ListInstance['id']>;
//     addList: HasManyAddAssociationMixin<ListInstance, ListInstance['id']>;
//     addLists: HasManyAddAssociationsMixin<ListInstance, ListInstance['id']>;
//     createList: HasManyCreateAssociationMixin<ListAttributes, ListInstance>;
//     removeList: HasManyRemoveAssociationMixin<ListInstance, ListInstance['id']>;
//     removeLists: HasManyRemoveAssociationsMixin<
//         ListInstance,
//         ListInstance['id']
//     >;
//     hasList: HasManyHasAssociationMixin<ListInstance, ListInstance['id']>;
//     hasLists: HasManyHasAssociationsMixin<ListInstance, ListInstance['id']>;
//     countLists: HasManyCountAssociationsMixin;
//
//     getListItems: HasManyGetAssociationsMixin<ListItemInstance>;
//     setListItems: HasManySetAssociationsMixin<
//         ListItemInstance,
//         ListItemInstance['id']
//     >;
//     addListItem: HasManyAddAssociationMixin<
//         ListItemInstance,
//         ListItemInstance['id']
//     >;
//     addListItems: HasManyAddAssociationsMixin<
//         ListItemInstance,
//         ListItemInstance['id']
//     >;
//     createListItem: HasManyCreateAssociationMixin<
//         ListItemAttributes,
//         ListItemInstance
//     >;
//     removeListItem: HasManyRemoveAssociationMixin<
//         ListItemInstance,
//         ListItemInstance['id']
//     >;
//     removeListItems: HasManyRemoveAssociationsMixin<
//         ListItemInstance,
//         ListItemInstance['id']
//     >;
//     hasListItem: HasManyHasAssociationMixin<
//         ListItemInstance,
//         ListItemInstance['id']
//     >;
//     hasListItems: HasManyHasAssociationsMixin<
//         ListItemInstance,
//         ListItemInstance['id']
//     >;
//     countListItems: HasManyCountAssociationsMixin;
// }
