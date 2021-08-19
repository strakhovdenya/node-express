import db from '../../config/sequelize/index.js';
import { v4 as uuidv4 } from 'uuid';

export default class PostsService {
    getAll() {
        return db.models.post.findAll();
    }

    get(id) {
        return db.models.post.findByPk(id);
    }

    async delete(id) {
        await db.models.post.destroy({
            where: {
                id: id
            }
        });

        return `post with id ${id} is deleted`;
    }

    async create(entityData) {
        const user = await db.models.user.findByPk(entityData.userId);
        if (!user) {
            throw new Error(`user with id: ${entityData.userId} is absent`);
        }
        entityData.id = uuidv4();
        return db.models.post.create(entityData);
    }

    async update(entityData) {
        const user = await db.models.user.findByPk(entityData.userId);
        if (!user) {
            throw new Error(`user with id ${entityData.userId} is absent in users`);
        }

        await db.models.post.update(entityData, {
            where: {
                id: entityData.id
            }
        });

        return entityData;
    }
}