angular.module('app')

  .service('findEventByReference', function fetchEvent($http) {
    this.editEventData = {};
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
