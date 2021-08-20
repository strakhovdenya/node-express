import express from 'express'
import UserController from './user.controller.js';
import { default as validatorUsersInputUpdate } from './validators/userInputValidatorUpdate.js'
import passport from 'passport';

const router = express.Router();
const userController = new UserController();

router.use(passport.authenticate('jwt', {session: false}));

router.get('/', userController.getAll);
router.get('/:id', userController.get);
router.delete('/', userController.delete);
router.patch('/', validatorUsersInputUpdate, userController.update);

export default router;