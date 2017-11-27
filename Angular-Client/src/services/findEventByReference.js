angular.module('app')

  /**
   * When the fetchEditEvent variable is called, an http POST request is made to the /edit route to retrieve an event for the user to edit. The input should be an object containing a reference key and a value containing the reference hash that the user was given when they created the event. The server then double checks that against the database and returns the data back. Once the request is complete and is not false (user entered invalid reference), the data is passed into the callback created in checkReference.js.
   * @param  {object} $http - inject $http to use to use request methods
   */
  .service('findEventByReference', function fetchEvent($http) {
    this.editEventData = {};
    /**
     * Does a post request to the server to fetch data to render on the edit page.
     * @param  {object} input - contains the event reference of the event to look for
     * @param  {function} callback - uses the function defined when initially called and passes the event data retrieved from the post request into it
     */
    this.fetchEditEvent = (input, callback) => {
      $http.post('/edit', input)
        .then((response) => {
          console.log('Successfully sent get to edit route.');
          if (response.data !== false) {
            this.editEventData = response.data[0];
            callback(this.editEventData);
          }
        })
        .catch(() => {
          console.log('Failed to send get request to edit route.');
        });
    };
  });
