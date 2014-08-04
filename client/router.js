// Global router config
Router.configure({
    layoutTemplate: 'blank'
});

Router.map(function() {  
  
    this.route('view1', {
        template: 'blank',
        path: '/',
        action: function() {
            AppView.goTo('view1');
        }
    });
  
  
    this.route('view2', {
        template: 'blank',
        path: '/view2',
        action: function() {
            AppView.goTo('view2');
        }
    });

});

