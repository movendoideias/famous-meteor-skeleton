var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var Modifier = famous.core.Modifier;
var ImageSurface = famous.surfaces.ImageSurface;
var StateModifier = famous.modifiers.StateModifier;
var GenericSync = famous.inputs.GenericSync;

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

HeaderView.prototype.handleSwipe = function(options) {
    GenericSync.register({'mouse': famous.inputs.MouseSync, 'touch': famous.inputs.TouchSync });

    var syncNotifications = new GenericSync(
        ['mouse', 'touch'],
        { direction : GenericSync.DIRECTION_Y }
    );

    //this.subscribe(this.titleSurface);
    syncNotifications.subscribe(this.backgroundSurface);

    options = options || {};
    
    this.pipe(syncNotifications);
    
    if(options.onNotificationEnd) {
        syncNotifications.on('update', options.onNotificationUpdate);
    }

    if(options.onNotificationEnd) {
        syncNotifications.on('update', options.onNotificationEnd);
    }

};

function _createHeader() {
    this.backgroundSurface = new Surface({
        size: [undefined, 44],
        properties: {
            backgroundColor: 'gray',
        }
    });
    
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

    this.add(this.searchIconSurf);
    this.add(titleMod).add(this.titleSurface);
    this.add(profileIconMod).add(this.profileIconSurface);
    this.add(this.backgroundSurface);
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
