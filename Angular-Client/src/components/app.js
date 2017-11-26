angular.module('app')

  .component('app', {
    controller: function appCtrl() {
      this.view = 'landing';
      this.current = '';
      this.changeView = (option, event) => {
        this.current = event;
        this.view = option;
      };
    },
    templateUrl: '/src/templates/app.html',
  });
