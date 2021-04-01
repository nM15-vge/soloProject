const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const photosRouter = require('./photos');
const albumsRouter = require('./albums');


router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/photos', photosRouter);
router.use('/albums', albumsRouter);


module.exports = router;
