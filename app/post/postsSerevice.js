import PostModel from './postModel.js';
import UserModel from '../user/userModel.js';

const postModel = new PostModel();

export default class PostsService {
    getAll() {
        return postModel.get();
    }

    get(id) {
        return postModel.get(id);
    }

    delete(id) {
        return postModel.delete(id);
    }

    async create(entityData) {
        const userModel = new UserModel();
        const user = await userModel.get(entityData.userId);
        if (user.length === 0) {
            throw new Error(`user with id: ${entityData.userId} is absent`);
        }

        return postModel.create(entityData);
    }

    async update(entityData) {
        const userModel = new UserModel();
        const user = await userModel.get(entityData.userId);
        if (user.length === 0) {
            throw new Error(`user with id: ${entityData.userId} is absent`);
        }
        
        return postModel.update(entityData);
    }
}