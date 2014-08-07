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
            AppView.goTo(timelineRoute);
        }
    });
    
    var eventRoute = 'events';
    this.route(eventRoute, {
        template: 'blank',
        path: eventRoute,
        action: function() {
            AppView.goTo(eventRoute);
        }
    });
    
    
    this.route('myevents', {
        template: 'blank',
        path: '/events',
        action: function() {
            AppView.goTo('events');
        }
    });
  
    var friendsRoute = 'friends';
    this.route(friendsRoute, {
        template: 'blank',
        path: friendsRoute,
        action: function() {
            AppView.goTo(friendsRoute);
        }
    });
    
    var settingsRoute = 'settings';
    this.route(settingsRoute, {
        template: 'blank',
        path: settingsRoute,
        action: function() {
            AppView.goTo(settingsRoute);
        }
    });

});

