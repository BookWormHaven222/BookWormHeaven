const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Millonarios1@',
    database: 'bookworm_haven1',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');
});

module.exports = connection;