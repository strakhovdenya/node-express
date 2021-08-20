import AuthService from './auth.servise.js';
import {getResponseDto} from '../../libs/response.dto.js';

const authService = new AuthService();


export default class AuthController {
    async login(req, res) {

        const resDto = getResponseDto();

        await authService.login(resDto);

        res.status(resDto.getStatus()).end(JSON.stringify(resDto.getResponse()));
    }

    async register(req, res) {

            const resDto = getResponseDto();

            await authService.register(resDto);

            res.status(resDto.getStatus()).end(JSON.stringify(resDto.getResponse()));
    }

    async logout(req, res) {
        try {
            const id = req.params.id;
            const response = await postsService2.get(id)
            res.end(JSON.stringify({data: response}));
        } catch (error) {
            res.end(JSON.stringify({error: error.message}));
        }
    }



    async refreshToken(req, res) {
        try {
            const id = req.body.id;
            const response = await postsService2.delete(id)
            res.end(JSON.stringify({data: response}));
        } catch (error) {
            res.end(JSON.stringify({error: error.message}));
        }
    }


}