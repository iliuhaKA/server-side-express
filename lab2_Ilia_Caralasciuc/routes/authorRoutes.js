const express = require('express');

const {
    getAuthors,
    getAuthorById,
    getAuthorBooks
} = require('../controllers/authorController');

const router = express.Router();

router.get('/', getAuthors);
router.get('/:id/books', getAuthorBooks);
router.get('/:id', getAuthorById);

module.exports = router;