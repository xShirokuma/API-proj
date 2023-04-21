const express = require('express');

const { requireAuth } = require('../../utils/auth')
const { Spot, SpotImage, Booking, Review, ReviewImage, User } = require('../../db/models');

const router = express.Router()

router.delete('/:id', requireAuth, async (req, res, next) => {
  const img = await SpotImage.findByPk(req.params.id)

  await img.destroy()

  return res.json({
    message: "Successfully deleted" 
  })
})

module.exports = router;