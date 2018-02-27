


var map;
var places;
// Create a new blank array for all the listing markers.
var markers = [];

function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:39.934166, lng: 116.381197},
    zoom: 13,
    mapTypeControl: false
  });

  // These are the real estate listings that will be shown to the user.
  // Normally we'd have these in a database instead.
  var locations = [
    {kind:'博物馆',title: '首都博物馆', location: {lat: 39.906572, lng: 116.342069}},
    {kind:'博物馆',title: '中国妇女儿童博物馆', location: {lat: 39.908468, lng: 116.419818}},
    {kind:'博物馆',title: '孔庙', location: {lat:39.947125, lng: 116.414596}},
    {kind:'旅店',title: '金融街洲际酒店', location: {lat:39.919208, lng:116.357521}},
    {kind:'旅店',title: '北京丽晶酒店', location: {lat:39.916344, lng: 116.419020}},

  ];

  var largeInfowindow = new google.maps.InfoWindow();

  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
     var image = 'fly.png';
     var marker = new google.maps.Marker({
     icon: image,
     draggable:true,
      position: position,
      title: title,
      animation: google.maps.Animation.BOUNCE,
      id: i
    });
    // Push the marker to our array of markers.
    if (locations[i].kind == "博物馆") {
      markers.push(marker);
    }

    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
  }


}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
  }
}

// This function will loop through the markers array and display them all.
function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}

// This function will loop through the listings and hide them all.
function hideListings() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}
