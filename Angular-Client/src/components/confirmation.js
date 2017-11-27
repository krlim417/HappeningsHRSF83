angular.module('app')

  .component('confirmation', {
    bindings: {
      changeView: '<',
    },
    /**
     * The controller grabs the reference to be displayed in the confirmation page from the confirmRedirector service, if that resolves to a falsey value, it will return an empty string. When the user clicks return to home, the view will change to the home page.
     * @param  {object} confirmRedirector - service to be used to store the reference of the event that was created
     */
    controller: function confirmCtrl(confirmRedirector) {
      this.ref = confirmRedirector.ref || '';
      this.handleClick = () => {
        this.changeView('home');
      };
    },
    templateUrl: '/src/templates/confirmation.html',
  });
