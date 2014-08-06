var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var Modifier = famous.core.Modifier;
var StateModifier = famous.modifiers.StateModifier;
var Transitionable  = famous.transitions.Transitionable;

AppView = function() {
    View.apply(this, arguments);

    this.menuToggle = false;
    this.timelineToggle = false;
    this.pageViewPos = new Transitionable(0);
    this.timelineViewPos = new Transitionable(window.innerHeight);

    _createHeaderView.call(this);
    _createPageView.call(this);
    _createTimelineView.call(this);
    _createMenuView.call(this);

    _setListeners.call(this);
};

AppView.init = function() {
    var Engine = famous.core.Engine;

    var mainContext = Engine.createContext();
    appView = new AppView();

    mainContext.add(this.pageModifier).add(appView);
};

var views = [];
AppView.goTo = function(templateName) {

    var view = _.findWhere(views, { name: templateName });
    if ( !view ) {

        view = {
            name: templateName,
            view: createFamousView(templateName)
        };

        views.push(view);
    }

    AppView.pageView.goTo(view.view);
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
    AppView.pageView = new PageView();
    this.pageModifier = new Modifier({
        transform: function() {
            return Transform.translate(this.pageViewPos.get(), 0, 0);
        }.bind(this)
    });
    this._add(this.pageModifier).add(this.scaleModifier).add(AppView.pageView);
}

function _createHeaderView() {
    AppView.headerView = new HeaderView();
    this.headerMod = new Modifier({
        transform: function() {
            return Transform.translate(this.pageViewPos.get(), 0, 2);
        }.bind(this)
    });
    this._add(this.headerMod).add(AppView.headerView);
}

function _createMenuView() {
    this.menuView = new MenuView();
    this._add(this.menuView);
}

function _createTimelineView() {
    AppView.timelineView = new TimelineView();
    this.timelineMod = new Modifier({
        transform: function() {
            return Transform.translate(0, this.timelineViewPos.get(), 1);
        }.bind(this)
    });
    this._add(this.timelineMod).add(AppView.timelineView);
}

function _setListeners() {
    AppView.headerView.on('menuToggle', this.toggleMenu.bind(this));
    AppView.headerView.on('timelineToggle', this.toggleTimeline.bind(this));
}

AppView.prototype.toggleMenu = function() {
    if(this.menuToggle) {
        this.menuSlideLeft();
    } else {
        this.menuSlideRight();
    }
    this.menuToggle = !this.menuToggle;
};

AppView.prototype.menuSlideLeft = function() {
    this.pageViewPos.set(0, this.options.transition, function() {
        this.menuToggle = false;
    }.bind(this));
};

AppView.prototype.menuSlideRight = function() {
    this.pageViewPos.set(this.options.menuOpenPosition, this.options.menuTransition, function() {
        this.menuToggle = true;
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
        classes: [templateName]
    });

    view.add(centerModifier).add(surface);

    return view;
};
