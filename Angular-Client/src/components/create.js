angular.module('app')
  .component('create', {
    bindings: {
      view: '<',
      changeView: '<',
    },
    controller: function createCtrl(search, findEventByReference) {
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
        reference: '',
      };

      this.postEdit = {
        name: findEventByReference.editEventData.name || '',
        city: findEventByReference.editEventData.city || '',
        date: findEventByReference.editEventData.date || '',
        time: findEventByReference.editEventData.time || '',
        description: findEventByReference.editEventData.description || '',
        imgUrl: findEventByReference.editEventData.imgUrl || '',
        cost: findEventByReference.editEventData.cost || 0,
        address: findEventByReference.editEventData.address || '',
        intensity: findEventByReference.editEventData.intensity || 1,
        duration: findEventByReference.editEventData.duration || '',
        reference: findEventByReference.editEventData.reference || '',
      };

      this.click = () => {
        if (this.view === 'create') {
          search.save(this.post, this.changeView);
        } else if (this.view === 'edit') {
          search.save(this.postEdit, this.changeView);
        }
      };
    },
    templateUrl: '/src/templates/create.html',
  });
