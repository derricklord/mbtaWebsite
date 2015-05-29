angular.module('MyApp')
  .controller('LoginCtrl', function($scope, $alert, $auth, Account, User) {
    $scope.login = function() {
      $auth.login({ email: $scope.email, password: $scope.password })
        .then(function() {
          Account.getProfile()
            .success(function(data) {
              console.log(data);
              
              //Account.updateUser(data);
              //console.log(Account.getUser());
              
              //User.setUser(data);
              
              //console.log(User.getUser);
              
              var message = 'You have successfully logged ';
              
              $alert({
                content: message,
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 3
              });           
            });
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
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {  
          Account.getProfile()
            .success(function(data) {
              Account.updateUser(data);
              User.setUser(data);
              
              var message = 'You have successfully logged in as ' + User.getDisplayName();
              
              $alert({
                content: message,
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 3
              });           
            });
        })
        .catch(function(response) {
          $alert({
            content: response.data ? response.data.message : response,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };
  });