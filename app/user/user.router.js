import express from 'express'
import UserController from './user.controller.js';
import { default as validatorUsersInputCreate } from './validators/userInputValidatorCreate.js'
import { default as validatorUsersInputUpdate } from './validators/userInputValidatorUpdate.js'

const router = express.Router();
const userController = new UserController();


router.get('/', userController.getAll);
router.get('/:id', userController.get);
router.delete('/', userController.delete);
router.put('/', validatorUsersInputCreate, userController.create);
router.patch('/', validatorUsersInputUpdate, userController.update);

export default router;