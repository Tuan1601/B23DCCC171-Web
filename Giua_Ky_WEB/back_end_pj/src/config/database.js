const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'giua_ky'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Kết nối tới cơ sở dữ liệu thành công');
});

module.exports = db;
