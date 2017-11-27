angular.module('app')

  .component('home', {
    bindings: {
      changeView: '<',
    },
    /**
     * Renders at least five of the top five most liked events for the user's selected city. There are filters that the user can select in order to search for new events under different criterias.
     * @param  {object} landingRedirector - service used to redirect to the home page
     * @param  {object} search - service used to search for events according to certain criteria
     */
    controller: function homeCtrl(landingRedirector, search) {
      this.recommendations = landingRedirector.result
      this.input = {
        value: 'Anything!',
        cost: '0',
        duration: 'Short',
        intensity: '1',
      };
      this.search = search.filter;
      /**
       * The search service's filter function is used here to filter rerender the page based on the user's new criteria
       * @param  {object} input - the user's event data from the input fields
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
