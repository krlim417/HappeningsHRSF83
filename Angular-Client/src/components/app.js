angular.module('app')

  .controller('AppCtrl', function () {
    this.view = 'landing';
    this.changeView = (option) => {
      this.view = option;
    };
  })
  .component('app', {
    controller: 'AppCtrl',
    templateUrl: '/src/templates/app.html',
  });
