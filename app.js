var map;//创建一个变量
var marker;//创建一个变量存储marker
var markers= [];//创建一个数组用来存放marker
var locations = [{//默认地点数组
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
var AllLocations = [{//另一个数组
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

function initMap() {//初始化地图
  map = new google.maps.Map(document.getElementById('map'),{
    center:{lat: 39.917694, lng:116.398504},//给出中心坐标
    zoom:13//给出精度
  });
  renderMarker();//地图渲染
}

function select(places) {//筛选地点并生成需要现实的地点数组
  hideListings();
   locations = [];
  for(var i=0;i<AllLocations.length;i++){
    if(AllLocations[i].kind == places){
      locations.push(AllLocations[i]);
    }
  }
  renderMarker();
  //showListings();
}
function renderMarker(){//渲染地图函数
      //select();
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

function populateInfoWindow(marker,infowindow) {//信息窗口函数
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

function hideListings() {//隐藏marker函数
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function showListings() {//显示marker函数
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}
