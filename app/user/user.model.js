
import sequelizeObj from 'sequelize';
const { DataTypes } = sequelizeObj;

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export default function userModel (sequelize) {
    sequelize.define('user', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
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
                // We require usernames to have length of at least 3, and
                // only use letters, numbers and underscores.
                is: /^\w{3,}$/
            }
        },
        age: {
            allowNull: false,
            type: DataTypes.NUMBER,
            validate: {
                // We require usernames to have length of at least 3, and
                // only use letters, numbers and underscores.
                is: /^\d+$/
            }
        },
    });
};