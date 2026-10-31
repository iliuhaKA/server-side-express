// Обработка неизвестных маршрутов (404)
module.exports = (req, res) => {
    res.status(404).json({
        error: `Маршрут ${req.method} ${req.originalUrl} не найден`
    });
};
