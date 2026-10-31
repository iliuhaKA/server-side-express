const books = require('../models/bookModel');
const authors = require('../models/authorModel');

function getAuthors(req, res) {
    res.status(200).json(authors);
};

function getAuthorById(req, res) {
    const author = authors.find(author => author.id === Number(req.params.id));

    if(!author) {
        return res.status(404).json({
            error: 'Author not found'
        });
    }

    res.status(200).json(author);
};

function getAuthorBooks(req, res) {
    const author = authors.find(author => author.id === Number(req.params.id));
    
    if(!author) {
        return res.status(404).json({
            error: 'Author not found'
        });
    }

    const authorBooks = books.filter(
        book => book.authorId === author.id
    );

    res.status(200).json({
        ...author,
        books: authorBooks
    });
};

module.exports = { 
    getAuthors,
    getAuthorById,
    getAuthorBooks
};