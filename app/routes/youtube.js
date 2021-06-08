var router = require('express').Router();
const youtubeController = require('../controller/youtube');

router.route('/').get(youtubeController.getData);

module.exports = router;
