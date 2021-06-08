var router = require('express').Router();
const searchController = require('../controller/search');

router.route('/').get(searchController.getPaginatedData);

module.exports = router;
