angular.module('MyApp')
  .controller('NewPageCtrl', function($scope, $auth, $state, $alert, Page, $stateParams, $location, User ) {  
    $scope.user = User.getUser();
    /**
     * Add New Page
     */
    $scope.editorOptions = {
        allowedContent: true
    };
    
    $scope.postPage = function() {
      Page.postPage({
        title: $scope.page.title,
        slug: $scope.page.slug,
        body: $scope.page.body
      }).then(function(response) {      
          $alert({
          content: 'Page has been Added!',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
          });
          
          var page = response.data.page;
          console.log('/#/p/' + page.slug );
          $state.go('slugpage', {slug: page.slug});
      });
    };
});