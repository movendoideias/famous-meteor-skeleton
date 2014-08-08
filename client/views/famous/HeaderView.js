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
    
    this.searchIconSurf = new ImageSurface({
        size: [44, 44],
        content: 'http://cdn.flaticon.com/png/256/34148.png',
        properties: {
            padding: '5px',
        }
    });

    this.titleSurface = new Surface({
        size: [140, 35],
        content: 'Título',
        properties: {
            fontSize: '24px',
            textAlign: 'center',
            paddingTop: '8px'

        }
    });
    var titleMod = new Modifier({
        origin: [0.5, 0]
    });

    this.profileIconSurface = new ImageSurface({
        size: [40, 44],
        content: 'http://cdn.flaticon.com/png/256/17797.png',
        properties: {
            paddingTop: '5px',
            height: 'auto'
        }
    });
    var profileIconMod = new Modifier({
        origin: [.99, 0]
    });

    this._add(this.searchIconSurf);
    this._add(titleMod).add(this.titleSurface);
    this._add(profileIconMod).add(this.profileIconSurface);
}

function _setListeners() {
    this.profileIconSurface.on('click', function() {
        this._eventOutput.emit('menuToggle');
    }.bind(this));

    this.searchIconSurf.on('click', function() {
        this._eventOutput.emit('timelineToggle');
    }.bind(this));

    this.titleSurface.on('click', function() {
        this._eventOutput.emit('notificationToggle');
    }.bind(this));
}
