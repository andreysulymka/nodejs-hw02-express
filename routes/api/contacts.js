const express = require('express');

const contactController = require("../../controllers/contacts");

const {addSchema} = require("../../schemas/contacts");

const {contactUpdateFavorite} = require("../../schemas/contacts")

const {validateRequestBody} = require("../../helpers");

const { validateBody } = require("../../decorators");

const { isValidId } = require("../../middlewares");

const {authenticate} = require("../../middlewares")

const router = express.Router();

router.use(authenticate);

router.get('/', contactController.getAll);

router.get('/:id', isValidId, contactController.getById);

router.post('/', validateBody(addSchema), contactController.createContact);

router.delete('/:id', isValidId, contactController.deleteById);

router.put('/:id', isValidId, validateRequestBody, validateBody(addSchema), contactController.updateContactsById);

router.patch("/:id/favorite", isValidId, validateRequestBody, validateBody(contactUpdateFavorite), contactController.updateStatusContact)

module.exports = router;