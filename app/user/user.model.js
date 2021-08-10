
import sequelizeObj from 'sequelize';
const { DataTypes } = sequelizeObj;

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export default function userModel(sequelize) {
    sequelize.define(
        'user',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    is: /^\w{3,}$/
                }
            },
            age: {
                allowNull: false,
                type: DataTypes.INTEGER,
                validate: {
                    is: /^\d+$/
                }
            },
        },
        {
            timestamps: false, createdAt: false, updatedAt: false,
        });
}