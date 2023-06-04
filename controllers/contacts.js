const Contact = require("../models/contact")

const {HttpError} = require("../helpers");

const { ctrlWrapper } = require("../decorators");

const getAll = async (req, res, next) => {
        const result = await Contact.find({}, "-createdAt -updatedAt");
        res.json(result)
    };

const getById = async (req, res, next) => {
        const { id } = req.params;
        const result = await Contact.findById(id);
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.json(result)
    };

const createContact = async (req, res, next) => {
        const result = await Contact.create(req.body);
        res.status(201).json(result)
    };

const deleteById = async (req, res, next) => {
        const { id } = req.params;
        const result = await Contact.findByIdAndDelete(id);
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.json({
            message: "Delete success"
        })
    };

const updateContactsById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
     throw HttpError(404, "Not found")
    }
    res.json(result)
}
  
const updateStatusContact = async (req, res, next) => {
     const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
     throw HttpError(404, "Not found")
    }
    res.json(result)
}
  

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    createContact: ctrlWrapper(createContact),
    deleteById: ctrlWrapper(deleteById),
    updateContactsById: ctrlWrapper(updateContactsById),
    updateStatusContact: ctrlWrapper(updateStatusContact)
}