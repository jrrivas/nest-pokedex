import * as Joi from 'joi';

export const JavaValidationSchema=Joi.object({
    MONGODB:Joi.required(),//localhost:27017/nest-pokemon
    PORT:Joi.number().default(3005),
    DEFAULT_LIMIT:Joi.number().default(6)

}) 