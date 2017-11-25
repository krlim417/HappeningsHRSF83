angular.module('app')

  .component('home', {
    bindings: {},
    controller: function homeCtrl(landingRedirector, search) {
      this.recommendations = landingRedirector.result;
      this.input = {
        value: 'Anything!',
        cost: 'free',
        duration: 'Short',
        intensity: '1',
      };
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
