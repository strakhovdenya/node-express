import sequelizeObj from 'sequelize';
const { DataTypes } = sequelizeObj;

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export default function postModel(sequelize) {
    sequelize.define(
        'post',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING
            },
            text: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    is: /^\w{3,}$/
                }
            },
            userId: {
                allowNull: false,
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false, createdAt: false, updatedAt: false
        }
    );
}