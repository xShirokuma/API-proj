const express = require('express');

const { requireAuth } = require('../../utils/auth')
const { Spot, SpotImage, Booking, Review, ReviewImage, User } = require('../../db/models');

const router = express.Router()

router.get('/current', requireAuth, async (req, res, next) => {
  const reviews = await Review.findAll({
    where: {
      userId: req.user.id
    }
  })

  reviewsJsonArr = []

  for (const review of reviews) {
    reviewsJsonArr.push(review)
  }

  return res.json(reviewsJsonArr)
})

router.post('/:id/images', requireAuth, async (req, res, next) => {
  const reviewId = req.params.id
  const { url } = req.body

  const img = await ReviewImage.create({
    reviewId, url
  })

  return res.json(img.toJSON())
})

router.put('/:id', requireAuth, async (req, res, next) => {
  const { review, stars } = req.body

  const reviewEdit = await Review.findOne({
    where: {
      userId: req.user.id
    }
  })

  if (review)
    reviewEdit.review = review

  if (stars)
    reviewEdit.stars = stars

  reviewEdit.updatedAt = new Date()

  await reviewEdit.save()

  return res.json(reviewEdit.toJSON())
})

router.delete('/:id', requireAuth, async (req, res, next) => {
  const review = await Review.findByPk(req.params.id)

  if (!review) {
    const err = Error("Review couldn't be found")
    err.status = 404
    return next(err)
  }

  await review.destroy()
  return res.json({
    message: "Successfully deleted" 
  })
})

module.exports = router;