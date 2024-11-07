const db = require('../db');

const getReviewsByBook = (req, res) => {
    const bookId = req.params.id;
    const query = 'SELECT * FROM Reseñas WHERE libro_id = ?';

    db.query(query, [bookId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener las reseñas' });
        res.json(results);
    });
};

const addReview = (req, res) => {
    const { usuario_id, libro_id, comentario, calificacion } = req.body;
    const query = 'INSERT INTO Reseñas (usuario_id, libro_id, comentario, calificacion) VALUES (?, ?, ?, ?)';

    db.query(query, [usuario_id, libro_id, comentario, calificacion], (err) => {
        if (err) return res.status(500).json({ error: 'Error al agregar la reseña' });
        res.json({ message: 'Reseña agregada exitosamente' });
    });
};

const addFavorite = (req, res) => {
    const { usuario_id, libro_id } = req.body;
    const query = 'INSERT INTO Favoritos (usuario_id, libro_id) VALUES (?, ?)';

    db.query(query, [usuario_id, libro_id], (err) => {
        if (err) return res.status(500).json({ error: 'Error al marcar como favorito' });
        res.json({ message: 'Libro marcado como favorito' });
    });
};

const getFavoritesByUser = (req, res) => {
    const userId = req.params.usuario_id;
    const query = `
        SELECT Libros.titulo, Libros.autor 
        FROM Favoritos 
        JOIN Libros ON Favoritos.libro_id = Libros.libro_id 
        WHERE Favoritos.usuario_id = ?`;

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener los favoritos' });
        res.json(results);
    });
};

module.exports = {
    getReviewsByBook,
    addReview,
    addFavorite,
    getFavoritesByUser
};