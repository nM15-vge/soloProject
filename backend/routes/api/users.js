const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Album, Photo, StarAlbum, StarPhoto, CommentPhoto, CommentAlbum } = require('../../db/models');
const { validateSignup, validateComment } = require('../../utils/check');

router.post('', validateSignup, asyncHandler(async(req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  const user = await User.signup({ firstName, lastName, email, username, password });
  await setTokenCookie(res, user);
  return res.json({
    user,
  })
}));

router.get('/:id/albums', requireAuth, asyncHandler(async(req, res) => {
  const albums = await Album.findAll({where: {userId: req.user.id}, include: {model: Photo}});
  res.json(albums)
}));

router.get('/:id/photos', requireAuth, asyncHandler(async(req, res) => {
  const photos = await Photo.findAll({where: {userId: req.user.id}});
  res.json(photos)
}));

router.post('/:id/albums/:id/stars', requireAuth, asyncHandler(async(req, res) => {
  const { userId, albumId } = req.params;
  await StarAlbum.create({star: 1, userId, albumId });
  res.json({'success': 'hello'});
}));

router.post('/:id/photos/:id/stars', requireAuth, asyncHandler(async(req, res) => {
  const { userId, photoId } = req.body;
  await StarPhoto.create({star: 1, userId, photoId});
  res.json({'success': 'hello'});
}));


router.post('/:id/photos/:id/comments', requireAuth, validateComment, asyncHandler(async(req, res) => {
  const { comment, userId, photoId } = req.body;
  const newComment = await CommentPhoto.create({comment, photoId, userId});
  res.json({'success': 'hello'})
}));

router.post('/:id/albums/:id/comments', requireAuth, asyncHandler(async(req, res) => {
  const { userId, albumId } = req.params;
  const { comment } = req.body;
  const newComment = await CommentAlbum.create({comment, albumId, userId});
  res.json({'success': 'hello'})
}));



module.exports = router;
