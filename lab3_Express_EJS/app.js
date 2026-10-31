

const express = require('express');
const courseRoutes = require('./routes/courseRoutes');
const logger = require('./middleware/logger');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(logger);

app.use('/', courseRoutes);

app.use((req, res) => {
    res.status(404).render('404', {url: req.originalUrl});
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render('error');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});