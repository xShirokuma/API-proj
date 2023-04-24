const express = require('express');

const { requireAuth } = require('../../utils/auth')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require("sequelize");
const { Spot, SpotImage, Booking, Review, ReviewImage, User } = require('../../db/models');

const router = express.Router()

const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Country is required'),
  check('lat')
    .exists()
    .isFloat({
      min: -90,
      max: 90
    })
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists()
    .notEmpty()
    .isFloat({
      min: -180,
      max: 180
    })
   .withMessage('Latitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ max: 49 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Price per day is required'),
  handleValidationErrors
];

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isInt({
      min: 1,
      max: 5
    })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]

router.post('/:id/images', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.id)
  
  if (!spot) {
    const err = Error("Spot couldn't be found")
    err.status = 404
    return next(err)
  }
  else if (req.user.id !== spot.ownerId) {
    const err = Error("Forbidden")
    err.status = 403
    return next(err)
  }
  else {
    const spotId = req.params.id
    const { url, preview } = req.body

    const image = await SpotImage.create({
      spotId, url, preview
    })

    imageJson = image.toJSON()

    imageJson.createdAt = imageJson.createdAt.toISOString().slice(0, 10)
    imageJson.updatedAt = imageJson.updatedAt.toISOString().slice(0, 10)

    return res.json(imageJson)
  }
})

router.post('/:id/bookings', requireAuth, async (req, res, next) => {
  const spotId = req.params.id
  const userId = req.user.id
  const spot = await Spot.findByPk(spotId)
  
  if (!spot) {
    const err = Error("Spot couldn't be found")
    err.status = 404
    return next(err)
  }
  else if (userId === spot.ownerId) {
    const err = Error("Cannot create a booking for own location")
    err.status = 403
    return next(err)
  }
  else {
    const { startDate, endDate } = req.body

    const spotBookings = await Booking.findAll({
      where: {
        spotId: spotId
      }
    })

    const startDateTyped = new Date(startDate)
    const endDateTyped = new Date(endDate)

    if (startDateTyped.getTime() >= endDateTyped.getTime()){
      const err = Error("Bad Reqeust")
      err.status = 400
      err.errors = {
        endDate: "endDate cannot be on or before startDate"
      }
      return next(err)
    }

    for (const booking of spotBookings) {
      let err
      if (startDateTyped.getTime() >= booking.startDate.getTime() && startDateTyped.getTime() <= booking.endDate.getTime()) {
        err = Error("Sorry, this spot is already booked for the specified dates")
        err.status = 403
        err.errors = {
          startDate: "Start date conflicts with an existing booking"
        }
      }
      if (endDateTyped.getTime() >= booking.startDate.getTime() && endDateTyped.getTime() <= booking.endDate.getTime()) {
        err = Error("Sorry, this spot is already booked for the specified dates")
        err.status = 403
        err.errors = {
          endDate: "End date conflicts with an existing booking"
        }
      }
      if (err)
        return next(err)
    }

    const newBooking = await Booking.create({
      spotId, userId, startDate, endDate
    })

    const newBookingJson = newBooking.toJSON()

    newBookingJson.startDate = newBookingJson.startDate.toISOString().slice(0, 10)
    newBookingJson.endDate = newBookingJson.endDate.toISOString().slice(0, 10)

    res.json(newBookingJson)
  }
})

router.post('/:id/reviews', requireAuth, validateReview, async (req, res, next) => {
  const spotId = req.params.id
  const userId = req.user.id
  const spot = await Spot.findByPk(spotId)
  
  if (!spot) {
    const err = Error("Spot couldn't be found")
    err.status = 404
    return next(err)
  }
  else if (userId === spot.ownerId) {
    const err = Error("Cannot create a review for own location")
    err.status = 403
    return next(err)
  }

  const previousReview = await Review.findOne({
    where: {
      userId: userId
    }
  })

  if (previousReview) {
    const err = Error("User already has a review for this spot")
    err.status = 500
    return next(err)
  }

  const { review , stars } = req.body

  const newReview = await Review.create({
    spotId, userId, review, stars
  })

  res.json(newReview.toJSON())
})

router.get('/:id/bookings', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.id)

  if (!spot) {
    const err = Error("Spot couldn't be found")
    err.status = 404
    return next(err)
  } 

  let bookings

  if (req.user.id !== spot.ownerId) {
    bookings = await Booking.findAll({ 
      where: { 
        spotId: req.params.id,
        userId: req.user.id
      },
      attributes: ['spotId', 'startDate', 'endDate']
    })
  }
  else {
    bookings = await Booking.findAll({
      where: {
        spotId: req.params.id
      },
      include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    })
  }
  bookingsJsonArr = []

  for (const booking of bookings) {
    bookingsJsonArr.push(booking.toJSON())
  }

  return res.json({ Bookings: bookingsJsonArr })
})

router.get('/:id/reviews', async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.id)

  if (!spot) {
    const err = Error("Spot couldn't be found")
    err.status = 404
    return next(err)
  }
  
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

  const reviewsJsonArr = []

  for (const review of reviews) {
    const reviewJson = review.toJSON()

    if (!reviewJson.ReviewImages)
      reviewJson.ReviewImages = []

    reviewsJsonArr.push(reviewJson)
  }

  return res.json({ Reviews: reviewsJsonArr })
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

    if (previewImg)
      userSpotJson.previewImage = previewImg.url
    else
      userSpotJson.previewImage = null

    userSpotsJsonArr.push(userSpotJson)
  }
  return res.json({ Spots: userSpotsJsonArr })
})

router.get('/:id', async (req, res, next) => {
  const spot = await Spot.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: SpotImage,
      attributes: ['id', 'url', 'preview'],
      model: User,
      as: "Owner",
      attributes: ['id', 'firstName', 'lastName']
    }
  })

  if (!spot) {
    const err = Error("Spot couldn't be found")
    err.status = 404
    return next(err)
  }

  const spotJson = spot.toJSON()

  if (!spot.SpotImages) {
    spotJson.SpotImages = []
  }

  const ratingSum = await Review.sum('stars', { where: { spotId: spot.id }})
  const reviewCount = await Review.count({ where: { spotId: spot.id }})

  spotJson.numReviews = reviewCount
  spotJson.avgStarRating = ratingSum / reviewCount

  return res.json(spotJson)
})

router.put('/:id', requireAuth, validateSpot, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.id)
  
  if (!spot) {
    const err = Error("Spot couldn't be found")
    err.status = 404
    return next(err)
  }
  else if (req.user.id !== spot.ownerId) {
    const err = Error("Forbidden")
    err.status = 403
    return next(err)
  }
  else {
  const { address, city, state, country, lat, lng, name, description, price } = req.body

  spot.address = address;
  spot.city = city;
  spot.state = state;
  spot.country = country
  spot.lat = lat
  spot.lng = lng
  spot.name = name
  spot.description = description
  spot.price = price

  spot.updatedAt = new Date()

  await spot.save()

  return res.json(spot.toJSON())
  }
})

router.delete('/:id', requireAuth, async (req, res, next) => {
  const spot = await Spot.findOne({ where: { id: req.params.id }})
  

  if (!spot) {
    const err = Error("Spot couldn't be found")
    err.status = 404
    return next(err)
  }
  else if (req.user.id !== spot.ownerId) {
    const err = Error("Forbidden")
    err.status = 403
    return next(err)
  }
  else {
    await spot.destroy()
    return res.json({
      message: "Successfully deleted" 
    })
  }
})

router.get('/', async (req, res, next) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

  let err

  if (page < 1) {
    err = Error("Bad Request")
    err.status = 400
    err.errors = { 
      page: "Page must be greater than or equal to 1"
    }
  }

  if (size < 1) {
    err = Error("Bad Request")
    err.status = 400
    err.errors = { 
      size: "Size must be greater than or equal to 1"
    }
  }

  if (minLat < -90) {
    err = Error("Bad Request")
    err.status = 400
    err.errors = { 
      minLat: "Minimum latitude is invalid"
    }
  }

  if (maxLat > 90) {
    err = Error("Bad Request")
    err.status = 400
    err.errors = { 
      maxLat: "Maximum latitude is invalid"
    }
  }

  if (minLng < -180) {
    err = Error("Bad Request")
    err.status = 400
    err.errors = { 
      minLng: "Minimum longitude is invalid"
    }
  }

  if (maxLng > 180) {
    err = Error("Bad Request")
    err.status = 400
    err.errors = { 
      maxLng: "Maximum longitude is invalid"
    }
  }

  if (minPrice < 0) {
    err = Error("Bad Request")
    err.status = 400
    err.errors = { 
      minPrice: "Minimum price must be greater than or equal to 0"
    }
  }

  if (maxPrice < 0) {
    err = Error("Bad Request")
    err.status = 400
    err.errors = { 
      maxPrice: "Maximum price must be greater than or equal to 0"
    }
  }

  if (err)
    return next(err)

  const pagination = {}

  if (isNaN(page) || page <= 0)
    page = 1

  size = !isNaN(size) && size > 0 ? parseInt(size) : 20

  if (size > 10)
    size = 20

  pagination.limit = size
  pagination.offset = (page-1) * size

  if (isNaN(minLat)) {
    minLat = -90
  }

  if (isNaN(maxLat)) {
    maxLat = 90
  }

  if (isNaN(minLng)) {
    minLng = -180
  }

  if (isNaN(maxLng)) {
    maxLng = 180
  }

  if (isNaN(minPrice)) {
    minPrice = 0
  }

  if (isNaN(maxPrice)) {
    maxPrice = 100000
  }

  console.log(minLat, maxLat, minLng, maxLng, minPrice, maxPrice);

  const spots = await Spot.findAll({
    where: {
      lat: {
        [Op.between]: [minLat, maxLat]
      },
      lng: {
        [Op.between]: [minLng, maxLng]
      },
      price: {
        [Op.between]: [minPrice, maxPrice]
      }
    },
    ...pagination
  })
  const spotsJsonArr = []

  for (const spot of spots) {
    const spotJson = spot.toJSON()

    const ratingSum = await Review.sum('stars', { 
      where: { 
        spotId: spot.id 
      }
    })
    const reviewCount = await Review.count({ 
      where: { 
        spotId: spot.id 
      }
    })
    spotJson.avgRating = ratingSum / reviewCount
    
    const previewImg = await SpotImage.findOne({ 
      where: { 
        spotId: spotJson.id,
        preview: true
      }
    })

    if (previewImg)
      spotJson.previewImage = previewImg.url
    else
      spotJson.previewImage = null

    spotsJsonArr.push(spotJson)
  }
  return res.json({ Spots: spotsJsonArr, page, size })
})

router.post('/', requireAuth, validateSpot, async (req, res, next) => {

  const ownerId = req.user.id
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  
  const spot = await Spot.create({
    ownerId, address, city, state, country, lat, lng, name, description, price
  })

  return res.status(201).json(spot)
})

module.exports = router;