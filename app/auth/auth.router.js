import express from 'express'
import AuthController from './auth.controller.js';
import {default as registerUserValidator} from './validators/registerUserValidator.js'
import {default as refreshTokenValidator} from './validators/refreshTokenValidator.js'
import {default as loginUserValidator} from './validators/loginUserValidator.js'

const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/logout', loginUserValidator, authController.logout);
router.post('/register', registerUserValidator, authController.register);
router.post('/refresh-tokens', refreshTokenValidator, authController.refreshToken);

export default router;