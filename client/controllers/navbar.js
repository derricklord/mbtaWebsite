angular.module('MyApp')
  .controller('NavbarCtrl', function($scope, $auth, $location, $anchorScroll, Account, User) {
        
    $scope.isAuthenticated = function() { 
      return $auth.isAuthenticated();
    };
    
    
    $scope.checkAuthorized = function(){
        if($auth.isAuthenticated()){
            $scope.isAuthorized = User.isAdmin();
        }   
    };

    $scope.about = function(){
    	$location.url('/#/').hash('aboutUs');
    };

    $scope.whatsHappening = function(){
    	$location.url('/#/').hash('whatsHappening');
    };
    
    $scope.init = function(){
        $scope.isAuthorized = User.isAdmin() || false;
    }
    
    $scope.init();
  });