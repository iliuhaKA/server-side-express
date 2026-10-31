
const movies = [
    { id: 1, title: 'Inception', genre: 'sci-fi', year: 2010, director: 'Christopher Nolan' },
    { id: 2, title: 'The Godfather', genre: 'crime', year: 1972, director: 'Francis Ford Coppola' },
    { id: 3, title: 'Interstellar', genre: 'sci-fi', year: 2014, director: 'Christopher Nolan' },
    { id: 4, title: 'Spirited Away', genre: 'animation', year: 2001, director: 'Hayao Miyazaki' }
];

let nextId = 5;


function getAll(genre) {
    if (!genre) {
        return movies;
    }
    return movies.filter(
        movie => movie.genre.toLowerCase() === genre.toLowerCase()
    );
}

function getById(id) {
    return movies.find(movie => movie.id === id);
}

function create({ title, genre, year, director }) {
    const movie = { id: nextId++, title, genre, year, director };
    movies.push(movie);
    return movie;
}

function update(id, data) {
    const movie = getById(id);
    if (!movie) {
        return undefined;
    }
    const allowed = ['title', 'genre', 'year', 'director'];
    allowed.forEach(field => {
        if (data[field] !== undefined) {
            movie[field] = data[field];
        }
    });
    return movie;
}

function remove(id) {
    const index = movies.findIndex(movie => movie.id === id);
    if (index === -1) {
        return undefined;
    }
    const [deleted] = movies.splice(index, 1);
    return deleted;
}

module.exports = { getAll, getById, create, update, remove };
