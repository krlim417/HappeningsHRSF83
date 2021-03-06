angular.module('app')

  .component('checkReference', {
    bindings: {
      changeView: '<',
    },
    controller: function checkReferenceCtrl(findEventByReference) {
      this.searched = false;
      this.eventFound = '';
      this.reference = '';
      this.handleClick = () => {
        this.searched = true;
        findEventByReference.fetchEditEvent({ reference: this.reference }, (eventData) => {
          this.eventFound = eventData;
          console.log('EVENT FOUND 2', this.eventFound);
          this.searched = false;
          this.changeView('edit');
        });
      };
    },
    templateUrl: '/src/templates/checkReference.html',
  });
