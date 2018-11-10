import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({

  mixpanel: inject(),

  eventVal: 'test-event',
  userId: '1234',
  peepSetKey: 'Company',
  peepSetVal: 'MugleMind',

  actions: {
    idUser(userId) {
      this.get('mixpanel').call('identify', userId);
      alert('Identification sent!');
    },

    setPeepInfo(key, val) {
      this.get('mixpanel').call('people.set', key, val, () => {
        alert('Person value set! (this is the callback function)');
      });
    },

    trackEvent(eventVal) {
      this.get('mixpanel').call('track', eventVal, {}, () => {
        alert('Event tracked (this is the callback function)');
      });
    }
  }
});
