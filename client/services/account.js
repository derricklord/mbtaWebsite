angular.module('MyApp')
  .factory('Account', function($http, User) {
    var user =  {};
    
    return {
      getUser: function(){
        return this.user;
      }, 
      updateUser: function(data){
        this.user = data;
        User.setUser(data);
      },
      getProfile: function() {
        return $http.get('/api/me');
      },
      updateProfile: function(profileData) {
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
        var info = {};


        this.setUser = function(data){
            info = data;
            window.localStorage['mbtaInfo'] = JSON.stringify(data);

        };
        
        this.getUser = function(){
            if(info.displayName){
                return info;
            }else{
                if(window.localStorage['mbtaInfo']){
                  var storedData = JSON.parse(window.localStorage['mbtaInfo']);
                  return storedData;
                }else{
                  return {message:'User object empty', isAdmin: false};
                } 
            }
            

        };
        
        this.isAdmin = function(){
            if(info.isAdmin){
                return info.isAdmin;
            }else{
                return false;
            }
        };
    
        this.clearUser = function(){
            var info = {};
            window.localStorage.removeItem('mbtaInfo');
        };
        
        this.getDisplayName = function(){
            return info.displayName;
        };
    });