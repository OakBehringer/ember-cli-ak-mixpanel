ember-cli-ak-mixpanel
==============================================================================

Injects Mixpanel JS into head and provides a mixpanel service.

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
      apiKey: 'your-api-key',
      initConfig: {}
    }
  };
  
  return ENV;
};
```

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