const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { email, password, nombre_usuario } = req.body; // Asegúrate de obtener nombre_usuario del cuerpo de la solicitud
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO Usuarios (correo, contrasena, nombre_usuario) VALUES (?, ?, ?)';
    db.query(query, [email, hashedPassword, nombre_usuario], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al registrar el usuario' });
        res.json({ success: true });
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Usuarios WHERE correo = ?';
    db.query(query, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ error: 'Usuario no encontrado' });
        const user = results[0];
        const match = await bcrypt.compare(password, user.contrasena);
        if (match) {
            const token = jwt.sign({ userId: user.usuario_id }, 'clave_secreta', { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Contraseña incorrecta' });
        }
    });
};

module.exports = {
    registerUser,
    loginUser
};
