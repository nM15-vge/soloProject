const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Photo, CommentPhoto, StarPhoto, User } = require('../../db/models/index');


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
  const { id } = req.params;
  const comments = await CommentPhoto.findAll({
    where: {photoId: id}, include: {model: User}})
  res.json(comments);
}));+



router.delete('/:id/comments/:id', asyncHandler(async(req, res) => {
  const { id } = req.params;
  await CommentPhoto.destroy({where: {commentId: id}});
  res.json({'success': 'hello'});
}));

router.get('/:id/stars',  asyncHandler(async(req, res) => {
  const { id } = req.params;
  const stars = await StarPhoto.findAll({where: {photoId: id}});
  let count = 0;
  stars.forEach(star => {
    count += star.star});
  res.json({[id]: count});
}));


router.delete('/:id/stars/', requireAuth, asyncHandler(async(req, res) => {
  const { photoId, userId } = req.body;
  await StarPhoto.destroy({where: { photoId, userId }});
  res.json({'success': 'deleted'});
}));

module.exports = router;
