angular.module('app')

  .component('app', {
    controller: function appCtrl() {
      this.view = 'landing';
      this.changeView = (option) => {
        this.view = option;
      };
    },
    templateUrl: '/src/templates/app.html',
  });
