import express from 'express'
import PostController from './post.controller.js';
import { default as validatorPostsInputCreate } from './validators/postInputValidatorCreate.js'
import { default as validatorPostsInputUpdate } from './validators/postInputValidatorUpdate.js'

const router = express.Router();
const postController = new PostController();

router.get('/', postController.getAll);
router.get('/:id', postController.get);
router.delete('/', postController.delete);
router.put('/', validatorPostsInputCreate, postController.create);
router.patch('/', validatorPostsInputUpdate, postController.update);

export default router;