const Joi = require("joi");

const userRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  });

const userLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const userEmailSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = {
    userRegisterSchema,
    userLoginSchema, 
    userEmailSchema
};