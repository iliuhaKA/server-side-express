
const movieModel = require('../models/movieModel');

const CURRENT_YEAR = new Date().getFullYear();


function parseId(value) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

const isNonEmptyString = value =>
    typeof value === 'string' && value.trim() !== '';

const isValidYear = value =>
    Number.isInteger(value) && value >= 1888 && value <= CURRENT_YEAR + 5;


function validateMovie(body, partial = false) {
    const errors = [];
    const fields = {
        title: isNonEmptyString,
        genre: isNonEmptyString,
        director: isNonEmptyString,
        year: isValidYear
    };

    Object.entries(fields).forEach(([field, isValid]) => {
        const value = body[field];
        if (value === undefined) {
            if (!partial) {
                errors.push(`Поле "${field}" обязательно`);
            }
        } else if (!isValid(value)) {
            errors.push(`Поле "${field}" имеет неверное значение`);
        }
    });

    return errors;
}


function getMovies(req, res) {
    const { genre } = req.query;
    res.json(movieModel.getAll(genre));
}


function getMovieById(req, res) {
    const id = parseId(req.params.id);
    if (id === null) {
        return res.status(400).json({ error: 'Некорректный id' });
    }

    const movie = movieModel.getById(id);
    if (!movie) {
        return res.status(404).json({ error: 'Фильм не найден' });
    }
    res.json(movie);
}


function createMovie(req, res) {
    const body = req.body || {};
    const errors = validateMovie(body);
    if (errors.length > 0) {
        return res.status(400).json({ error: 'Неверные данные', details: errors });
    }

    const movie = movieModel.create({
        title: body.title.trim(),
        genre: body.genre.trim(),
        year: body.year,
        director: body.director.trim()
    });
    res.status(201).json(movie);
}


function updateMovie(req, res) {
    const id = parseId(req.params.id);
    if (id === null) {
        return res.status(400).json({ error: 'Некорректный id' });
    }

    const body = req.body || {};
    const hasFields = ['title', 'genre', 'year', 'director']
        .some(field => body[field] !== undefined);
    if (!hasFields) {
        return res.status(400).json({ error: 'Не переданы поля для изменения' });
    }

    const errors = validateMovie(body, true);
    if (errors.length > 0) {
        return res.status(400).json({ error: 'Неверные данные', details: errors });
    }

    const movie = movieModel.update(id, body);
    if (!movie) {
        return res.status(404).json({ error: 'Фильм не найден' });
    }
    res.json(movie);
}


function deleteMovie(req, res) {
    const id = parseId(req.params.id);
    if (id === null) {
        return res.status(400).json({ error: 'Некорректный id' });
    }

    const deleted = movieModel.remove(id);
    if (!deleted) {
        return res.status(404).json({ error: 'Фильм не найден' });
    }
    res.json({ message: 'Фильм удалён', movie: deleted });
}


function renderMovies(req, res) {
    const { genre } = req.query;
    res.render('movies/index', {
        movies: movieModel.getAll(genre),
        genre: genre || ''
    });
}

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    renderMovies
};
