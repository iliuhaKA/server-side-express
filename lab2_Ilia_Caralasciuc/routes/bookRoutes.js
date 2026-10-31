const express = require('express');

const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    searchBook
} = require('../controllers/bookController');

const router = express.Router();

router.get('/', getBooks);
router.get('/search', searchBook);
router.get('/:id', getBookById);    
router.post('/', createBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);


module.exports = router;