var router = require('express').Router();
const searchController = require('../controller/search');

const apiCache = require('apicache');
const cache = apiCache.middleware;
const onlyStatus200 = (req, res) => res.statusCode === 200;
const cacheWithSuccess = cache('8 second', onlyStatus200);

router.route('/').get(cacheWithSuccess, searchController.getPaginatedData);
router.route('/filter').get(cacheWithSuccess, searchController.getFilteredData);

module.exports = router;
