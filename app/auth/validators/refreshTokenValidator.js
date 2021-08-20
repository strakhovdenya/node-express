import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator()

const querySchema = Joi.object({
    refreshToken: Joi.string().required()
})

export default validator.body(querySchema);