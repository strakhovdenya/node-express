import sequelizeObj from 'sequelize';
const { DataTypes } = sequelizeObj;

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export default function postModel (sequelize) {
    sequelize.define('post', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        text: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                // We require usernames to have length of at least 3, and
                // only use letters, numbers and underscores.
                is: /^\w{3,}$/
            }
        },
        userId: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    });
}