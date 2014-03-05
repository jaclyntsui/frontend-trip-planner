var my_trip = [];
var num_days = 0;
var current_day = 0;
var item_types = ['hotel', 'restaurant', 'thingtodo'];


var addNewDay = function(){
	my_trip.push({
		hotels: [],
		thingtodos: [],
		restaurants: []
	});

 var display_day = num_days + 1;
  $('#day_buttons').append("<button type='button' id='day_button_"+num_days+"' class='btn btn-default'>Day "+display_day+"</button>");

  var this_day = num_days;
  $('#day_button_'+num_days).click(function() {
    toggleToDay(this_day);
  });

  num_days++;
};

var toggleToDay = function(day){
	current_day = day;
	$('day_button_'+current_day).addClass('active');

	//reset the item list to load trip plan items from the current_day
	var day_items = my_trip[current_day];
	var type_items;
	item_types.forEach(function(type){
		$('#'+type+'_list').html('');

		type_items = day_items[type+'s'];
		type_items.forEach(function(item){
		addItemHtml(type, item);
		});
	});
};

var addItemHtml = function (type, item) {
  $('#'+type+'_list').append("<li>"+ item.place[0].name +"</li>");
};

// hotel, thingtodo, restaurant
var addItem = function(type){
	var selected_value = $('#'+type+'_select').val();
	var item_key = selected_value.split("_")[1];
	var item = window[type+'s_obj'][item_key];
	addItemHtml(type, item);
	my_trip[current_day][type+'s'].push(item);

	var myLatlng = new google.maps.LatLng(item.place[0].location[0], item.place[0].location[1]);
	var marker = new google.maps.Marker({position: myLatlng, map: map, title: item.place[0].name});
	marker.setMap(map);
};

var initEvents = function(){
	item_types.forEach(function(type){
		$('#'+type+'_add_button').click(function(e){
			addItem(type);
		});
	});
	$('#add_day_button').click(function(){
		addNewDay();
	})
};

var initApp = function(){
  initialize_gmaps();
	initEvents();
	addNewDay();
	$('#day_button_'+current_day).removeClass('active');
};

// $('#hotel_add_button').click(function(e){
// 	var selected_value = $('#hotel_select').val();
// 	var hotel_key = selected_value.split("_")[1];
// 	var hotel = hotels_obj[hotel_key];
// 	// alert("hotel you chose: "+hotel.place[0].name);
// 	// alert('you trying to add a hotel?');
// 	$('#hotel_list').append("<li>"+ hotel.place[0].name+"</li>")
// 	my_trip[current_day].hotels.push(hotel);

  // initialize new google maps LatLng object
  // var myLatlng = new google.maps.LatLng(hotel.place[0].location[0], hotel.place[0].location[1]);
  // Add the marker to the map
//   var marker = new google.maps.Marker({
//     position: myLatlng,
//     // map: map,
//     title:hotel.place[0].name
//   });
//     marker.setMap(map);
// });

// $('#restaurant_add_button').click(function(e){
// 	// alert('button works!');
// 	var selected_value = $('#restaurant_select').val();
// 	var restaurant_key = selected_value.split("_")[1];
// 	var restaurant = restaurants_obj[restaurant_key];
// 	$('#restaurant_list').append("<li>"+ restaurant.place[0].name+"</li>")
// 	my_trip[current_day].restaurant.push(hotel);
// });

// $('#thingtodo_add_button').click(function(e){
// 	var selected_value = $('#thingtodo_select').val();
// 	var thingtodo_key = selected_value.split("_")[1];
// 	var thingtodo = thingtodos_obj[thingtodo_key];
// 	$('#thingtodo_list').append("<li>"+ thingtodo.place[0].name+"</li>")
// 	my_trip[current_day].ttd.push(hotel);
// });