const express = require('express');
const router = express.Router()
const authorCtrl = require('../controller/author')


router.post('/', authorCtrl.addAuthor);

router.get('/', authorCtrl.getAllAuthor);

router.get('/:id', authorCtrl.getOneAuthor);

router.put('/:id', authorCtrl.editAuthor);

router.delete('/:id', authorCtrl.deleteAuthor);

module.exports = router;