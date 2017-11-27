angular.module('app')
  .service('search', function go($http, landingRedirector, confirmRedirector) {
    /**
     * Filter function that searches for events based on inputs and displays them on the home page
     * @param  {} input - the values of the search input, defaults in home.js
     * @param  {} callback - function used to set what is displayed to the results of the search
     */
    this.filter = (input, callback) => {
      $http.get(`/search/${landingRedirector.city}/${input.value}/${input.cost}/${input.duration}/${input.intensity}`)
        .then((response) => {
          console.log('Successfully sent get to search route.');
          callback(response.data);
        })
        .catch(() => {
          console.log('Failed to send get request');
        });
    };
    this.save = function save(post, cb) {
      $http.post('/save', post)
        .then((response) => {
          console.log('Successfully saved your post!', response);
          landingRedirector.redirectHome(post.city);
          confirmRedirector.redirectConfirm(response.data);
          cb('confirm');
        })
        .catch((err) => {
          console.log(err);
        });
    };
  });
