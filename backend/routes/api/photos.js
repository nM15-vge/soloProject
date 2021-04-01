const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Photo, CommentPhoto, StarPhoto } = require('../../db/models/index');

router.get('/public', asyncHandler(async( req, res) => {
  const photos = await Photo.findAll({where: {public: true}, limit: 12, order:[['createdAt', 'DESC']]});
  res.json(photos);
}));

router.post('/', requireAuth, asyncHandler(async(req, res) => {
  const { imageUrl, title, description, userId, public } = req.body;
  const photo = await Photo.create({imageUrl, title, description, userId, public});
  res.json({'succes': 'hello'});
}))
router.delete('/:id', requireAuth, asyncHandler(async(req, res) => {
  const { id } = req.params;
  await Photo.destroy({where: {id}});
  res.json({'success': 'hello'})
}));

//need to finish route below
router.patch('/:id', requireAuth, asyncHandler(async(req, res) => {
  const { id } = req.params;
  res.json({'success': 'hello'})
}));

router.get('/:id/comments', asyncHandler(async(req, res) => {
  const { photoId } = req.params;
  const comments = await CommentPhoto.findAll({where: {photoId}});
  res.json(comments);
}));


router.delete('/:id/comments/:id', asyncHandler(async(req, res) => {
  const { commentId } = req.params;
  await CommentPhoto.destroy({where: {commentId}});
  res.json({'success': 'hello'});
}));

router.get('/:id/stars',  asyncHandler(async(req, res) => {
  const { photoId } = req.params;
  const stars = await StarPhoto.findAll({where: {photoId}});
  let count;
  stars.forEach(star => count += star.star);
  res.json({stars: count});
}));


router.delete('/:id/stars/:id', requireAuth, asyncHandler(async(req, res) => {
  const { starId } = req.params;
  await StarPhoto.destroy({where: { starId }});
  res.json({'success': 'hello'});
}));

module.exports = router;
