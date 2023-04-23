const express = require('express');

const { requireAuth } = require('../../utils/auth')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, SpotImage, Booking, Review, ReviewImage, User } = require('../../db/models');

const router = express.Router()

router.get('/current', requireAuth, async (req, res, next) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: {
      model: Spot,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  })

  const bookingsJsonArr = []

  for (const booking of bookings) {
    const spotId = booking.Spot.id
    const previewImg = await SpotImage.findOne({ 
      where: { 
        spotId: spotId,
        preview: true
      }
    })
  
    const bookingJson = booking.toJSON()

    if (previewImg)
      bookingJson.Spot.previewImage = previewImg.url
    else
      bookingJson.Spot.previewImage = null


    bookingsJsonArr.push(bookingJson)
  }

  return res.json({ Bookings: bookingsJsonArr })
})

router.put('/:id', requireAuth, async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.id)

  if (!booking) {
    const err = Error("Booking couldn't be found")
    err.status = 404
    return next(err)
  }
  else if (req.user.id !== booking.userId) {
    const err = Error("Forbidden")
    err.status = 403
    return next(err)
  }
  const { startDate, endDate } = req.body

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

  if (startDateTyped.getTime() <= Date.now()) {
    const err = Error("Start Date must be a future date")
    err.status = 403
    return next(err)
  }

  if (endDateTyped.getTime() <= Date.now()) {
    const err = Error("End Date must be a future date")
    err.status = 403
    return next(err)
  }


  if (booking.endDate.getTime() <= Date.now()) {
    const err = Error("Past bookings can't be modified")
    err.status = 403
    return next(err)
  }

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

  if (startDate)
    booking.startDate = new Date(startDate)
  if (endDate)
    booking.endDate = new Date(endDate)

  booking.updatedAt = new Date()

  await booking.save()

  return res.json(booking.toJSON())
})

router.delete('/:id', requireAuth, async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.id)

  if (!booking) {
    const err = Error("Booking couldn't be found")
    err.status = 404
    return next(err)
  } else if (booking.userId !== req.user.id) {
    const err = Error("Forbidden")
    err.status = 403
    return next(err)
  }
  else if (Date.now() >= booking.startDate.getTime()) {
    const err = Error("Bookings that have been started can't be deleted")
    err.status = 403
    return next(err)
  }
  else {
    await booking.destroy()
    return res.json({
      message: "Successfully deleted" 
    })
  }
})

module.exports = router;