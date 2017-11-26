angular.module('app')
  .component('event', {
    bindings: {
      event: '<',
    },
    controller: () => {
      this.test = console.log('event in event', event);
    },
    templateUrl: '/src/templates/event.html',
  });
