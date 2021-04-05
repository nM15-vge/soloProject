const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Album, PhotoAlbum, CommentAlbum } = require('../../db/models');

router.get('/public', asyncHandler(async( req, res) => {
  const albums = await Album.findAll({where: {public: true}, limit: 12, order:[['createdAt', 'DESC']]});
  res.json(albums);
}));

router.post('/', requireAuth, asyncHandler(async(req, res) => {
  const { title, description, photos } = req.body
  const album = await Album.create({userId: req.user.id, title, description})
  photos.forEach(id => PhotoAlbum.create({albumId: album.id, photoId: id}))
  res.json({'success': 'hello'});
  // res.redirect(`/api/users/${req.users.id}/albums`);
}));

router.put('/:id', requireAuth, asyncHandler(async(req, res) => {
  const {albumId, title, description, photos } = req.body;
  const album = await Album.update({title, description, photos}, {where: {id: albumId}})
}))

router.get('/:id/comments', asyncHandler(async(req, res) => {
  const { albumId } = req.params;
  const comments = await CommentAlbum.findAll({where: {albumId}});
  res.json(comments);
}));

router.delete('/:id/comments/:id', asyncHandler(async(req, res) => {
  const { commentId } = req.params;
  await CommentAlbum.destroy({where: {commentId}});
  res.json({'success': 'hello'});
}));

router.get('/:id/stars', asyncHandler(async(req, res) => {
  const { albumId } = req.params;
  const stars = await StarAlbum.findAll({where: {albumId}});
  let count;
  stars.forEach(star => count += star.star);
  res.json({stars: count});
}));


router.delete('/:id/stars/:id', requireAuth, asyncHandler(async(req, res) => {
  const { starId } = req.params;
  await StarAlbum.destroy({where: {starId}});
  res.json({'success': 'hello'});
}));

module.exports = router;
