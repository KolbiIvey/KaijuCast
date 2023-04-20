const Favorite = require('../../models/favorite')


module.exports = {
    locations,
    saveLocation
}

async function locations(req, res) {
    const favLocations = await Favorite.find({user: req.user._id});
    console.log(favLocations)
    res.json(favLocations)
}

async function saveLocation(req, res) {

    const favLocations = await Favorite.find({
        user: req.user._id
    })
    if(favLocations.length >= 9) {
        return res.status(400).json({message: 'Max Number of saveable locations reached'})
    }
    
    const existingFavLocation = await Favorite.findOne({
      location: req.params.cityName,
      user: req.user._id
    });
  
    if (existingFavLocation) {
      return res.status(400).json({ message: 'Location already saved.' });
    }
  
    const newFavLocation = new Favorite({
      location: req.params.cityName,
      user: req.user._id
    });
  
    await newFavLocation.save();
    res.json(newFavLocation);
  }