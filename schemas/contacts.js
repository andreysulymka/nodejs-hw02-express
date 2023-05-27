const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required().messages({
       "any.required": `missing required {#label} field`
  }),
}).unknown(true);

module.exports = addSchema;