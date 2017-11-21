angular.module('happeningsApp')
  .component('event', {
    bindings: {
      event: '<',
    },
    controller: () => {
    },
    templateUrl: '../../templates/event.html',
  });
