angular.module('app')

  .component('landing', {
    bindings: {
      changeView: '<',
    },
    controller: function redirectToHome(landingRedirector) {
      this.input = '';
      this.handleClick = () => {
        landingRedirector.redirectHome(this.input);
        this.changeView('home');
      };
    },
    templateUrl: '/src/templates/landing.html',
  });
