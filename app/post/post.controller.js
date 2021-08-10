import { default as PostsService2 } from './posts.serevice.js';

const postsService2 = new PostsService2();

export default class PostController {
    async getAll(req, res) {
        try {
            const response = await postsService2.getAll()
            res.end(JSON.stringify({ data: response }));
        } catch (error) {
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    async get(req, res) {
        try {
            const id = req.params.id;
            const response = await postsService2.get(id)
            res.end(JSON.stringify({ data: response }));
        } catch (error) {
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    async delete(req, res) {
        try {
            const id = req.body.id;
            const response = await postsService2.delete(id)
            res.end(JSON.stringify({ data: response }));
        } catch (error) {
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    async create(req, res) {
        try {
            const entity = req.body;
            const response = await postsService2.create(entity)
            res.end(JSON.stringify({ data: response }));
        } catch (error) {
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    async update(req, res) {
        try {
            const entity = req.body;
            const response = await postsService2.update(entity)
            res.end(JSON.stringify({ data: response }));
        } catch (error) {
            res.end(JSON.stringify({ error: error.message }));
        }
    }
}