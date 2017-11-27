angular.module('app')

  /**
   * When the redirectConfirm variable is called it stores the reference data passed into the function and sets it to be a variable in the service for use in components.
   */
  .service('confirmRedirector', function confirmRedirect() {
    this.ref = '';
    /**
     * Stores the passed in argument as the service's variable.
     * @param  {string} ref - the reference created once an event was created
     */
    this.redirectConfirm = function redirectConfirm(ref) {
      this.ref = ref;
    };
  });
