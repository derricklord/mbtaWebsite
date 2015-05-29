angular.module('MyApp')
  .controller('UsersCtrl', function($scope, $auth, $alert, Account) {

    /**
     * Get user's profile information.
     */
    $scope.getData = function() {
      Account.getUsers()
        .success(function(data) {
          $scope.users = data;
          $alert({
            content: 'Users data loaded',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
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


    $scope.getData();

  });