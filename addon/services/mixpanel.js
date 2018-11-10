import Service from '@ember/service';

export default Service.extend({

  isReady() {
    return !!(window && window.mixpanel);
  },

  call(functionName /*, args */) {
    if (this.isReady()) {
      let funcArgs = Array.prototype.slice.call(arguments, 1);
      let namespaces = functionName.split(".");
      let func = namespaces.pop();
      let context = window.mixpanel;

      for (let i = 0, iMax = namespaces.length; i < iMax; i++) {
        context = context[namespaces[i]];
      }

      context[func](...funcArgs);
    }
  }

});
