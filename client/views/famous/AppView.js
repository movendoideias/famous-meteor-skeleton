var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var Modifier = famous.core.Modifier;
var StateModifier = famous.modifiers.StateModifier;
var Transitionable  = famous.transitions.Transitionable;
var GenericSync = famous.inputs.GenericSync;

AppView = function() {
    View.apply(this, arguments);

    this.menuToggle = false;
    this.timelineToggle = false;
    this.notificationToggle = false;

    this.pageViewPos = new Transitionable(0);
    this.pageViewHorizontalPos = new Transitionable(0);
    this.timelineViewPos = new Transitionable(window.innerHeight);
    this.notificationViewPos = new Transitionable(-window.innerHeight);

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
    posThreshold: 138,
    velThreshold: 0.75
};

function _createPageView() {
    var self = this;
    this.pageView = new PageView();
    this.pageModifier = new Modifier({
        transform: function() {
            return Transform.translate(self.pageViewPos.get(), self.pageViewHorizontalPos.get(), 2);
        }.bind(self)
    });
    this._add(this.pageModifier).add(this.pageView);
}

function _createHeaderView() {
    var self = this;
    this.headerView = new HeaderView();
    this.headerMod = new Modifier({
        transform: function() {
            return Transform.translate(self.pageViewPos.get(), self.pageViewHorizontalPos.get(), 3);
        }.bind(self)
    });
    this._add(this.headerMod).add(this.headerView);
}

function _createMenuView() {
    this.menuView = new MenuView({
        size: [100, 100],
        origin: [1, 0]
    });

    this._add(this.menuView);
}

function _createTimelineView() {
    this.timelineView = new TimelineView();
    this.timelineMod = new Modifier({
        transform: function() {
            return Transform.translate(0, this.timelineViewPos.get(), 3);
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
    this.headerView.on('timelineToggle', this.toggleTimeline.bind(this));
    this.headerView.on('notificationToggle', this.toggleNotification.bind(this));
}

AppView.prototype.toggleMenu = function() {
    if(this.menuToggle) {
        this.menuSlideRight();
    } else {
        this.menuSlideLeft();
    }
    this.menuToggle = !this.menuToggle;
};

AppView.prototype.menuSlideRight = function() {
    this.pageViewPos.set(0, this.options.menuTransition, function() {
        this.menuToggle = false;
    }.bind(this));
};

AppView.prototype.menuSlideLeft = function() {
    this.pageViewPos.set(this.options.menuOpenPosition, this.options.menuTransition, function() {
        this.menuToggle = true;
        this.menuView.animateStrips();
    }.bind(this));
};

AppView.prototype.timelineSlideDown = function() {
    this.timelineViewPos.set(window.innerHeight, this.options.menuTransition, function() {
        this.toggleTimeline = false;
    }.bind(this));
};

AppView.prototype.timelineSlideUp = function() {
    this.timelineViewPos.set(0, this.options.menuTransition, function() {
        this.toggleTimeline = true;
    }.bind(this));
};

AppView.prototype.toggleTimeline = function() {
    if(this.timelineToggle) {
        this.timelineSlideUp();
    } else {
        this.timelineSlideDown();
    }
    this.timelineToggle = !this.timelineToggle;
};

AppView.prototype.notificationSlideDown = function() {
    this.pageViewHorizontalPos.set(window.innerHeight - 80, this.options.menuTransition);
    this.notificationViewPos.set(-80, this.options.menuTransition, function() {
        this.toggleNotification = false;
    }.bind(this));
};

AppView.prototype.notificationSlideUp = function() {
    this.pageViewHorizontalPos.set(0, this.options.menuTransition);
    this.notificationViewPos.set(-window.innerHeight, this.options.menuTransition, function() {
        this.toggleNotification = true;
    }.bind(this));
};

AppView.prototype.toggleNotification = function() {
    if(this.notificationToggle) {
        this.notificationSlideDown();
    } else {
        this.notificationSlideUp();
    }
    this.notificationToggle = !this.notificationToggle;
};

var views = [];
AppView.prototype.goTo = function(templateName) {

    var view = _.findWhere(views, { name: templateName });
    if ( !view ) {

        view = {
            name: templateName,
            view: createFamousView(templateName)
        };

        views.push(view);
    }

    if(this.menuToggle) {
        this.menuSlideRight();
    }

    this.pageView.goTo(view.view);
};

function _handleSwipe() {

    this.headerView.handleSwipe({
      
      onUpdate: function(data) {
        var currentPosition = this.pageViewPos.get();
        this.pageViewPos.set(Math.max(0, currentPosition + data.delta))
      }.bind(this),
      
      onEnd: function(data) {
      }
      
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
