const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Photo, CommentPhoto, StarPhoto, User } = require('../../db/models/index');
const { singlePublicImageUpload, singleMulterUpload } = require("../../awsS3")

router.get('/public', asyncHandler(async( req, res) => {
  const photos = await Photo.findAll({where: {public: true}, limit: 12, order:[['createdAt', 'ASC']]});
  res.json(photos);
}));
router.get('/:id', asyncHandler(async(req, res) => {
  const { id } = req.params
  const photo = await Photo.findByPk(id, {include: {model: CommentPhoto}});
  res.json(photo);
}))
router.post('/', singleMulterUpload("image"), requireAuth, asyncHandler(async(req, res) => {
  const { title, description, userId, publicPrivate } = req.body;
  const imageUrl = await singlePublicImageUpload(req.file);
  if(imageUrl){
    await Photo.create({imageUrl, title, description, userId, public: publicPrivate});
    const photos = await Photo.findAll({where: {userId}})
    res.json(photos)
    return
  };
  res.status(400);
  res.send({"errorMessage": "Failed to upload image."})
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

router.patch('/:id/comments/:id', asyncHandler(async(req, res) => {
  const {comment, commentId} = req.body;
  const updatedComment = await CommentPhoto.update({comment}, {where: {id: commentId}});
  res.json((updatedComment));
}))


router.delete('/:id/comments/:id', asyncHandler(async(req, res) => {
  const { id } = req.params;
  await CommentPhoto.destroy({where: {id}});
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
