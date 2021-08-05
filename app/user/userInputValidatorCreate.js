import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator()

const querySchema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().required()
})

export default validator.body(querySchema);