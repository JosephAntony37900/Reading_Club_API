const express = require('express');
const router = express.Router();
const book = require('../controllers/book')
const { verifyToken } = require('../controllers/users');

router.post('/books',verifyToken, book.createBook);
router.get('/book/:id',verifyToken, book.getBookById);
router.put('/books/:id',verifyToken, book.updateBook);
router.get('/books/user/:userId',verifyToken, book.getBookByUser);
router.delete('/books/delete/:id',verifyToken, book.deleteBook);

module.exports = router;
