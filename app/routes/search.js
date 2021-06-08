var router = require('express').Router();
const searchController = require('../controller/search');

router.route('/').get(searchController.getPaginatedData);
router.route('/filter').get(searchController.getFilteredData);

module.exports = router;
