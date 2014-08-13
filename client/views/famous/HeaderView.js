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

    syncNotifications.subscribe(this.notificationSurface);

    options = options || {};
    
    if(options.onNotificationUpdate) {
        syncNotifications.on('update', options.onNotificationUpdate);
    }

    if(options.onNotificationEnd) {
        syncNotifications.on('end', options.onNotificationEnd);
    }

};

function _createHeader() {
    this.backgroundSurface = new Surface({
        size: [undefined, 44],
        properties: {
            backgroundColor: 'gray',
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
        origin: [0.5, 0],
        transform: Transform.translate(0, 0, 5)
    });
    
    this.notificationSurface = new Surface({
        size: [30, 50],
        content: '^^',
        properties: {
            backgroundColor: 'rgb(63, 63, 63)'
        }
    });
    var notificationModifier = new StateModifier({
        origin: [1, 0],
        transform: Transform.translate(-70, 0, 5)
    });

    this.profileIconSurface = new ImageSurface({
        size: [48, 48],
        classes: ['circle-profile-picture'],
        content: 'http://images4.wikia.nocookie.net/__cb20100508215330/halofanon/images/a/a0/Tony_Stark.png'
    });
    var profileIconMod = new Modifier({
        origin: [1, 0],
        transform: Transform.translate(0, 0, 5)
    });

    //this.add(titleMod).add(this.titleSurface);
    this.add(profileIconMod).add(this.profileIconSurface);
    this.add(notificationModifier).add(this.notificationSurface);
    //this.add(this.backgroundSurface);
}

function _setListeners() {
    this.profileIconSurface.on('click', function() {
        this._eventOutput.emit('menuToggle');
    }.bind(this));

    this.notificationSurface.on('click', function() {
        //this._eventOutput.emit('notificationToggle');
    }.bind(this));
}
