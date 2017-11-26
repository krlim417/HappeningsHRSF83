angular.module('app')

  .component('edit', {
    bindings: {
      changeView: '<',
    },
    controller: function editCtrl() {
    },
    templateUrl: '/src/templates/edit.html',
  });
