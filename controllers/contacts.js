const Joi = require("joi");

const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

const getAll = async (req, res, next) => {
            const result = await contacts.listContacts();
        res.json(result)
    };

const getById = async (req, res, next) => {
        const { id } = req.params;
        const result = await contacts.getContactById(id);
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.json(result)
    };

const createContact = async (req, res, next) => {
        const { error } = addSchema.validate(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }
    const result = await contacts.addContact(req.body);
        res.status(201).json(result)
    };

const deleteById = async (req, res, next) => {
        const { id } = req.params;
        const result = await contacts.removeContact(id);
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.json({
            message: "Delete success"
        })
    };

const updateContactsById = async (req, res, next) => {
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    };
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
     throw HttpError(404, "Not found")
    }
    const response = {
      message: "Your contact was updated",
      result: result
    };
    res.json(response)
  }
  

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    createContact: ctrlWrapper(createContact),
    deleteById: ctrlWrapper(deleteById),
    updateContactsById: ctrlWrapper(updateContactsById)
}