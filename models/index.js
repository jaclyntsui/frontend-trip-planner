	var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tripplanner');
var Schema = mongoose.Schema;

var placeSchema = new Schema({
  name: String,
  address: String,
  city: String,
  phone: String,
  location: [Number, Number]
});


var hotelSchema = new Schema({
  place: [placeSchema],
  num_stars: Number,
  amenities: String
});

var thingtodoSchema = new Schema({
	place: [placeSchema],
	age_range: String
});

var restaurantSchema = new Schema({
	place: [placeSchema],
	cuisine: String,
	price: Number
});

exports.Place = mongoose.model('Place', placeSchema);
exports.Hotel = mongoose.model('Hotel', hotelSchema);
exports.ThingsToDo = mongoose.model('ThingsToDo', thingtodoSchema);
exports.Restaurant = mongoose.model('Restaurant', restaurantSchema);