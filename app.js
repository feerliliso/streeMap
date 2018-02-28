var map;
var marker;
var markers= [];
var AllLocations = [{
        kind: '博物馆',
        title: '首都博物馆',
        location: {
            lat: 39.906572,
            lng: 116.342069
        }
    },
    {
        kind: '博物馆',
        title: '中国妇女儿童博物馆',
        location: {
            lat: 39.908468,
            lng: 116.419818
        }
    },
    {
        kind: '博物馆',
        title: '孔庙',
        location: {
            lat: 39.947125,
            lng: 116.414596
        }
    },
    {
        kind: '旅店',
        title: '金融街洲际酒店',
        location: {
            lat: 39.919208,
            lng: 116.357521
        }
    },
    {
        kind: '旅店',
        title: '北京丽晶酒店',
        location: {
            lat: 39.916344,
            lng: 116.419020
        }
    },

];
function initMap() {//初始化地图
  map = new google.maps.Map(document.getElementById('map'),{
    center:{lat: 39.917694, lng:116.398504},//给出中心坐标
    zoom:13//给出精度
});
var locations = [{
        kind: '博物馆',
        title: '首都博物馆',
        location: {
            lat: 39.906572,
            lng: 116.342069
        }
    },
    {
        kind: '博物馆',
        title: '中国妇女儿童博物馆',
        location: {
            lat: 39.908468,
            lng: 116.419818
        }
    },
    {
        kind: '博物馆',
        title: '孔庙',
        location: {
            lat: 39.947125,
            lng: 116.414596
        }
    },
    {
        kind: '旅店',
        title: '金融街洲际酒店',
        location: {
            lat: 39.919208,
            lng: 116.357521
        }
    },
    {
        kind: '旅店',
        title: '北京丽晶酒店',
        location: {
            lat: 39.916344,
            lng: 116.419020
        }
    },];
    var largeinfowindow = new google.maps.InfoWindow();//设置信息窗口
    var bounds = new google.maps.LatLngBounds();
    for(var i = 0;i< locations.length;i++){
      var position = locations[i].location;
      var title = locations[i].title;

      var marker = new google.maps.Marker({

        map:map,
        position:position,
        title:title,
        animation:google.maps.Animation.DROP,
        id:i
      });
      markers.push(marker);
      bounds.extend(marker.position);
      marker.addListener('click',function () {
        populateInfoWindow(this,largeinfowindow);
      });

    }
    map.fitBounds(bounds);
}



  function populateInfoWindow(marker,infowindow) {
    if(infowindow.marker !=marker){
      infowindow.marker = marker;
      infowindow.setContent('<div>'+marker.title+'</div>');
      infowindow.open(map,marker);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      infowindow.addListener('closeclick',function () {
      infowindow.setMarker = null;
      this.marker.setAnimation(google.maps.Animation.DROP);
      });
    }
  }
