const Favorite = require('../../models/favorite')


module.exports = {
    locations,
    saveLocation
}

async function locations(req, res) {
    const favLocations = await Favorite.find({user: req.user._id});
    res.json(favLocations)
}

async function saveLocation(req, res) {
    const newFavLocation = new Favorite({
        location: req.body.location,
        user: req.user._id
    })
    await newFavLocation.save();
    res.json(newFavLocation)
}