import Service from '@ember/service';
import { getOwner } from '@ember/application';
import mixpanel from 'mixpanel-browser';

export default Service.extend({

  _envCache: null,

  init() {
    this._super(...arguments);
    let ENV = this._getEnv();

    if (this.shouldCom()) {
      let initConfig = ENV.mixpanel.initConfig ? ENV.mixpanel.initConfig : {};
      initConfig.track_pageview = false;
      initConfig.disable_persistence = true;
      mixpanel.init(ENV.mixpanel.token, initConfig);
    }
  },

  shouldCom() {
    let ENV = this._getEnv();
    return ENV && ENV.mixpanel && ENV.mixpanel.token && ENV.mixpanel.enabled;
  },

  _getEnv() {
    let mpEnv = this.get('_envCache');

    if (mpEnv === null) {
      mpEnv = getOwner(this).resolveRegistration('config:environment')
      this.set('_envCache', mpEnv);
    }

    return mpEnv;
  },

  call(functionName /*, args */) {
    if (this.shouldCom()) {
      let funcArgs = Array.prototype.slice.call(arguments, 1);
      let namespaces = functionName.split(".");
      let func = namespaces.pop();
      let context = mixpanel;

      for (let i = 0, iMax = namespaces.length; i < iMax; i++) {
        context = context[namespaces[i]];
      }

      return context[func](...funcArgs);
    }
  }

});

