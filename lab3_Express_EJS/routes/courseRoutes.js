const express = require('express');

const {
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    addCourse,
    showCreateForm,
    showEditForm
} = require("../controllers/courseController");
const validateCourse = require('../middleware/validateCourse');

const router = express.Router();

router.get('/', (req, res) => res.redirect('/courses'));
router.get('/courses', getCourses);
router.get('/courses/new', showCreateForm);
router.post('/courses', validateCourse, addCourse);
router.get('/courses/:id', getCourseById);
router.get('/courses/:id/edit', showEditForm);
router.post('/courses/:id/edit', validateCourse, updateCourse);
router.post('/courses/:id/delete', deleteCourse);

module.exports = router;