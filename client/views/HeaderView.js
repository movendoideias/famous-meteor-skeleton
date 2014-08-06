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
    this.menuSurf = new Surface({
        size: [undefined, 44],
        properties: {
            backgroundColor: '#292929'
        }
    });
    this.menuMod = new Modifier({});

    //filter icon
    this.filterViewSelected = false;
    this.filterIconSurf = new Surface({
        size: [35,35],
        content: 'Voltar',
        properties: {
            padding: '5px',
            backgroundColor: '#FA5C4F'
        }
    });
    this.filterIconMod = new Modifier({
        opacity: 1
    });

    //title
    var titleSurf = new Surface({
        size: [140, 35],
        content: 'Título',
        properties: {
            fontFamily: 'Arial Narrow',
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
    this.questionIconSurf = new Surface({
        size: [40,40],
        content: 'Menu',
        properties: {
            paddingTop: '2px',
            paddingRight: '50px',
            backgroundColor: '#FA5C4F'
        }
    });
    var questionIconMod = new Modifier({
        origin: [.99, 0]
    });

    this._add(this.menuMod).add(this.menuSurf);
    this._add(this.filterIconMod).add(this.filterIconSurf);
    this._add(titleMod).add(titleSurf);
    this._add(questionIconMod).add(this.questionIconSurf);
}

function _setListeners() {
    this.questionIconSurf.on('click', function() {
        this._eventOutput.emit('menuToggle');
    }.bind(this));

    this.filterIconSurf.on('click', function() {
        this._eventOutput.emit('timelineToggle');
    }.bind(this));
    
    //this.bodySurface.pipe(this._eventOutput);
}
