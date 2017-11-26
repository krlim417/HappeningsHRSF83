angular.module('app')

  .component('confirmation', {
    bindings: {
      changeView: '<',
    },
    controller: function confirmCtrl(confirmRedirector) {
      this.ref = confirmRedirector.ref || '';
      this.handleClick = () => {
        this.changeView('home');
      };
    },
    templateUrl: '/src/templates/confirmation.html',
  });
