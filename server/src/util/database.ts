import Sequelize from 'sequelize';
import {
    UserInstance,
    UserAttributes,
    UserFactory,
    ListInstance,
    ListAttributes,
    ListFactory,
    ListItemInstance,
    ListItemAttributes,
    ListItemFactory,
} from '../schemas';

export interface Db {
    sequelize: Sequelize.Sequelize;
    Sequelize: Sequelize.SequelizeStatic;
    User: Sequelize.Model<UserInstance, UserAttributes>;
    List: Sequelize.Model<ListInstance, ListAttributes>;
    ListItem: Sequelize.Model<ListItemInstance, ListItemAttributes>;
}

const sequelize = new Sequelize(process.env.DB_URL, {
    operatorsAliases: false,
    logging: false,
    define: { underscored: true },
});

const dbConstruct: Db = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize),
    List: ListFactory(sequelize, Sequelize),
    ListItem: ListItemFactory(sequelize, Sequelize),
};

Object.keys(dbConstruct).forEach(modelName => {
    if (dbConstruct[modelName].associate) {
        dbConstruct[modelName].associate(dbConstruct);
    }
});

export const db = dbConstruct;
