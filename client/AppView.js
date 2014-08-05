var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;

AppView = function() {
    View.apply(this, arguments);

    _createPageView.call(this);
    _setListeners.call(this);
};

AppView.init = function() {
    var Engine = famous.core.Engine;

    var mainContext = Engine.createContext();
    appView = new AppView();

    mainContext.add(appView);
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

AppView.prototype.slideLeft = function() {
    this.pageModifier.setTransform(Transform.translate(0, 0, 0), {
        duration: 300,
        curve: 'easeOut'
    });
};

AppView.prototype.slideRight = function() {
    this.pageModifier.setTransform(Transform.translate(276, 0, 0), {
        duration: 300,
        curve: 'easeOut'
    });
};

function _setListeners() {
    AppView.pageView.on('menuToggle', this.toggleMenu.bind(this));
}

AppView.prototype.toggleMenu = function() {
    if(this.menuToggle) {
        this.slideLeft();
    } else {
        this.slideRight();
    }
    this.menuToggle = !this.menuToggle;
};

AppView.DEFAULT_OPTIONS = {};

function _createPageView() {
    AppView.pageView = new PageView();
    this.add(AppView.pageView);
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
        classes: [templateName]
    });

    view.add(centerModifier).add(surface);

    return view;
};
