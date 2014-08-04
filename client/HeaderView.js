var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var Modifier = famous.core.Modifier;
var ImageSurface = famous.surfaces.ImageSurface;
var StateModifier = famous.modifiers.StateModifier;

HeaderView = function(options) {
    View.apply(this, arguments);

    _createBackground.call(this);
    _addTitle.call(this);
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

    this.backgroundModifier = new StateModifier({
        transform: Transform.behind
    });

    this._add(this.backgroundModifier).add(this.backgroundSurface);
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
