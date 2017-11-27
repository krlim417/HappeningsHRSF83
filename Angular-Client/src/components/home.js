angular.module('app')

  .component('home', {
    bindings: {
      changeView: '<',
    },
    /**
     * Renders at least five of the top five most liked events for the user's selected city. There are filters that the user can select in order to search for new events under different criterias.
     * @param  {service name} landingRedirector [Service used to redirect to the home page]
     * @param  {service name} search [Service used to search for events according to certain criteria]
     */
    controller: function homeCtrl(landingRedirector, search) {
      this.recommendations = landingRedirector.result;
      this.input = {
        value: 'Anything!',
        cost: '0',
        duration: 'Short',
        intensity: '1',
      };
      this.search = search.filter;
      /**
       * [descrip]
       * @param  {[type]} input [description]
       * @return {[type]}       [description]
       */
      this.searchRecommendations = (input) => {
        search.filter(input, (results) => {
          this.recommendations = results;
          console.log('recommendations', this.recommendations);
        });
      };
    },
    templateUrl: '/src/templates/home.html',
  });
