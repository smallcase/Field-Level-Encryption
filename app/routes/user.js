var router = require('express').Router();
const searchController = require('../controller/user');

router.route('/').get(searchController.getUser);
router.route('/').post(searchController.addUser);
router.route('/aggregate').get(searchController.aggregate);

module.exports = router;
