angular.module('app')

  .component('home', {
    bindings: {},
    controller: function homeCtrl(landingRedirector, search) {
      this.recommendations = landingRedirector.result;
      this.input = '';
      this.search = search.filter;
      this.searchRecommendations = (input) => {
        search.filter(input, (results) => {
          this.recommendations = results;
          console.log('recommendations', this.recommendations);
        });
      };
    },
    templateUrl: '/src/templates/home.html',
  });
