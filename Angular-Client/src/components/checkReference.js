angular.module('app')

  .component('checkReference', {
    bindings: {
      changeView: '<',
    },
    controller: function checkReferenceCtrl(findEventByReference) {
      this.searched = false;
      this.eventFound = '';
      this.reference = '';
      /**
       * If the user enters a valid reference and clicks the submit button, it should call the findEventByReference service to make a POST request to the edit route to grab the data. Then the view is changed to the edit page with prepopulated data.
       */
      this.handleClick = () => {
        this.searched = true;
        /**
         * The findEventByReference service is injected into this controller. There are two variables that are used to determine if an error message needs to be rendered to the user: this.searched and this.eventFound. If the user enters an invalid reference an error message should render to the page.
         * @param  {object} input - the object to send to the server
         * @param  {object} eventData - the data retrieved from the server
         */
        findEventByReference.fetchEditEvent({ reference: this.reference }, (eventData) => {
          this.eventFound = eventData;
          this.searched = false;
          this.changeView('edit');
        });
      };
    },
    templateUrl: '/src/templates/checkReference.html',
  });
