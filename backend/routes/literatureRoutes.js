const express = require('express');
const router = express.Router();
const { getLiteratureWithBooks, getBooksByGenre } = require('../controllers/literatureController');

router.get('/', getLiteratureWithBooks);
router.get('/:genreId', getBooksByGenre);

module.exports = router;