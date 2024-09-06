const express = require('express');
const router = express.Router(); 
const userController = require('../controllers/UserController');

router.post('/createsub', userController.createSubscription);
router.get('/allSubData', userController.getSubData);
router.post('/removerecord', userController.deleteSingleRecord);

//plan routes

router.post('/createplan', userController.createPlan);
router.post('/createpackage', userController.createPackage);

module.exports = router;