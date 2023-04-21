const express = require('express');
const router = express.Router();
const favsCtrl = require('../../controllers/api/favorites')

//GET api/favorites
router.get('/', favsCtrl.locations)

//POST api/favorites/:cityName
router.post('/:cityName', favsCtrl.saveLocation)

module.exports = router;