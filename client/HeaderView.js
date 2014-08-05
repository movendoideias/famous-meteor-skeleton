var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var Modifier = famous.core.Modifier;
var ImageSurface = famous.surfaces.ImageSurface;
var StateModifier = famous.modifiers.StateModifier;

HeaderView = function(options) {
    View.apply(this, arguments);

    //_createBackground.call(this);
    //_createProfileCircle.call(this);
    //_addTitle.call(this);
    _createHeader.call(this);
}

HeaderView.prototype = Object.create(View.prototype);
HeaderView.prototype.constructor = HeaderView;

HeaderView.DEFAULT_OPTIONS = {
    title: 'Título'
};

function _createBackground() {

    this.backgroundSurface = new Surface({
        properties: {
            backgroundColor: 'black'
        }
    });

    this._add(this.backgroundSurface);
}

function _createProfileCircle() {
    this.profileSurface = new Surface({
        size: [50, 50],
        properties: {
            color: 'white',
            backgroundColor: '#FA5C4F'
        }
    });

    this.profileModifier = new StateModifier({
        origin: [1, 0]
    });

    this._add(this.profileModifier).add(this.profileSurface);
}

function _addTitle() {

    this.titleSurface = new Surface({
        size: [undefined, true],
        content: this.options.title,
        classes: ['title'],
        properties: {
            textAlign: 'center',
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 500
        }
    });

    this.titleModifier = new Modifier({
        origin: [0.5, 0.35]
    });

    this._add(this.titleModifier).add(this.titleSurface);
}

function _createHeader() {
    var backgroundSurface = new Surface({
        properties: {
            backgroundColor: 'black'
        }
    });

    this.hamburgerSurface = new Surface({
        size: [44, 44],
        content : 'img/hamburger.png'
    });

    var searchSurface = new Surface({
        size: [232, 44],
        content : 'img/search.png'
    });

    var iconSurface = new Surface({
        size: [44, 44],
        content : 'img/icon.png'
    });

    var backgroundModifier = new StateModifier({
        transform : Transform.behind
    });

    var hamburgerModifier = new StateModifier({
        origin: [0, 0.5],
        align : [0, 0.5]
    });

    var searchModifier = new StateModifier({
        origin: [0.5, 0.5],
        align : [0.5, 0.5]
    });

    var iconModifier = new StateModifier({
        origin: [1, 0.5],
        align : [1, 0.5]
    });

    this.add(backgroundModifier).add(backgroundSurface);
    this.add(hamburgerModifier).add(this.hamburgerSurface);
    this.add(searchModifier).add(searchSurface);
    this.add(iconModifier).add(iconSurface);
}
