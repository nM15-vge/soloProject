const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Photo } = require('../../db/models/index');

router.get('/', asyncHandler(async( req, res) => {
  const photos = await Photo.findAll({where: {public: true}, limit: 12, order:[['createdAt', 'DESC']]});
  res.json(photos);
}));

module.exports = router;
