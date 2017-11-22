angular.module('app')

  .component('home', {
    bindings: {},
    controller: function (landingRedirector) {
      this.recommendations = landingRedirector.result;
    },
    templateUrl: '/src/templates/home.html',
  });
