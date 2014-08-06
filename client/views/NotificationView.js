var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

NotificationView = function () {
    View.apply(this, arguments);
    
    _createBody.call(this);
}

NotificationView.prototype = Object.create(View.prototype);
NotificationView.prototype.constructor = NotificationView;

NotificationView.DEFAULT_OPTIONS = {};

function _createBody() {
    var surface = new Surface({
        size: [undefined, undefined],
        properties: {
            color: 'white',
            backgroundColor: 'rgb(51, 255, 0)'
        }
    });
    
    this._add(surface);
}


