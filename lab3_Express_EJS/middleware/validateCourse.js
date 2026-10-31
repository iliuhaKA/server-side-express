module.exports = (req, res, next) => {
    const {title, teacher, credits, semester, description} = req.body;
    const errors = [];
    const numericCredits = Number(credits);
    const numericSemester = Number(semester);

    if (!title || !title.trim()) errors.push('Название дисциплины обязательно');
    if (!teacher || !teacher.trim()) errors.push('Преподаватель обязателен');
    if (!Number.isFinite(numericCredits) || numericCredits <= 0) {
        errors.push('Количество кредитов должно быть положительным числом');
    }
    if (!Number.isInteger(numericSemester) || numericSemester < 1 || numericSemester > 8) {
        errors.push('Семестр должен находиться в диапазоне от 1 до 8');
    }
    if (!description || !description.trim()) errors.push('Описание обязательно');

    if (errors.length > 0) {
        const course = {
            title: title || '',
            teacher: teacher || '',
            credits: credits || '',
            semester: semester || '',
            description: description || ''
        };
        const isEdit = req.path.endsWith('/edit') && req.params.id;
        return res.status(400).render(
            isEdit ? 'courses/edit' : 'courses/create',
            {course, errors}
        );
    }

    next();
};