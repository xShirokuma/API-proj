const express = require('express');

const { requireAuth } = require('../../utils/auth')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, SpotImage, Booking, Review, ReviewImage, User } = require('../../db/models');

const router = express.Router()

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

router.get('/current', requireAuth, async (req, res, next) => {
  const reviews = await Review.findAll({
    where: {
      userId: req.user.id
    },
    include: [{
      model: Spot,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
    }, {
      model: User,
      attributes: ['id', 'firstName', 'lastName']
    }, {
      model: ReviewImage,
      attributes: ['id', 'url']
    }]
  })

  const reviewsJsonArr = []

  for (const review of reviews) {
    const spotId = review.Spot.id
    const previewImg = await SpotImage.findOne({ 
      where: { 
        spotId: spotId,
        preview: true
      }
    })
  
    const reviewJson = review.toJSON()

    if (previewImg)
      reviewJson.Spot.previewImage = previewImg.url
    else
      reviewJson.Spot.previewImage = null

    reviewsJsonArr.push(reviewJson)
  }

  return res.json({ Reviews: reviewsJsonArr })
})

router.post('/:id/images', requireAuth, async (req, res, next) => {
  const reviewId = req.params.id
  const review = await Review.findByPk(reviewId)

  if (!review) {
    const err = Error("Review couldn't be found")
    err.status = 404
    return next(err)
  }
  else if (req.user.id !== review.userId) {
    const err = Error("Forbidden")
    err.status = 403
    return next(err)
  } 
  else {
    const reviewImgs = await ReviewImage.findAll({
      where: {
        reviewId: reviewId
      }
    })

    const reviewImgArr = []

    for (const reviewImg of reviewImgs) {
      reviewImgArr.push(reviewImg)
    }

    if (reviewImgArr.length >= 10) {
      const err = Error("Maximum number of images for this resource was reached")
      err.status = 403
      return next(err)
    }

    const { url } = req.body

    const img = await ReviewImage.create({
      reviewId, url
    })

    imgJson = img.toJSON()

    delete imgJson.revieId
    delete imgJson.createdAt
    delete imgJson.updatedAt

    return res.json(imgJson)
  }
})

router.put('/:id', requireAuth, validateReview, async (req, res, next) => {
  const reviewEdit = await Review.findByPk(req.params.id)

  if (!reviewEdit) {
    const err = Error("Review couldn't be found")
    err.status = 404
    return next(err)
  }
  else if (req.user.id !== reviewEdit.userId) {
    const err = Error("Forbidden")
    err.status = 403
    return next(err)
  }
  
  const { review, stars } = req.body

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
  else if (req.user.id !== reviewEdit.userId) {
    const err = Error("Forbidden")
    err.status = 403
    return next(err)
  }

  await review.destroy()
  return res.json({
    message: "Successfully deleted" 
  })
})

module.exports = router;