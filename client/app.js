angular.module('MyApp', ['ui.bootstrap', 'ngCkeditor', 'ngResource', 'ngSanitize', 'ngMessages', 'ui.router', 'mgcrea.ngStrap', 'satellizer', 'ngGeolocation', 'uiGmapgoogle-maps'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl'
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('/users', {
        url: '/users',
        templateUrl: 'partials/users.html',
        controller: 'UsersCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();
            deferred.resolve();

            return deferred.promise;
          }
        }        
      }) 
      .state('test', {
        url: '/test',
        templateUrl: 'partials/data.html',
        controller: 'AccessCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }        
      }) 
       .state('pages', {
        url: '/pages',
        templateUrl: 'partials/page.html',
        controller: 'PageCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }        
      }) 
      .state('newpage', {
        url: '/p/new',
        templateUrl: 'partials/newpage.html',
        controller: 'NewPageCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }        
      }) 
      .state('slugpage', {
        url: '/p/:slug',
        templateUrl: 'partials/slug.html',
        controller: 'SlugCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
          }
        }        
      }) 
       .state('editpage', {
        url: '/p/:slug/edit',
        templateUrl: 'partials/editpage.html',
        controller: 'EditPageCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
          }
        }        
      })   
      .state('profile', {
        url: '/profile',
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      });

    $urlRouterProvider.otherwise('/');


    $authProvider.google({
      clientId: '496782544977-q67gsgn3sguk2vcs6hllm5nc33nd4ih1.apps.googleusercontent.com'
    });

  });


angular.module('MyApp')
    .controller('HomePageController', function($scope, $auth, User, Account){
        if($auth.isAuthenticated){
            $scope.user = User.getUser().displayName;
            
        }else{
            $scope.user = 'Guest';
        }
    });