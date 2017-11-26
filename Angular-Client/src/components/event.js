angular.module('app')
  .component('event', {
    bindings: {
      event: '<',
      changeView: '<',
    },
    controller: function eventCtrl(landingRedirector, like) {
      this.redirect = landingRedirector.redirectHome;
      this.like = () => {
        this.event.likes = this.event.likes + 1;
        like.adjust(this.event); 
      };
      this.dislike = () => {
        this.event.likes = this.event.likes - 1;
        like.adjust(this.event);
      };
    },
    templateUrl: '/src/templates/event.html',
  });
