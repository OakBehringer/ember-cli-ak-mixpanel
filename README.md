ember-cli-ak-mixpanel
==============================================================================

Provides a mixpanel service and configuration routine. Also includes NPM Mixpanel-Browser code.

Installation
------------------------------------------------------------------------------

```
ember install ember-cli-mixpanel-service
```

Setup
------------------------------------------------------------------------------

`environment.js` requires some configuration to enable mixpanel:

```javascript
module.exports = function(environment) {
  let ENV = {
    mixpanel: {
      enabled: true,
      token: 'your-api-token',
      initConfig: {}
    }
  };
  
  return ENV;
};
```

Note: This addon will not inject anything into your document head, nor does it require you to include the mixpanel
source! Doing so may cause conflicts.  

Usage
------------------------------------------------------------------------------

After installation, inject the service into a controller, component, etc. Then use the call
function to access mixpanel functionality. Dot notation can be used to denote functions. For example,
you can use `.call('people.set', 'gender', 'f')` as you would use `window.mixpanel.people.set('gender', 'f')`.

```javascript
mixpanel: inject(),

actions: {
  trackSomething() {
    this.get('mixpanel').call('track', 'some-event-name', {}, function() { alert('in the track callback!'); });
  },
  
  talkToMixpanelPeople() {
    this.get('mixpanel').call('people.set', 'gender', 'm');
  }
}
```

If the service is not configured or enabled, `.call()` will silently disregard anything you pass to it. This is helpful
for dev scenarios where you may not wish to send events to Mixpanel.  


Dummy
------------------------------------------------------------------------------

There is a dummy app that you may run to test this addon. Do not forget to set your mixpanel token in the dummy
app's configuration. 