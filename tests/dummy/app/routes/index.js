import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({

  mixpanel: inject(),

  beforeModel() {
    let mp = this.get('mixpanel');
    console.log('Mixpanel ' + (mp.isReady() ? 'is' : 'is not') + ' ready');
  }

});
