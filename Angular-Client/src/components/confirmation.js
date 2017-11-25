angular.module('app')

  .component('confirmation', {
    controller: function confirmCtrl() {
      this.ref = 'san francisco#173528957';
    },
    templateUrl: '/src/templates/confirmation.html',
  });
