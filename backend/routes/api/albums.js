const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Album, Photo } = require('../../db/models');

router.get('/public', asyncHandler(async( req, res) => {
  const albums = await Photo.findAll({where: {public: true}, limit: 12, order:[['createdAt', 'DESC']]});
  res.json(photos);
}));

router.get('/private', requireAuth, asyncHandler(async(req, res) => {
  const albums = await Photo.findAll({where: {userId: req.user.id}});
  res.json(photos)
}));

router.post('/', requireAuth, asyncHandler(async(req, res) => {
  const { title, description, photos } = req.body
  const album = await Album.create({userId: req.user.id, title, description})
  photos.forEach(id => Photo.update({albumId: album.id},{where: {id} }))
  res.json({'success': 'hello'});
}));
module.exports = router;
