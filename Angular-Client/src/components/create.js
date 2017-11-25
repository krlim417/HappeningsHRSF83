angular.module('app')
  .component('create', {
    bindings: {
      changeView: '<',
    },
    controller: function createCtrl(search) {
      this.post = {
        name: '',
        city: '',
        date: '',
        time: '',
        description: '',
        imgUrl: '',
        cost: 0,
        address: '',
        intensity: 1,
        duration: '',
      };
      this.click = () => {
        search.save(this.post, this.changeView);
      };
    },
    templateUrl: '/src/templates/create.html',
  });
