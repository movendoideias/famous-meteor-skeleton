var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var Modifier = famous.core.Modifier;
var StateModifier = famous.modifiers.StateModifier;
var Transitionable  = famous.transitions.Transitionable;
var GenericSync = famous.inputs.GenericSync;

AppView = function() {
    View.apply(this, arguments);

    this.menuOpen = false;
    this.timelineOpen = true;
    this.notificationOpen = false;

    this.pageViewPos = new Transitionable(0);
    this.pageViewHorizontalPos = new Transitionable(0);
    this.timelineViewPos = new Transitionable(0);
    this.timelineViewHorizontalPos = new Transitionable(0);
    //this.notificationViewPos = new Transitionable(-window.innerHeight);
    this.notificationViewPos = new Transitionable(-80);
    this.menuViewPos = new Transitionable(-this.options.menuOpenPosition);

    _createHeaderView.call(this);
    _createPageView.call(this);
    _createTimelineView.call(this);
    _createMenuView.call(this);
    _createNotificationView.call(this);
    _setListeners.call(this);

    _handleSwipe.call(this);

    var Engine = famous.core.Engine;

    var mainContext = Engine.createContext();

    mainContext.add(this);
};

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.DEFAULT_OPTIONS = {
    menuOpenPosition: -276,
    menuTransition: {
        duration: 300,
        curve: 'easeOut'
    },
    timelineOpenPosition: -276,
    posThreshold: window.innerHeight / 3,
    velThreshold: 0.75
};

function _createPageView() {
    var self = this;
    this.pageView = new PageView();
    this.pageModifier = new Modifier({
        transform: function() {
            return Transform.translate(self.pageViewPos.get(), self.pageViewHorizontalPos.get(), 3);
        }.bind(self)
    });
    this._add(this.pageModifier).add(this.pageView);
}

function _createHeaderView() {
    var self = this;
    this.headerView = new HeaderView();
    this.headerMod = new Modifier({
        transform: function() {
            return Transform.translate(self.pageViewPos.get(), self.pageViewHorizontalPos.get(), 5);
        }.bind(self)
    });
    this._add(this.headerMod).add(this.headerView);
}

function _createMenuView() {
    this.menuView = new MenuView({
        origin: [1, 0]
    });

    this.menuMod = new Modifier({
        transform: function() {
            return Transform.translate(this.menuViewPos.get(), 0, 5);
        }.bind(this)
    });

    this._add(this.menuMod).add(this.menuView);
}

function _createTimelineView() {
    this.timelineView = new TimelineView();
    this.timelineMod = new Modifier({
        transform: function() {
            return Transform.translate(this.timelineViewPos.get(), this.timelineViewHorizontalPos.get(), 4);
        }.bind(this)
    });
    this._add(this.timelineMod).add(this.timelineView);
}

function _createNotificationView() {
    AppView.notificationView = new NotificationView();
    this.notificationMod = new Modifier({
        transform: function() {
            return Transform.translate(0, this.notificationViewPos.get(), 1);
        }.bind(this)
    });
    this._add(this.notificationMod).add(AppView.notificationView);
}

function _setListeners() {
    this.headerView.on('menuToggle', this.toggleMenu.bind(this));
    this.timelineView.on('timelineToggle', this.toggleTimeline.bind(this));
    this.headerView.on('notificationToggle', this.toggleNotification.bind(this));
}

AppView.prototype.toggleMenu = function() {

    if(this.notificationOpen)
        return;

    if(this.menuOpen) {
        this.menuSlideRight();
    } else {
        this.menuSlideLeft();
    }
    this.menuOpen = !this.menuOpen;
};

AppView.prototype.menuSlideRight = function(callback) {
    this.menuViewPos.set(-this.options.menuOpenPosition, this.options.menuTransition);
    this.timelineViewPos.set(0, this.options.menuTransition);
    this.pageViewPos.set(0, this.options.menuTransition, function() {
        this.menuOpen = false;
        this.menuView.resetMenuItems();
        if(callback)
            callback();
    }.bind(this));
};

AppView.prototype.menuSlideLeft = function() {
    this.menuViewPos.set(0, this.options.menuTransition);
    this.timelineViewPos.set(this.options.menuOpenPosition, this.options.menuTransition);
    this.pageViewPos.set(this.options.menuOpenPosition, this.options.menuTransition, function() {
        this.menuOpen = true;
        this.menuView.animateMenuItems();
    }.bind(this));
};

AppView.prototype.toggleTimeline = function() {

    if(this.notificationOpen)
        return;

    if(this.timelineOpen) {
        this.timelineSlideDown();
    } else {
        this.timelineSlideUp(); 
    }
    this.timelineOpen = !this.timelineOpen;
};


AppView.prototype.timelineSlideDown = function(callback) {
    this.timelineViewHorizontalPos.set(window.innerHeight, this.options.menuTransition, function() {
        this.timelineOpen = false;
        if(callback)
            callback();
    }.bind(this));
};

AppView.prototype.timelineSlideUp = function() {
    this.timelineViewHorizontalPos.set(0, this.options.menuTransition, function() {
        this.timelineOpen = true;
    }.bind(this));
};


AppView.prototype.notificationSlideDown = function() {
    this.pageViewHorizontalPos.set(window.innerHeight - 80, this.options.menuTransition);
    this.notificationOpen = true;
    
    if(this.timelineOpen) {
        this.timelineViewHorizontalPos.set(window.innerHeight - 80, this.options.menuTransition);
    }
    /*this.notificationViewPos.set(-80, this.options.menuTransition, function() {
        this.toggleNotification = false;
    }.bind(this));*/
};

AppView.prototype.notificationSlideUp = function() {
    this.pageViewHorizontalPos.set(0, this.options.menuTransition);
    this.notificationOpen = false;
    
    if(this.timelineOpen) {
        this.timelineViewHorizontalPos.set(0, this.options.menuTransition);
    }
    /*
    this.notificationViewPos.set(-window.innerHeight, this.options.menuTransition, function() {
        this.toggleNotification = true;
    }.bind(this));*/
};

AppView.prototype.toggleNotification = function() {

    if(this.notificationOpen) {
        this.notificationSlideUp();
    } else {
        this.notificationSlideDown();
    }
    this.notificationOpen = !this.notificationOpen;
};

var views = [];
AppView.prototype.goTo = function(templateName) {

    var self = this;
    var view = _.findWhere(views, { name: templateName });
    if ( !view ) {

        view = {
            name: templateName,
            view: createFamousView(templateName)
        };

        views.push(view);
    }

    if(this.menuOpen) {
        if(this.timelineOpen) {
            this.menuSlideRight(function () {
                self.timelineSlideDown( function() {
                    self.pageView.goTo(view.view);    
                });
            });        
        } else {
            this.menuSlideRight(function () {
                self.pageView.goTo(view.view);    
            });    
        }
    }
    else {
        this.pageView.goTo(view.view);        
    }

};

function _handleSwipe() {

    this.headerView.handleSwipe({

        onNotificationUpdate: function(data) {
            if(this.menuOpen)
                return;

            var currentPosition = this.pageViewHorizontalPos.get();
            var currentNotificationPos = this.notificationViewPos.get();

            if(this.timelineOpen) {
                this.timelineViewHorizontalPos.set(Math.max(0, currentPosition + data.delta));
            }
            this.pageViewHorizontalPos.set(Math.max(0, currentPosition + data.delta));
        }.bind(this),

        onNotificationEnd: function(data) {
            var velocity = data.velocity;
            var position = this.pageViewHorizontalPos.get();

            if(position > this.options.posThreshold) {
                if(velocity < -this.options.velThreshold) {
                    this.notificationSlideUp();
                } else {
                    this.notificationSlideDown();
                }
            } else {
                if(velocity > this.options.velThreshold) {
                    this.notificationSlideDown();
                } else {
                    this.notificationSlideUp();
                }
            }
        }.bind(this),

    });

}

createFamousView = function(templateName) {
    var view = new View();

    var centerModifier = new StateModifier({
        origin: [0.5, 0.5]
    });

    var template = document.createElement("div");
    UI.insert(UI.render(Template[templateName]), template);
    var surface = new Surface({
        size: [undefined, undefined],
        content: template,
        classes: [templateName],
        properties : {
            backgroundColor: 'white',
            paddingTop: '40px'
        }
    });

    view.add(centerModifier).add(surface);

    return view;
};
