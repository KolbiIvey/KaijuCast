const express = require('express');
const router = express.Router();
const favsCtrl = require('../../controllers/api/favorites')

//GET api/favorites
router.get('/favorites', favsCtrl.locations)

//POST api/favorites
router.post('/favorites', favsCtrl.saveLocation)