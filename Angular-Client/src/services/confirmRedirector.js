angular.module('app')

  .service('confirmRedirector', function confirmRedirect() {
    this.ref = '';
    this.redirectConfirm = function redirectConfirm(ref) {
      this.ref = ref;
    };
  });
