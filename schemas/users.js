const Joi = require("joi");

const userRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().required(),
  token: String
});

const userLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  token: String
});

module.exports = {
    userRegisterSchema,
    userLoginSchema
};