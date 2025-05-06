const express = require('express');
const router = express.Router();
const HelloController = require('../controllers/HelloController')


//  This is my first routing
router.get('/hello', HelloController.Hello)

module.exports = router;