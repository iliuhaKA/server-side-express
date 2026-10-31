function httpInfo(req, res, next) {
    const start = new Date();

    res.on('finish', () => {
        const duration = Date.now() - start;

        console.log(
            `${req.method} ${req.originalUrl} - ` +
            `${res.statusCode} - ${duration} ms - ` +
            `${start.toLocaleString('ru-RU')}`
        );
    });

    next();
};

module.exports = httpInfo;