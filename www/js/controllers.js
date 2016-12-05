angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$log, $ionicPlatform,$cordovaGeolocation) {
    $scope.center = {
      lat: 52.367215,
      lng: 4.893036,
      zoom: 1
    };
    $scope.maxbounds = {};
    $scope.defaults = {
      maxZoom: 16,
      minZoom: 12,
      tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
      tileLayerOptions: {
          opacity: 0.9,
          detectRetina: true,
          reuseTiles: true,
      },
      scrollWheelZoom: true
    };
  
    $ionicPlatform.ready(function() {
        var posOptions = {timeout: 100000, maximumAge:100000, enableHighAccuracy: true};
        $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
            $scope.lat  = position.coords.latitude;
            $scope.long = position.coords.longitude;
        }, function(err) {
            //error
        });
    });
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
