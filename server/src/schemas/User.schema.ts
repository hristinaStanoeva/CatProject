import Sequelize from 'sequelize';
import { BaseAttributes } from './Base.schema';
export interface UserAttributes extends BaseAttributes {
    email: string;
    password: string;
    imageUrl?: string;
}

export interface UserInstance
    extends Sequelize.Instance<UserAttributes>,
        UserAttributes {}

export const UserFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes
): Sequelize.Model<UserInstance, UserAttributes> => {

    const User = sequelize.define<UserInstance, UserAttributes>('User', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.CHAR(60),
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return User;
};
