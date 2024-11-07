const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const literatureRoutes = require('./routes/literatureRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

app.use('/api/literature', literatureRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
