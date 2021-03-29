const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Photo } = require('../../db/models/index')

router.get('/photos', asyncHandler(async( req, res) => {

}))
