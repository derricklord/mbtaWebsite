angular.module('MyApp')
  .controller('PageCtrl', function($scope, $auth, $alert, Page, User, $stateParams) {

    /**
     * Get Page Information
     */
    $scope.getData = function() {
      Page.getPages()
        .success(function(data) {
          $scope.data = data.pages;
          $scope.user = User.getUser();
          
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
    
    $scope.deletePage = function(id){
         Page.deletePage(id)
        .success(function(data) {
          $alert({
            content: 'Page deleted',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
            $scope.getData();
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


/*

        
        */