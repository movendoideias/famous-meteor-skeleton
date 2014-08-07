var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var Modifier = famous.core.Modifier;
var ImageSurface = famous.surfaces.ImageSurface;
var StateModifier = famous.modifiers.StateModifier;

HeaderView = function(options) {
    View.apply(this, arguments);

    _createHeader.call(this);

    _setListeners.call(this);
}

HeaderView.prototype = Object.create(View.prototype);
HeaderView.prototype.constructor = HeaderView;

HeaderView.DEFAULT_OPTIONS = {
    title: 'Título'
};

function _createHeader() {
    
    //filter icon
    this.filterIconSurf = new ImageSurface({
        size: [44, 44],
        content: 'http://cdn.flaticon.com/png/256/34148.png',
        properties: {
            padding: '5px',
        }
    });

    //title
    this.titleSurf = new Surface({
        size: [140, 35],
        content: 'Título',
        properties: {
            fontSize: '24px',
            color: 'white',
            textAlign: 'center',
            paddingTop: '8px'

        }
    });
    var titleMod = new Modifier({
        origin: [0.5, 0]
    });

    //question icon
    this.questionIconSurf = new ImageSurface({
        size: [40, 44],
        content: 'http://cdn.flaticon.com/png/256/17797.png',
        properties: {
            paddingTop: '5px',
            height: 'auto'
        }
    });
    var questionIconMod = new Modifier({
        origin: [.99, 0]
    });

    this._add(this.filterIconMod).add(this.filterIconSurf);
    this._add(titleMod).add(this.titleSurf);
    this._add(questionIconMod).add(this.questionIconSurf);
}

function _setListeners() {
    this.questionIconSurf.on('click', function() {
        this._eventOutput.emit('menuToggle');
    }.bind(this));

    this.filterIconSurf.on('click', function() {
        this._eventOutput.emit('timelineToggle');
    }.bind(this));

    this.titleSurf.on('click', function() {
        this._eventOutput.emit('notificationToggle');
    }.bind(this));

    //this.bodySurface.pipe(this._eventOutput);
}
