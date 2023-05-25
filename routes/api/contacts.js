const express = require('express');

const ctrl = require("../../controllers/contacts")

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', ctrl.createContact);

router.delete('/:id', ctrl.deleteById);

router.put('/:id', ctrl.updateContactsById);

module.exports = router