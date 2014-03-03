
/*
 * GET home page.
 */

var models = require('../models');
exports.index = function(req, res){
  models.Hotel.find(function(err, hotels) {
  	models.ThingsToDo.find(function(err, thingtodos){
  		models.Restaurant.find(function(err, restaurants){
  			res.render('index', { all_hotels: hotels, all_thingstodo: thingtodos, all_restaurants: restaurants });
  		});
  	});
  });
};

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
// };