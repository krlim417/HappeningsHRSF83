angular.module('app')
  .service('search', function landingRedirect($http) {

    this.filter = (input) => {
      console.log(input);
      $http.get('/search', { data: { input } })
        .then((response) => {
          console.log('Successfully posted to /home for redirect from the landing page.');
          this.result = response.data;
        })
        .catch(() => {
          console.log('Failed to post to /home for redirect from the landing page.');
        });
    };
  });
