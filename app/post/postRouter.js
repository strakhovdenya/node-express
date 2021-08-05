import express from 'express'
import PostController from './postController.js';

const router = express.Router();
const postController = new PostController();

router.get('/', postController.getAll);
router.get('/:id', postController.get);
router.delete('/', postController.delete);
router.put('/', postController.create);
router.patch('/', postController.update);

export default router;