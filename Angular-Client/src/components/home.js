angular.module('app')

  .component('home', {
    bindings: {},
    controller: function homeCtrl(landingRedirector, search) {
      this.recommendations = landingRedirector.result;
      this.input = '';
      this.search = search.filter;
    },
    templateUrl: '/src/templates/home.html',
  });
