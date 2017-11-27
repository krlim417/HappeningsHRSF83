angular.module('app')

  .component('landing', {
    bindings: {
      changeView: '<',
    },
    /**
     * Uses the value inputted by the user and makes a POST request to the server at the /home route through the landingRedirector service. Then changes the view to the home page, which then renders events to the page using the results retrieved from the server.
     * @param  {object} landingRedirector - service to be used to redirect to the home page once user inputs a city
     */
    controller: function landingCtrl(landingRedirector) {
      this.input = '';
      /**
       * When the "Let's Begin" button is clicked, landingRedirector's function is called to grab the top five most liked events, and then the view is changed to the home page.
       */
      this.handleClick = () => {
        landingRedirector.redirectHome(this.input);
        this.changeView('home');
      };
    },
    templateUrl: '/src/templates/landing.html',
  });
