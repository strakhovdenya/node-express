

export default class AuthController {
    async login(req, res) {
        try {
            const response = await postsService2.getAll()
            res.end(JSON.stringify({ data: response }));
        } catch (error) {
            res.status(401).end(JSON.stringify({ error: error.message }));
        }
    }

    async logout(req, res) {
        try {
            const id = req.params.id;
            const response = await postsService2.get(id)
            res.end(JSON.stringify({ data: response }));
        } catch (error) {
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    async register(req, res) {
        try {
            const id = req.params.id;
            const response = await postsService2.get(id)
            res.end(JSON.stringify({ data: response }));
        } catch (error) {
            res.status(401).end(JSON.stringify({ error: error.message }));
        }
    }

    async refreshTocken(req, res) {
        try {
            const id = req.body.id;
            const response = await postsService2.delete(id)
            res.end(JSON.stringify({ data: response }));
        } catch (error) {
            res.end(JSON.stringify({ error: error.message }));
        }
    }


}