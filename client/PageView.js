var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;
var HeaderFooter = famous.views.HeaderFooterLayout;
var RenderController = famous.views.RenderController;

PageView = function() {
    View.apply(this, arguments);
    this._renderController = new RenderController();
    this._defaultTransition = "SlideLeft";
    this.transitions = {};

    for (i = 0; i < this._defaultTransitions.length; i++) {
        this.addTransition(this._defaultTransitions[i].name, this._defaultTransitions[i].transition)
    }

    _createLayout.call(this);
    _createHeader.call(this);
    _createBody.call(this);
    _setListeners.call(this);
};

PageView.prototype = Object.create(View.prototype);
PageView.prototype.constructor = PageView;

PageView.prototype.addTransition = function(name, transition) {
    this.transitions[name] = transition;
};

PageView.prototype.goTo = function(view, transition) {

    if (!transition) {
        transition = this._defaultTransition;
    }

    this._renderController.outTransformFrom(this.transitions[transition].outTransform);
    this._renderController.inTransformFrom(this.transitions[transition].inTransform);
    this._renderController.options.outTransition = this.transitions[transition].outTransition;
    this._renderController.options.inTransition = this.transitions[transition].inTransition;

    this._renderController.inOpacityFrom(function() { return 1; }); 
    this._renderController.outOpacityFrom(function() { return 1; });

    this._renderController.show(view);
};

PageView.DEFAULT_OPTIONS = {
    headerSize: 44
};

var layout = null;
function _createLayout() {
    layout = this.layout = new HeaderFooter({
        headerSize: this.options.headerSize
    });

    var layoutModifier = new StateModifier({
        transform: Transform.translate(0, 0, 0.1)
    });

    this.add(layoutModifier).add(this.layout);
}

function _createBody() {  
    this.layout.content.add(this._renderController);
}

function _setListeners() {
    
}

function _createHeader() {
    var backgroundSurface = new Surface({
        properties: {
            backgroundColor: 'black'
        }
    });

    var backgroundModifier = new StateModifier({
        transform: Transform.behind
    });

    this.layout.header = new HeaderView();

    //this.layout.header.add(createFamousView('headerLayout').view);
    //this.layout.header.add(hamburgerModifier).add(this.hamburgerSurface);
}

PageView.prototype._defaultTransitions = [
    {
        name: "SlideLeft",
        transition: {
            inTransition: {
                curve: 'easeInOut',
                duration: 300
            },
            outTransition: {
                curve: 'easeInOut',
                duration: 300
            },
            outTransform: function(progress) {
                return Transform.translate(window.innerWidth * progress - window.innerWidth, 0, 0);
            },
            inTransform: function(progress) {
                return Transform.translate(window.innerWidth * (1.0 - progress), 0, 0);
            }
        }
    }
];
