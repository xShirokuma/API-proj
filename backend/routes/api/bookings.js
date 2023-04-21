const express = require('express');

const { requireAuth } = require('../../utils/auth')
const { Spot, SpotImage, Booking, Review, ReviewImage, User } = require('../../db/models');

const router = express.Router()

router.get('/current', requireAuth, async (req, res, next) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id
    }
  })

  bookingsJsonArr = []

  for (const booking of bookings) {
    bookingsJsonArr.push(booking)
  }

  return res.json(bookingsJsonArr)
})

router.put('/:id', requireAuth, async (req, res, next) => {
  const { startDate, endDate } = req.body

  const booking = await Booking.findByPk(req.params.id)

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
  }

  await booking.destroy()
  return res.json({
    message: "Successfully deleted" 
  })
})

module.exports = router;