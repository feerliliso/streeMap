function MyViewModel() {
    var self = this;
    self.places = ko.observableArray(['旅店', '饭馆', '超市','公园','博物馆']);

    // The current item will be passed as the first parameter, so we know which place was hovered over

    self.logMouseClick = function(places) {
      if (places == '旅店') {

        hideListings();
        showListings();

        }
      if (places == '饭馆') {

      }
      if (places == '超市') {

      }
      if (places == '公园') {

      }
      if (places == '博物馆') {

        hideListings();
        showListings();
      }

    }
    
}

ko.applyBindings(new MyViewModel());
