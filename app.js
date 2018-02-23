
  var map;


  var markers = [];

  function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:39.9, lng: 116.3},
      zoom: 8,
      mapTypeControl: false
    });


    var locations = [
      {title: '张家口',detail:'<div><a target="_blank" href="https://zh.wikipedia.org/wiki/%E5%BC%A0%E5%AE%B6%E5%8F%A3%E5%B8%82">资料</a></div>'+'<div>中国冬奥会主办城市</div>', location: {lat: 40.792472, lng: 114.888833}},
      {title: '保定',detail:'<div><a target="_blank" href="https://zh.wikipedia.org/zh-sg/%E4%BF%9D%E5%AE%9A%E5%B8%82">资料</a></div>'+'<div>河北城市</div>', location: {lat: 38.869233, lng: 115.484022}},
      {title: '廊坊',detail:'<div><a target="_blank" href="https://zh.wikipedia.org/wiki/%E5%BB%8A%E5%9D%8A%E5%B8%82">资料</a></div>'+'<div>河北城市</div>', location: {lat: 39.545523, lng: 116.690439}},
      {title: '天津',detail:'<div><a target="_blank" href="https://zh.wikipedia.org/wiki/%E5%A4%A9%E6%B4%A5%E5%B8%82">资料</a></div>'+'<div>北方重要港口</div>', location: {lat: 39.348620, lng: 117.364023}},
      {title: '唐山',detail:'<div><a target="_blank"href="https://zh.wikipedia.org/wiki/%E5%94%90%E5%B1%B1%E5%B8%82">资料</a></div>'+'<div>重工业城市</div>', location: {lat: 39.647777, lng: 118.187355}},
      {title: '北京',detail:'<div><a target="_blank" href="https://zh.wikipedia.org/zh-sg/%E5%8C%97%E4%BA%AC%E5%B8%82">资料</a></div>'+'<div>中国首都</div>', location: {lat: 39.918785, lng: 116.420414}}
    ];

    var largeInfowindow = new google.maps.InfoWindow({maxWidth: 200});

    for (var i = 0; i < locations.length; i++) {
      var position = locations[i].location;
      var title = locations[i].title;
      var detail = locations[i].detail;
      document.getElementById('list').innerHTML+='<ul>'+title+'<ul>';
       var marker = new google.maps.Marker({
        position: position,
        title: title,
        detail:detail,
        animation: google.maps.Animation.DROP,
        id: i
      });

      markers.push(marker);

      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      });
    }
    showListings();
    document.getElementById('zoom-to-area-text').addEventListener('click', function () {
                        this.value= " ";
    });
    document.getElementById('zoom-to-area').addEventListener('click', function () {
      //zoomToArea()
      findAdress();
    });

  }
function findAdress() {
  var address = document.getElementById('zoom-to-area-text').value;
  document.getElementById('list').innerHTML = '<ul>'+address+'</ul>';
  hideListings();
  var marker = new google.maps.Marker({
   position: position,
   title: title,
   detail:detail,
   animation: google.maps.Animation.DROP,
   id: i
 });
  marker.addListener('click', function() {
    populateInfoWindow(this, largeInfowindow);
  });
}
/*function zoomToArea() {
  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById('zoom-to-area-text').value;
  if(address == ''){
    window.alert('请输入地址');
  }else{
    geocoder.geocode(
           { address: address,
             componentRestrictions: {locality: 'bei jing'}
           }, function(results, status) {
             if (status == google.maps.GeocoderStatus.OK) {
               map.setCenter(results[0].geometry.location);
               map.setZoom(10);
        }else{
          window.alert('您要求的地址我没有找到，请换一个方式在试一下。')
        }
      }
    );
  }
}*/

  function populateInfoWindow(marker, infowindow) {

    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>'+'<div>' + marker.detail + '</div>');
      infowindow.open(map, marker);

      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
    }
  }


  function showListings() {
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  }


  function hideListings() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }
