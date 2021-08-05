import express from 'express'
import UserController from './userController.js';

const router = express.Router();
const userController = new UserController();

router.get('/', userController.getAll);
router.get('/:id', userController.get);
router.delete('/', userController.delete);
router.put('/', userController.create);
router.patch('/', userController.update);

export default router;