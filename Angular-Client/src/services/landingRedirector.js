angular.module('app')

  /**
   * When the redirectHome variable is called, an http POST request is made to the /home route to retreieve the top five most events from the database based on the city the user inputted on the landing page. The input should be an object containing a location key and a value containing the city the user inputted. The server checks the database for any city matching the one it received and returns an array of at most five objects which contain event data.
   * @param  {String} $http - inject $http to use to use request methods
   */
  .service('landingRedirector', function landingRedirect($http) {
    this.city = 'hi';
    this.result = [];
    /**
     * Uses the city passed into the argument and sends it to the server to look for the top five events.
     * @param  {string} city - the city to look for the events to render on the page
     */
    this.redirectHome = function redirectHome(city) {
      this.city = city;
      return $http.post('/home', { location: city })
        .then((response) => {
          console.log('Successfully posted to /home for redirect from the landing page.');
          this.result = response.data;
        })
        .catch(() => {
          console.log('Failed to post to /home for redirect from the landing page.');
        });
    };
  });
