angular.module('app')
  .service('search', function go($http, landingRedirector) {
    this.filter = (input, callback) => {
      $http.get(`/search/${landingRedirector.city}/${input}`)
        .then((response) => {
          console.log('Successfully sent get to search route.');
          callback(response.data);
        })
        .catch(() => {
          console.log('Failed to send get request');
        });
    };
  });
