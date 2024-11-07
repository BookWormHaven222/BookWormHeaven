const express = require('express');
const router = express.Router();
const { getReviewsByBook, addReview, addFavorite, getFavoritesByUser } = require('../controllers/bookController');

router.get('/:id/reviews', getReviewsByBook);
router.post('/review', addReview);
router.post('/favorite', addFavorite);
router.get('/:usuario_id/favorites', getFavoritesByUser);

module.exports = router;