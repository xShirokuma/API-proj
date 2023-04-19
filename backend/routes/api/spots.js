const express = require('express');

const { Spot, SpotImage, Review } = require('../../db/models');

const router = express.Router()

router.get('/', async (req, res) => {
  // TODO: eager load attributes into spots
  // const spots = await Spot.findAll({
  //   include: {
  //     model: SpotImage,
  //     attributes: ['url'],
  //     where: {
  //       preview: true
  //     }
  //   }
  // })

  const spots = await Spot.findAll()
  const spotsJsonArr = []

  for (const spot of spots) {
    const spotJson = spot.toJSON()

    const ratingSum = await Review.sum('stars', { where: { spotId: spot.id }})
    const reviewCount = await Review.count({ where: { spotId: spot.id }})
    spotJson.avgRating = ratingSum / reviewCount
    
    const previewImg = await SpotImage.findOne({ 
      where: { 
        spotId: spotJson.id,
        preview: true
      }
    })

    if (previewImg) {
      spotJson.previewImage = previewImg.url
    }

    spotsJsonArr.push(spotJson)
  }

  return res.json(spotsJsonArr)
})

module.exports = router;