const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    location: {type: String, required: true},
    //ref User model because only a user should be able to save locations
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = mongoose.model('Favorite', favoriteSchema)
