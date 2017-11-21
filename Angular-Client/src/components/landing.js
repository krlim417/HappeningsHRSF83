angular.module('app')

  .component('landing', {
    bindings: {
      redirect: '<',
    },
    controller: function redirectToHome(landingRedirector) {
      this.input = '';
      this.handleClick = () => {
        landingRedirector.redirectHome(this.input);
      };
    },
    templateUrl: '/src/templates/landing.html',
  });
