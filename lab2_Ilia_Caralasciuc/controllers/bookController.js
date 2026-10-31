const books = require('../models/bookModel');
const authors = require('../models/authorModel');

function getBooks(req, res) {
    const { genre, year, rating, authorId } = req.query;

    let result = books;
    
    if(genre) {
        result = result.filter(book => book.genre === genre);
    }
    if(authorId) {
        result = result.filter(book => book.authorId === Number(authorId));
    }
    if(year) {
        result = result.filter(book => book.year === Number(year));
    }
    if(rating) {
        result = result.filter(book => book.rating >= rating);
    }

    res.status(200).json(result);
};

function getBookById(req, res) {
    const id = Number(req.params.id);
    const book = books.find(book => book.id === id);

    if(!book){
        return res.status(404).json({
            error: 'Book not found'
        });
    }

    const author = authors.find(author => author.id === book.authorId);
    
    res.status(200).json({
        ...book,
        author
    });
};



function createBook(req, res) {
    const { title, genre, rating, year, authorId } = req.body;

    if(!title || !genre || !year || !authorId) {
        return res.status(400).json({
            error: 'title, genre, year and authorId are required'
        });
    }

    const authorExists = authors.some(
        author => author.id === Number(authorId)
    );

    if(!authorExists) {
        return res.status(400).json({
            error: 'Author not found'
        });
    }

    const newBook = {
        id: books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1,
        title,
        genre,
        rating: Number(rating) || 0,
        year: Number(year),
        authorId: Number(authorId)
    };

    books.push(newBook);

    res.status(201).json(newBook);
};

function updateBook(req, res) {
    const id = Number(req.params.id);
    const book = books.find(book => book.id === id);

    if(!book) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }

    const {title, genre, year, rating, authorId } = req.body;

    if(authorId !== undefined) {
        const authorExists = authors.some(author => author.id === Number(authorId));

        if(!authorExists) {
            return res.status(400).json({
                error: 'Author not found'
            });
        };

        book.authorId = Number(authorId);
    }
    if(title !== undefined) book.title = title;
    if(genre !== undefined) book.genre = genre;
    if(year !== undefined) book.year = Number(year); 
    if(rating !== undefined) book.rating = Number(rating);
    
    res.status(200).json(book);
};

function deleteBook(req, res) {
    const id = Number(req.params.id);
    
    const bookIndex = books.findIndex(book => book.id === id);

    if(bookIndex === -1) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }

    const deletedBook = books.splice(bookIndex, 1)[0];
    
    res.status(200).json({
        message: 'Book deleted successfully',
        book: deletedBook
    });
};

function searchBook(req, res) {
    const { title } = req.query;

    if(!title) {
        return res.status(400).json({
            error: 'Search title is required'
        });
    }

    const searchText = String(title).toLowerCase();
    const result = books.filter(book => 
        book.title.toLowerCase().includes(searchText)
    );

    res.status(200).json(result);
}

module.exports = { 
    getBooks, 
    getBookById, 
    createBook, 
    updateBook,
    deleteBook,
    searchBook
};