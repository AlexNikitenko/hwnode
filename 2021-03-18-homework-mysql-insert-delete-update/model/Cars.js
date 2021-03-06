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

const insertRow = async (make, model, year) => {
  const conn = await mysql.createConnection(config);
  const query = `INSERT cars(make, model, year) VALUES(?, ?, ?)`;
  const [rows, fields] = await conn.execute(query, [make, model, year]);
  conn.end();
  return rows;
};

const deleteRow = async (id) => {
  const conn = await mysql.createConnection(config);
  const query = `DELETE FROM cars WHERE id = ?`;
  const [rows, fields] = await conn.execute(query, [id]);
  conn.end();
  return rows;
};

const updateRow = async (make, model, year, id) => {
  const conn = await mysql.createConnection(config);
  const query = `UPDATE cars
  SET make = ?, model = ?, year = ?
  WHERE id = ?`;
  const [rows, fields] = await conn.execute(query, [make, model, year, id]);
  conn.end();
  return rows;
};

module.exports = {
  getAllCars,
  getCarsByYear,
  insertRow,
  deleteRow,
  updateRow,
};