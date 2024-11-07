const db = require('../db');

const getLiteratureWithBooks = (req, res) => {
    const query = `
        SELECT Literatura.literatura_id, Literatura.nombre AS tipo_literatura, Libros.titulo, Libros.autor, Libros.descripcion
        FROM Libros
        JOIN Literatura ON Libros.literatura_id = Literatura.literatura_id
        ORDER BY Literatura.nombre, Libros.libro_id
        LIMIT 5;
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los géneros y libros' });
        }
        res.json(results);
    });
};

const getBooksByGenre = (req, res) => {
    const genreId = req.params.genreId;
    const query = `
        SELECT Libros.titulo, Libros.autor, Libros.descripcion
        FROM Libros
        WHERE Libros.literatura_id = ?
    `;

    db.query(query, [genreId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los libros del género' });
        }
        res.json(results);
    });
};

module.exports = {
    getLiteratureWithBooks,
    getBooksByGenre
};
