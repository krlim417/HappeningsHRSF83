angular.module('app')

  .component('home', {
    bindings: {},
    controller: function homeCtrl(landingRedirector, search) {
      this.recommendations = landingRedirector.result;
      this.search = search.filter;
    },
    templateUrl: '/src/templates/home.html',
  });
