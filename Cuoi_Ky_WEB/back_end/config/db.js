const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'documentsharing',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log('Kết nối thành công đến MySQL');
    connection.release(); 
  } catch (err) {
    console.error('Kết nối thất bại: ', err);
  }
}

testConnection();

module.exports = db;
