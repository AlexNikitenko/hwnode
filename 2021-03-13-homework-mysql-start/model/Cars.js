const mysql = require('mysql2/promise');
const config = require('../config/db');

const getAllCars = async () => {
  try {
    const conn = await mysql.createConnection(config);

    const query = 'SELECT * FROM cars';
  
    const [rows, fields] = await conn.execute(query);
 
    conn.end();

    return rows;

  } catch (e) {
    console.log('error>>>', e);
  }
  
};

const getCarsByYear = async (from, to) => {
    const conn = await mysql.createConnection(config);
    const query = `SELECT * FROM cars WHERE year >= ? AND year <= ?`;
    const [rows, fields] = await conn.execute(query, [from, to]);
    conn.end();
    return rows;
};

module.exports = {
  getAllCars,
  getCarsByYear,
};