import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator()

const querySchema = Joi.object({
    text: Joi.string().min(3).required(),
    userId: Joi.string().required()
})

export default validator.body(querySchema);