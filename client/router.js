// Global router config
Router.configure({
    layoutTemplate: 'blank'
});

Router.map(function() {  
  
    var timelineRoute = 'timeline';
    this.route(timelineRoute, {
        template: 'blank',
        path: '/',
        action: function() {
            appView.goTo(timelineRoute);
        }
    });
    
    var eventRoute = 'events';
    this.route(eventRoute, {
        template: 'blank',
        path: eventRoute,
        action: function() {
            appView.goTo(eventRoute);
        }
    });
    
    
    this.route('myevents', {
        template: 'blank',
        path: '/events',
        action: function() {
            appView.goTo('events');
        }
    });
  
    var friendsRoute = 'friends';
    this.route(friendsRoute, {
        template: 'blank',
        path: friendsRoute,
        action: function() {
            appView.goTo(friendsRoute);
        }
    });
    
    var settingsRoute = 'settings';
    this.route(settingsRoute, {
        template: 'blank',
        path: settingsRoute,
        action: function() {
            appView.goTo(settingsRoute);
        }
    });

});

