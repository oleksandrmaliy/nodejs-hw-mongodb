import Joi from 'joi';

export const postContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'name should be a string',
    'string.min': 'name should have at least {#limit} characters',
    'string.max': 'name should have at most {#limit} characters',
    'any.required': 'name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'phoneNumber should be a string',
    'string.min': 'phoneNumber should have at least {#limit} characters',
    'string.max': 'phoneNumber should have at most {#limit} characters',
    'any.required': 'phoneNumber is required',
  }),
  email: Joi.string().min(3).max(20).messages({
    'string.base': 'email should be a string',
    'string.min': 'email should have at least {#limit} characters',
    'string.max': 'email should have at most {#limit} characters',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite should be a boolean: true or false',
  }),
  contactType: Joi.string().valid('personal', 'work', 'home').messages({
    'string.base': 'contactType should be a string',
    'any.only': 'contactType should be one of personal, work or home',
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'name should be a string',
    'string.min': 'name should have at least {#limit} characters',
    'string.max': 'name should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'phoneNumber should be a string',
    'string.min': 'phoneNumber should have at least {#limit} characters',
    'string.max': 'phoneNumber should have at most {#limit} characters',
  }),
  email: Joi.string().min(3).max(20).messages({
    'string.base': 'email should be a string',
    'string.min': 'email should have at least {#limit} characters',
    'string.max': 'email should have at most {#limit} characters',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite should be a boolean: true or false',
  }),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('personal', 'work', 'home')
    .messages({
      'string.base': 'contactType should be a string',
      'string.min': 'contactType should have at least {#limit} characters',
      'string.max': 'contactType should have at most {#limit} characters',
      'any.only': 'contactType should be one of personal, work or home',
    }),
});
