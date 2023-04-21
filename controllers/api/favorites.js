const Favorite = require('../../models/favorite')


module.exports = {
    locations,
    saveLocation
}

//function to get all of the saved favorite locations for a user
async function locations(req, res) {
  //Querying the database to get all of the favorites for the current user
    const favLocations = await Favorite.find({user: req.user._id});
    //send the favorites as a JSON response to the client
    res.json(favLocations)
}

//function to save a new location for a user
async function saveLocation(req, res) {
  //Querying the database to get all of the favorites for the current user
    const favLocations = await Favorite.find({
        user: req.user._id
    })
    //checking if user has already saved the max amount of locations
    if(favLocations.length >= 9) {
      //sending error response to the client to the client
        return res.status(400).json({message: 'Max Number of saveable locations reached'})
    }
    
    //checking if user has already saved the current location
    const existingFavLocation = await Favorite.findOne({
      location: req.params.cityName,
      user: req.user._id
    });
  
    if (existingFavLocation) {
      //sending error response to client
      return res.status(400).json({ message: 'Location already saved.' });
    }
  
    //Creating a new fav location document in the database
    const newFavLocation = new Favorite({
      location: req.params.cityName,
      user: req.user._id
    });
  //saving new location to the database
    await newFavLocation.save();
    //sending new favorite location as a JSON response to the client
    res.json(newFavLocation);
  }