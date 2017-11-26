angular.module('app')
  .component('event', {
    bindings: {
      event: '<',
      changeView: '<',
    },
    controller: (landingRedirector) => {
      this.redirect = landingRedirector.redirectHome;
    },
    templateUrl: '/src/templates/event.html',
  });
