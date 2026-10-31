const books = require('../models/bookModel');
const authors = require('../models/authorModel');

function getStatistics(req, res) {
    const genres = new Set(
        books.map(book => book.genre)
    );

    const newestBook = books.reduce((newest, book) => {
        return book.year > newest.year ? book : newest;
    });

    const oldestBook = books.reduce((oldest, book) => {
        return book.year < oldest.year ? book : oldest;
    });

    res.status(200).json({
        booksCount: books.length,
        authorsCount: authors.length,
        genresCount: genres.size,
        newestBook,
        oldestBook
    });
}

module.exports = getStatistics;
