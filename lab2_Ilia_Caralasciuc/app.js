const express = require('express');

const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const notFound = require('./middleware/notFound');
const httpInfo = require('./middleware/httpInfo');
const getStatistics = require('./controllers/statisticsController');

const app = express();

app.use(express.json());
app.use(httpInfo);

app.get('/', (req, res) => {
    res.send('Caralasciuc Ilia presents his work!');
});

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

app.get('/api/statistics', getStatistics);

app.use(notFound);

app.listen(3000, ()=> {
    console.log('Server started: http://localhost:3000');
});


