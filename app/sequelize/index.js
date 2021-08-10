import { Sequelize } from 'sequelize';
import userModel from '../user/user.model.js';
import postModel from '../post/post.model.js';
import { applyRelationship } from './relationship.js';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE,/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const modelDefiners = [
    userModel,
    postModel,
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

export async function sequelizeInit() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

applyRelationship(sequelize);

export default sequelize;
