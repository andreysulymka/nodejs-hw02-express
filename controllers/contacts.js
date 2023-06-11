const Contact = require("../models/contact")

const {HttpError} = require("../helpers");

const { ctrlWrapper } = require("../decorators");
// const { query } = require("express");

const getAll = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, ...query } = req.query;
    const skip = (page - 1) * limit;
        const result = await Contact.find({owner, ...query}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "-createdAt -updatedAt");
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
    const {_id: owner} = req.user
        const result = await Contact.create({...req.body, owner});
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