angular.module('app')
  .service('like', function likes($http) {
    this.adjust = (event) => {
      $http.post('/like', event);
    };
  });