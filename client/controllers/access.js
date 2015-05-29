angular.module('MyApp')
  .controller('AccessCtrl', function($scope, $auth, $alert, Account) {

    /**
     * Get user's profile information.
     */
    $scope.getData = function() {
      Account.getData()
        .success(function(data) {
          $scope.data = data.students;
          $alert({
            content: 'Student data loaded',
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
    $scope.user = Account.user;

  });