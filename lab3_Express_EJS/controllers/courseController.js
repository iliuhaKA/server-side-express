const courses = require('../models/courseModel');


function getCourses(req, res) {
    const search = typeof req.query.search === 'string'
        ? req.query.search.trim().toLowerCase()
        : '';
    const semester = typeof req.query.semester === 'string'
        ? req.query.semester.trim()
        : '';

    const filteredCourses = courses.filter(course => {
        const matchesSearch = !search
            || course.title.toLowerCase().includes(search)
            || course.teacher.toLowerCase().includes(search);
        const matchesSemester = !semester || String(course.semester) === semester;
        return matchesSearch && matchesSemester;
    });

    res.render('courses/index', {
        courses: filteredCourses,
        search: req.query.search || '',
        semester
    });
}

function getCourseById(req, res) {
    const course = courses.find(course => course.id === Number(req.params.id));
    if(!course) return res.status(404).render('404', {url: req.originalUrl});

    res.render('courses/details', {course});
}

function addCourse(req, res) {
    const body = req.body || {};
    const newCourse = {
        id: courses.reduce((maxId, course) => Math.max(maxId, course.id), 0) + 1,
        title: body.title.trim(),
        teacher: body.teacher.trim(),
        credits: Number(body.credits),
        semester: Number(body.semester),
        description: body.description.trim()
    };
    courses.push(newCourse);
    res.redirect('/courses');
}

function updateCourse(req, res) {
    const course = courses.find(course => course.id === Number(req.params.id));
    
    if(!course) {
        return res.status(404).render('404', {url: req.originalUrl});
    };

    const {title, teacher, credits, semester, description} = req.body;

    if(title !== undefined) course.title = title;
    if(teacher !== undefined) course.teacher = teacher;
    if(semester !== undefined) course.semester = Number(semester);
    if(credits !== undefined) course.credits = Number(credits);
    if(description !== undefined) course.description = description;

    res.redirect(`/courses/${course.id}`);
}

function deleteCourse(req, res) {
    const index = courses.findIndex(
    course => course.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).render('404', {url: req.originalUrl});
    }

    courses.splice(index, 1);
    res.redirect('/courses');
}

function showCreateForm(req, res) {
    res.render('courses/create', {
        course: {},
        errors: []
    });
}

function showEditForm(req, res) {
    const course = courses.find(course => course.id === Number(req.params.id));
    if (!course) return res.status(404).render('404', {url: req.originalUrl});

    res.render('courses/edit', {
        course,
        errors: []
    });
}

module.exports = {
    getCourses,
    getCourseById,
    updateCourse,
    addCourse,
    deleteCourse,
    showCreateForm,
    showEditForm
};