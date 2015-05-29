angular.module('MyApp')
  .controller('NavbarCtrl', function($scope, $auth, $location, $anchorScroll, Account, User) {
        
    $scope.isAuthenticated = function() { 
      return $auth.isAuthenticated();
    };
    
    $scope.isAuthorized = false;
    
    $scope.checkAuthorized = function(){
        if($auth.isAuthenticated()){
            console.log(User.isAdmin());
            $scope.isAuthorized = User.isAdmin();
        }else{
            $scope.isAuthorized = false;
        }
        
    };

    $scope.about = function(){
    	$location.url('/#/').hash('aboutUs');
    };

    $scope.whatsHappening = function(){
    	$location.url('/#/').hash('whatsHappening');
    };
    
    $scope.init = function(){
        if($auth.isAuthenticated()){
            var user = User.getUser();
            $scope.user = user.displayName;
            $scope.checkAuthorized();
        }else{
            $scope.user = 'Not Logged in';
        }
    };
    
    $scope.init();
  });