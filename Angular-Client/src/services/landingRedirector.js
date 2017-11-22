angular.module('app')

  .service('landingRedirector', function landingRedirect($http, $window) {
    this.result = [];
    this.redirectHome = function redirectHome(city) {
      return $http.post('/home', { location: city })
        .then((response) => {
          console.log('Successfully posted to /home for redirect from the landing page.');
          this.result = response.data;
        })
        .catch(() => {
          console.log('Failed to post to /home for redirect from the landing page.');
          return false;
        });
    };
  });
