import Sequelize from 'sequelize';
import { BaseAttributes } from '../models/base-attributes.model';

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
    const User = sequelize.define<UserInstance, UserAttributes>('user', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                isCorrectLength(value: string) {
                    if (value.length !== 60) {
                        throw new Error(
                            'Password hash has to be exactly 60 characters'
                        );
                    }
                },
            },
        },
        imageUrl: {
            type: DataTypes.STRING,
        },
    });

    return User;
};
