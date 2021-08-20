import AuthService from './auth.servise.js';
import {getResponseDto} from '../../libs/response.dto.js';

const authService = new AuthService();


export default class AuthController {
    async login(req, res) {

        const resDto = getResponseDto();

        await authService.login(req.body, resDto);

        res.status(resDto.getStatus()).end(JSON.stringify(resDto.getResponse()));
    }

    async register(req, res) {

            const resDto = getResponseDto();

            await authService.register(req.body, resDto);

            res.status(resDto.getStatus()).end(JSON.stringify(resDto.getResponse()));
    }

    async logout(req, res) {
        const resDto = getResponseDto();

        await authService.logout(req.user, resDto);

        res.status(resDto.getStatus()).end(JSON.stringify(resDto.getResponse()));
    }



    async refreshToken(req, res) {
        const resDto = getResponseDto();

        await authService.refreshToken(req.body, resDto);

        res.status(resDto.getStatus()).end(JSON.stringify(resDto.getResponse()));
    }


}