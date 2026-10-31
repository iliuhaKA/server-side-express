const express = require('express');
const path = require('path');

const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const movieRoutes = require('./routes/movieRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(logger);

app.use('/api/movies', movieRoutes);
app.use('/movies', viewRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(3001, () => {
    console.log(`Server is running on http://localhost:3001`);
});
