angular.module('MyApp')
  .controller('EditPageCtrl', function($scope, $auth, $state, $alert, Page, User, $stateParams, $location ) {  

    
     var slug = $stateParams.slug;
    
    $scope.getData = function() {
      Page.getPage(slug)
        .success(function(data) {
          $scope.page = data.page;
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


  
    $scope.updatePage = function() {
      $scope.user = User.getUser();
      console.log($scope.user);
      Page.updatePage({
        _id: $scope.page._id,
        title: $scope.page.title,
        slug: $scope.page.slug,
        body: $scope.page.body,
        image: $scope.page.image,
        created_by: $scope.user.id
      }).then(function(response) {      
          $alert({
          content: 'Page has been Updated!',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
          });
          
          var page = response.data.page;
          console.log('/#/p/' + page.slug );
          $state.go('slugpage', {slug: page.slug});
      });
    };
    
    $scope.getData(); 
});