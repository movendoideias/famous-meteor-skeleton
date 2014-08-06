var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var Modifier = famous.core.Modifier;
var StateModifier = famous.modifiers.StateModifier;
var Transitionable  = famous.transitions.Transitionable;

AppView = function() {
    View.apply(this, arguments);

    this.menuToggle = false;
    this.pageViewPos = new Transitionable(0);

    _createHeaderView.call(this);
    _createPageView.call(this);
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
    openPosition: -276,
    transition: {
        duration: 300,
        curve: 'easeOut'
    },
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
            return Transform.translate(this.pageViewPos.get(), 0, 1);
        }.bind(this)
    });
    this._add(this.headerMod).add(AppView.headerView);
}

function _setListeners() {
    AppView.headerView.on('menuToggle', this.toggleMenu.bind(this));
}

function _createMenuView() {
    this.menuView = new MenuView();
    this._add(this.menuView);
}

AppView.prototype.toggleMenu = function() {
    if(this.menuToggle) {
        this.slideLeft();
    } else {
        this.slideRight();
    }
    this.menuToggle = !this.menuToggle;
};


AppView.prototype.slideLeft = function() {
    this.pageViewPos.set(0, this.options.transition, function() {
        this.menuToggle = false;
    }.bind(this));
};

AppView.prototype.slideRight = function() {
    this.pageViewPos.set(this.options.openPosition, this.options.transition, function() {
        this.menuToggle = true;
    }.bind(this));
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
