const express = require('express');

const contactController = require("../../controllers/contacts");

const schema = require("../../schemas/contacts");

const {validateBody} = require("../../decorators")

const router = express.Router();


router.get('/', contactController.getAll);

router.get('/:id', contactController.getById);

router.post('/', validateBody(schema.addSchema), contactController.createContact);

router.delete('/:id', contactController.deleteById);

router.put('/:id', validateBody(schema.addSchema), contactController.updateContactsById);

module.exports = router;