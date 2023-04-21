const express = require('express');

const { requireAuth } = require('../../utils/auth')
const { Spot, SpotImage, Booking, Review, ReviewImage, User } = require('../../db/models');

const router = express.Router()

router.post('/:id/images', requireAuth, async (req, res, next) => {
  const spotId = req.params.id
  const { url, preview } = req.body
  
  const image = await SpotImage.create({
    spotId, url, preview
  })

  res.json(image.toJSON())
})

router.post('/:id/bookings', requireAuth, async (req, res, next) => {
  const spotId = req.params.id
  const userId = req.user.id
  const { startDate, endDate } = req.body

  const booking = await Booking.create({
    spotId, userId, startDate, endDate
  })

  res.json(booking.toJSON())
})

router.post('/:id/reviews', requireAuth, async (req, res, next) => {
  const spotId = req.params.id
  const userId = req.user.id
  const { review , stars } = req.body

  const newReview = await Review.create({
    spotId, userId, review, stars
  })

  res.json(newReview.toJSON())
})

router.get('/:id/bookings', requireAuth, async (req, res, next) => {
  const bookings = await Booking.findAll({ 
    where: { spotId: req.params.id },
    attributes: ['spotId', 'startDate', 'endDate']
  })

  bookingsJsonArr = []

  for (const booking of bookings) {
    bookingsJsonArr.push(booking.toJSON())
  }

  return res.json(bookingsJsonArr)
})

router.get('/:id/reviews', requireAuth, async (req, res, next) => {
  const reviews = await Review.findAll({ 
    where: { 
      spotId: req.params.id,
    }, 
    include: [{
      model: User,
      attributes: ['id', 'firstName', 'lastName']
    }, {
      model: ReviewImage,
      attributes: ['id', 'url']
    }]
  })

  reviewsJsonArr = []

  for (const review of reviews) {
    reviewsJsonArr.push(review.toJSON())
  }

  return res.json(reviews)
})

router.get('/current', requireAuth, async (req, res, next) => {
  const userSpots = await Spot.findAll({ where: { ownerId: req.user.id }})
  const userSpotsJsonArr = []

  for (const userSpot of userSpots) {
    const userSpotJson = userSpot.toJSON()

    const ratingSum = await Review.sum('stars', { where: { spotId: userSpot.id }})
    const reviewCount = await Review.count({ where: { spotId: userSpot.id }})
    userSpotJson.avgRating = ratingSum / reviewCount
    
    const previewImg = await SpotImage.findOne({ 
      where: { 
        spotId: userSpotJson.id,
        preview: true
      }
    })

    if (previewImg) {
      userSpotJson.previewImage = previewImg.url
    }
    userSpotsJsonArr.push(userSpotJson)
  }
  return res.json(userSpotsJsonArr)
})

router.get('/:id', async (req, res, next) => {
  const spot = await Spot.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: SpotImage,
      attributes: ['id', 'url', 'preview'],
      where: {
        spotId: req.params.id
      }
    }
  })

  console.log(spot);

  if (!spot) {
    const err = Error("Spot couldn't be found")
    err.status = 404
    return next(err)
  }

  const spotJson = spot.toJSON()

  const ratingSum = await Review.sum('stars', { where: { spotId: spot.id }})
  const reviewCount = await Review.count({ where: { spotId: spot.id }})

  spotJson.numReviews = reviewCount
  spotJson.avgRating = ratingSum / reviewCount

  return res.json(spotJson)
})

router.put('/:id', requireAuth, async (req, res, next) => {
  const spot = await Spot.findOne({ where: { id: req.params.id }})
  
  if (!spot) {
    const err = Error("Spot couldn't be found")
    err.status = 404
    return next(err)
  }

  const { address, city, state, country, lat, lng, name, description, price } = req.body

  if (address)
    spot.address = address;

  if (city)
    spot.city = city;
  
  if (state)
    spot.state = state;

  if (country)
    spot.country = country

  if (lat) 
    spot.lat = lat

  if (lng)
    spot.lng = lng

  if (name)
    spot.name = name

  if (description)
    spot.description = description

  if (price)
    spot.price = price

  spot.updatedAt = new Date()

  await spot.save()

  return res.json(spot.toJSON())
})

router.delete('/:id', requireAuth, async (req, res, next) => {
  const spot = await Spot.findOne({ where: { id: req.params.id }})
  
  if (!spot) {
    const err = Error("Spot couldn't be found")
    err.status = 404
    return next(err)
  }

  await spot.destroy()
  return res.json({
    message: "Successfully deleted" 
  })
})

router.get('/', async (req, res, next) => {
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

router.post('/', requireAuth, async (req, res, next) => {

  const ownerId = req.user.id
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  
  const spot = await Spot.create({
    ownerId, address, city, state, country, lat, lng, name, description, price
  })

  return res.status(201).json(spot)
})

module.exports = router;