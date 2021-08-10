import PostModel from '../post/postModel.js';
import db from '../sequelize/index.js';
import { v4 as uuidv4 } from 'uuid';


export default class UsersService {

    getAll() {
        return db.models.user.findAll();
    }

    get(id) {
        return db.models.user.findByPk(id);
    }

    async delete(id) {
        const postModel = new PostModel();
        const posts = await postModel.get();
        const userPosts = posts.filter(el => el.userId === id);
        if (userPosts.length !== 0) {
            throw new Error(`user with id: ${id} have ${userPosts.length} users`);
        }

        await db.models.user.destroy({
            where: {
                id: id
            }
        });
        
        return `record with id ${id} is deleted`;
    }

    create(entityData) {
        entityData.id = uuidv4();
        return db.models.user.create(entityData);
    }

    async update(entityData) {

        const userForUpdate = await db.models.user.findByPk(entityData.id);
        if (!userForUpdate){
            throw new Error(`record with id ${entityData.id} is absent in users`);
        }
        console.log(userForUpdate);
        await db.models.user.update(entityData, {
            where: {
                id: entityData.id
            }
        });

        return entityData
    }
}