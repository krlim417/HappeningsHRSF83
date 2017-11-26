angular.module('app').service('like', ($http) => {
  this.adjust = (name) => {
    $http.post('/like', name);
  };