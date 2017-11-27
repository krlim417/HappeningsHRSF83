angular.module('app')

  .component('app', {
    controller: function appCtrl() {
      this.view = 'landing';
      this.current = '';
      /**
       * Changes the page being displayed beneath the navigation bar
       * @param  {string} option - name of the page to display: landing, home, event, create, confirm, checkReference
       * @param  {object} event - the data for a specific event
       */
      this.changeView = (option, event) => {
        this.current = event;
        this.view = option;
      };
    },
    templateUrl: '/src/templates/app.html',
  });
