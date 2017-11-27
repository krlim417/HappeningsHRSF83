angular.module('app')
  .service('like', function likes($http) {
    /**
     * Function that sends a post request to the /like route of the server to modify like values in the database
     * @param  {object} event - which event is getting its like value changed
     */
    this.adjust = (event) => {
      $http.post('/like', event);
    };
  });