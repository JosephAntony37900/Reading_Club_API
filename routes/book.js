const express = require('express');
const router = express.Router();
const book = require('../controllers/book')

router.post('/', book.createBook);
router.put('/act/:id', book.updateBook);
router.get('/', book.getAllBooks);
router.delete('/delete/:id', book.deleteBook);

module.exports = router;
