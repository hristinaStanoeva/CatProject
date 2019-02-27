import Sequelize from 'sequelize';
import { UserInstance, UserAttributes, UserFactory } from '../schemas/user.schema';

export interface Db {
    sequelize: Sequelize.Sequelize;
    Sequelize: Sequelize.SequelizeStatic;
    User: Sequelize.Model<UserInstance, UserAttributes>;
}

const sequelize = new Sequelize(process.env.DB_URL, {
    operatorsAliases: false,
});

export const db: Db = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize)
};
