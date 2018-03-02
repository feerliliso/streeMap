var places;
var ViewModle = function() {
  var self = this;
  self.places_name = ko.observable("");
  self.places = ko.observableArray([
    { name: "饭店", shouldShow: ko.observable(true) },
    { name: "旅店", shouldShow: ko.observable(true) },
    { name: "博物馆", shouldShow: ko.observable(true) }
  ]);
  self.getPlaces = function () {
    places = self.places_name ();
    return places;
  }

  self.Chick_places = function() {
    if(self.places_name()===""){
    alert("请输入你的地址");
  for (var i = 0; i < self.places().length; i++){
    self.places()[i].shouldShow(true);
  }
}else{
    for (var i = 0; i < self.places().length; i++) {
      if (self.places_name() === self.places()[i].name) {
        self.places()[i].shouldShow(true);
      } else {

        self.places()[i].shouldShow(false);
      }
    }
}

  }
};
ko.applyBindings(new ViewModle()); // 注意这个要 new
