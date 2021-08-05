import UsersService from './usersServise.js';

const usersService = new UsersService();

export default class UserController {
    async getAll(req, res) {
        try {
            const response = await usersService.getAll()
            res.end(JSON.stringify({ data: response }));
        } catch (error) {
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    async get(req, res) {
        try {
            const id = req.params.id;
            const response = await usersService.get(id)
            res.end(JSON.stringify({ data: response }));
        } catch (error) {
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    async delete(req, res) {
        try {
            const id = req.body.id;
            const response = await usersService.delete(id)
            res.end(JSON.stringify({ data: response }));
        } catch (error) {
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    async create(req, res) {
        try {
            const entity = req.body;
            const response = await usersService.create(entity)
            res.end(JSON.stringify({ data: response }));
        } catch (error) {
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    async update(req, res) {
        try {
            const entity = req.body;
            const response = await usersService.update(entity)
            res.end(JSON.stringify({ data: response }));
        } catch (error) {
            res.end(JSON.stringify({ error: error.message }));
        }
    }
}