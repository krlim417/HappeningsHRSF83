angular.module('app')
  .component('event', {
    bindings: {
      event: '<',
    },
    controller: () => {
    	let post = {};
    },
    templateUrl: '../../templates/event.html',
  });
