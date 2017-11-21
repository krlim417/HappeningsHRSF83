angular.module('app')

  .service('landingRedirector', function landingRedirect($http) {
    this.redirectHome = function redirectHome(city) {
      return $http.post('/home', city)
        .then(() => {
          console.log('Successfully posted to /home for redirect from the landing page.');
        })
        .catch(() => {
          console.log('Failed to post to /home for redirect from the landing page.');
        });
    };
  });
