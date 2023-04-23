const express = require('express');

const { requireAuth } = require('../../utils/auth')
const { Spot, SpotImage, Booking, Review, ReviewImage, User } = require('../../db/models');

const router = express.Router()

router.delete('/:id', requireAuth, async (req, res, next) => {
  const img = await ReviewImage.findByPk(req.params.id)

  if (!img) {
    const err = Error("Review Image couldn't be found")
    err.status = 404
    return next(err)
  }

  const review = await Review.findByPk(img.reviewId)

  if (review.userId !== req.user.id) {
    const err = Error("Forbidden")
    err.status = 403
    return next(err)
  }

  await img.destroy()

  return res.json({
    message: "Successfully deleted" 
  })
})

module.exports = router;