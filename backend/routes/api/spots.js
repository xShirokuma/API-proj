const express = require('express');

const { Spot } = require('../../db/models');

const router = express.Router()

router.get('/', async (req, res) => {
  const spots = await Spot.findAll()

  spotsJsonArr = []
  spots.forEach(spot => {
    spotsJsonArr.push(spot.toJSON())
  });

  return res.json(spots)
})

module.exports = router;