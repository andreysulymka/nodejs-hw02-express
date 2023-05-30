const express = require('express');

const contactController = require("../../controllers/contacts");

const addSchema = require("../../schemas/contacts");

const {validateRequestBody} = require("../../helpers");

const {validateBody} = require("../../decorators")

const router = express.Router();


router.get('/', contactController.getAll);

router.get('/:id', contactController.getById);

router.post('/', validateBody(addSchema), contactController.createContact);

router.delete('/:id', contactController.deleteById);

router.put('/:id',validateRequestBody, validateBody(addSchema), contactController.updateContactsById);

module.exports = router;