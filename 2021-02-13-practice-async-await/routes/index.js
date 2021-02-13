const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/:number', async function(req, res) {
  const actorsDataArr = await axios.get(`https://swapi.dev/api/people/${req.params.number}/`);
  const filmsArr = actorsDataArr.data.films.map(el => axios.get(el));
  const filmsArrProm = await Promise.all(filmsArr);

  const titlesArrProm = filmsArrProm.map(async (el) => {
    const speciesArrProm = el.data.species.map(el => axios.get(el));
    const speciesListArr = await Promise.all(speciesArrProm);
    const speciesArr = speciesListArr.map(el => el.data.name);
    
    return `${el.data.title} (${speciesArr})`;
  });

  const titlesArr = await Promise.all(titlesArrProm);

  const obj = {
    name: actorsDataArr.data.name,
    films: titlesArr,
  }
  res.render('index', obj);
});

module.exports = router;
