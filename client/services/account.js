angular.module('MyApp')
  .factory('Account', function($http, User) {
    return {
      getProfile: function(id) {
        return $http.get('/api/me');
      },
      updateProfile: function(id, profileData) {
        return $http.put('/api/me', profileData);
      },
      getData: function(){
        return $http.get('/test');
      },
      getUsers: function(){
        return $http.get('/users');
      },
    };
  });

angular.module('MyApp')
    .service('User', function(){
        var info = {
            id: '',
            isAdmin: false,
            displayName: '',
            picture: '',
        };

        return {
                setUser: function(data){
                    info.id = data._id;
                    info.isAdmin = data.isAdmin;
                    info.displayName = data.displayName;
                    info.picture = data.picture;
                },
                getUser: function(){
                    return info;
                },
                isAdmin: function(){
                    return info.isAdmin;
                },
                clearUser: function(){
                    var info = {
                        id: '',
                        isAdmin: false,
                        displayName: '',
                        picture: '',
                    };
                },
                getDisplayName: function(){
                    return info.displayName;
                }
        }
    });