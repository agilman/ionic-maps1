angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$log, $ionicPlatform,$cordovaGeolocation) {
    angular.extend($scope, {
        tiles: {
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        },
        pdxCenter: {
            lat: 45.51883,
            lng: -122.629,
            zoom: 9
        },
        markers: {
            osloMarker: {
            lat: 32.07883,
            lng: 34.773259,
            message: "I want to travel here!",
            focus: true,
            draggable: false
            }
        },
        defaults: {
            scrollWheelZoom: false,
            zoomControl: false
        }
    });
    
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
