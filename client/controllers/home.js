angular.module('MyApp')
  .controller('HomeCtrl', ['$scope', function($scope, $auth, $location, $anchorScroll, User) {
  	$scope.message = 'Equity & Excellence';
      
    $scope.isAuthorized = function(){
        return User.isAdmin();
    };
}]);