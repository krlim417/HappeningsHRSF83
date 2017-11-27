angular.module('app')
  .component('create', {
    bindings: {
      view: '<',
      changeView: '<',
    },
    /**
     * There is a post object that is used to render the post event page with default values. The postEdit object will prepopulate the edit page with data that was retrieved from a POST request to the /edit route. When the button is clicked to save the post, the search function in findEventByReference will be called, which saves the inputted data to the database.
     * @param  {object} search - the service used to post or edit an event
     * @param  {[type]} findEventByReference - the service used to find the event based on a reference
     */
    controller: function createCtrl(search, findEventByReference) {
      this.post = {
        name: '',
        city: '',
        date: '',
        time: '',
        description: '',
        imgUrl: '',
        cost: 0,
        address: '',
        intensity: 1,
        duration: '',
        reference: '',
      };

      this.postEdit = {
        name: findEventByReference.editEventData.name || '',
        city: findEventByReference.editEventData.city || '',
        date: findEventByReference.editEventData.date || '',
        time: findEventByReference.editEventData.time || '',
        description: findEventByReference.editEventData.description || '',
        imgUrl: findEventByReference.editEventData.imgUrl || '',
        cost: findEventByReference.editEventData.cost || 0,
        address: findEventByReference.editEventData.address || '',
        intensity: findEventByReference.editEventData.intensity || 1,
        duration: findEventByReference.editEventData.duration || '',
        reference: findEventByReference.editEventData.reference || '',
      };
      /**
       * When the button is clicked to save the post, the search function in findEventByReference will be called, which saves the inputted data to the database.
       */
      this.click = () => {
        if (this.view === 'create') {
          search.save(this.post, this.changeView);
        } else if (this.view === 'edit') {
          search.save(this.postEdit, this.changeView);
        }
      };
    },
    templateUrl: '/src/templates/create.html',
  });
