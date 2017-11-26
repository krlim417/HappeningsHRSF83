angular.module('app')
  .component('create', {
    bindings: {
      changeView: '<',
    },
    controller: function createCtrl(search, findEventByReference) {
      this.post = {
        name: '' || findEventByReference.editEventData.name,
        city: '' || findEventByReference.editEventData.city,
        date: '' || findEventByReference.editEventData.date,
        time: '' || findEventByReference.editEventData.time,
        description: '' || findEventByReference.editEventData.description,
        imgUrl: '' || findEventByReference.editEventData.imgUrl,
        cost: 0 || findEventByReference.editEventData.cost,
        address: '' || findEventByReference.editEventData.address,
        intensity: 1 || findEventByReference.editEventData.intensity,
        duration: '' || findEventByReference.editEventData.duration,
        reference: '' || findEventByReference.editEventData.reference,
      };
      this.click = () => {
        search.save(this.post, this.changeView);
      };
    },
    templateUrl: '/src/templates/create.html',
  });
