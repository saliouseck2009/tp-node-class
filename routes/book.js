const express = require('express');
const router = express.Router()
const bookCtrl = require('../controller/book')


router.post('/', bookCtrl.addBook);

router.get('/', bookCtrl.getAllbook);

router.get('/:id', bookCtrl.getOneBook);

router.put('/:id', bookCtrl.editBook);

router.delete('/:id', bookCtrl.deleteBook);

module.exports = router;