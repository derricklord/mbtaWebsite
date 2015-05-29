angular.module('MyApp')
  .controller('SlugCtrl', function($scope, $auth, $alert, Page, $stateParams, User) {

    /**
     * Get Page Information
     */
    var slug = $stateParams.slug;
    
    $scope.getData = function() {
      Page.getPage(slug)
        .success(function(data) {
          $scope.data = data.page;
          $scope.user = User.getUser();
          if(!$scope.data.image){
            $scope.data.image = '/img/elementary.png';
          }
          
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