var router = require('express').Router();
const youtubeController = require('../controller/youtube');

router.route('/').get(youtubeController.test);

module.exports = router;
