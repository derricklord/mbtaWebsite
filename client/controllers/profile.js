angular.module('MyApp')
  .controller('ProfileCtrl', function($scope, $auth, $alert, Account, User, $geolocation) {
    $scope.user = {
        displayName:'',
        picture: '',
        email: '',
        isAdmin: false
    };
    
    $scope.loading = true;
    $scope.map = { center: { latitude: 21.308, longitude: -157.860 }, zoom: 14, pan:true };
    $scope.marker = {
          id: 0,
          coords: {
            latitude: 21.308,
            longitude: -157.860
          },
          options: { 
              draggable: false,
              animation: 0
          },
          title:'',
    }
    
    $scope.markers = [
        {
            id: 1,
            icon: {url:'/img/mbta_map_logo.png'},
            coords: {
                latitude: 21.308,
                longitude: -157.860
            },
            options: {
                draggable: false,
                opacity: .7,
                cursor: 'Main Office'
            },
            title: 'Main Office',
        }
    ];
    
    $scope.windowOptions = {
        visible: true
    }

    $scope.onClick = function() {
        $scope.windowOptions.visible = !$scope.windowOptions.visible;
    };

    $scope.closeClick = function() {
        $scope.windowOptions.visible = false;
    };


    /**
     * Get user's profile information.
    */
    $scope.getProfile = function() {
      Account.getProfile()
        .success(function(data) {
          User.setUser(data);

          $scope.isAdmin = User.isAdmin();
          $scope.user.displayName = data.displayName;
          $scope.user.email = data.email;
          $scope.user.picture = data.picture;
          
          $geolocation.getCurrentPosition({
              timeout: 60000
          }).then(function(position){
              $scope.map.latitude = position.coords.latitude;
              $scope.map.longitude = position.coords.longitude;
              $scope.marker.coords.latitude = position.coords.latitude;
              $scope.marker.coords.longitude = position.coords.longitude;
              
              $scope.map.center.latitude = position.coords.latitude;
              $scope.map.center.longitude = position.coords.longitude;


              $scope.marker.title = 'current location: ' + $scope.user.displayName;
              $scope.markers.push($scope.marker);
              $scope.loading = false;
                           
                $alert({
                      content: 'Now Displaying your location!',
                      animation: 'fadeZoomFadeDown',
                      type: 'material',
                      duration: 3
                  });
          });
          
        })
        .error(function(error) {
          $alert({
            content: error.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };

    
    

    /**
     * Update user's profile information.
     */
    $scope.updateProfile = function() {
      Account.updateProfile({
        displayName: $scope.user.displayName,
        email: $scope.user.email,
        picture: $scope.user.picture
      }).then(function() {
        $alert({
          content: 'Profile has been updated',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      });
    };

    /**
     * Link third-party provider.
     */
    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          $alert({
            content: 'You have successfully linked ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .then(function() {
          $scope.getProfile();
        })
        .catch(function(response) {
          $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };

    /**
     * Unlink third-party provider.
     */
    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          $alert({
            content: 'You have successfully unlinked ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .then(function() {
          $scope.getProfile();
        })
        .catch(function(response) {
          $alert({
            content: response.data ? response.data.message : 'Could not unlink ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };

    $scope.getProfile();

  });