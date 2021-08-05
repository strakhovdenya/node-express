import UserModel from './userModel.js';
import PostModel from '../post/postModel.js';

const userModule = new UserModel();

export default class UsersService {

    getAll() {
        return userModule.get();
    }

    get(id) {
        return userModule.get(id);
    }

    async delete(id) {
        const postModel = new PostModel();
        const posts = await postModel.get();
        const userPosts = posts.filter(el => el.userId === id);
        if (userPosts.length !== 0) {
            throw new Error(`user with id: ${id} have ${userPosts.length} posts`);
        }

        return userModule.delete(id);
    }

    create(entityData) {
        return userModule.create(entityData);
    }

    update(entityData) {
        return userModule.update(entityData);
    }
}