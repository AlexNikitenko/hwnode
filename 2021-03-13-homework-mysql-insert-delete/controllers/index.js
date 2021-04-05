const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const upload = multer();
const uploadFields = upload.none();

const Cars = require('../model/Cars');

// ** ROUTERS **

const getIndexPage = async (req, res) => {
  res.render('index');
};

const getFormYears = async (req, res) => {
  const { from, to } = req.body;
  const filteredCars = await Cars.getCarsByYear(from, to);
  console.log('FILTERED ARR>>>>>>>>>', filteredCars);
  res.send(filteredCars);
;}

const insertCar = async (req, res) => {
  const { make, model, year } = req.body;
  await Cars.insertRow(make, model, year);
  const result = await Cars.getAllCars();
  res.send(result);
;}

const deleteCar = async (req, res) => {
  const { id } = req.body;
  await Cars.deleteRow(id);
  const result = await Cars.getAllCars();
  res.send(result);
;}

module.exports = {
  getIndexPage,
  getFormYears,
  uploadFields,
  insertCar,
  deleteCar,
};