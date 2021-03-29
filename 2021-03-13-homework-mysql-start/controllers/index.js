const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const upload = multer();
const uploadFields = upload.none();

const Cars = require('../model/Cars');

const getFormYears = async (req, res) => {
  console.log('REEEEQ', req.body);
  const { from, to } = req.body;
  // const filteredCars = await Cars.getCarsByYear(req.body.from, req.body.to);
  const filteredCars = await Cars.getCarsByYear(from, to);
  console.log('FILTERED ARR>>>>>>>>>', filteredCars);
  res.send('index', { carsArr: filteredCars });
;}

const getIndexPage = async (req, res) => {
  // const currentCars = await Cars.getAllCars();
  // console.log('cars>>>', currentCars);
  res.render('index');
  // res.render('index', currentCars);
};

module.exports = {
  getIndexPage,
  getFormYears,
  uploadFields,
};