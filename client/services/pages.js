angular.module('MyApp')
  .factory('Page', function($http) {
    return {
      getPage: function(slug) {
        return $http.get('/page/'+slug);
      },
      getPages: function(){
        return $http.get('/page');
      },
      postPage: function(pageData) {
        return $http.post('/page', pageData);
      },
      deletePage: function(id){
        return $http.delete('/page/'+id);
      },
      updatePage: function(pageData) {
        return $http.put('/page/'+pageData._id, pageData);
      },       
    };
  });