import Sequelize from 'sequelize';

// if Sequelize is exported, the env variable is not set
// and gets an undefined variable.
export const sequelize = (url: string) =>
    new Sequelize(url, { operatorsAliases: false });
