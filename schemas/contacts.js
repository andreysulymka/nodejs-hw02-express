const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().required().messages({
       "any.required": `missing required {#label} field`
  }),
    email: Joi.string().required().messages({
       "any.required": `missing required {#label} field`
  }),
    phone: Joi.string().required().messages({
       "any.required": `missing required {#label} field`
  }),
}).unknown(true);

module.exports = addSchema;