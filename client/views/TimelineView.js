var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

TimelineView = function () {
    View.apply(this, arguments);

    _createBody.call(this);
}

TimelineView.prototype = Object.create(View.prototype);
TimelineView.prototype.constructor = TimelineView;

TimelineView.DEFAULT_OPTIONS = {};

function _createBody() {
    var surface = new Surface({
        size: [undefined, undefined],
        properties: {
            color: 'white',
            backgroundColor: 'rgb(194, 0, 194)'
        }
    });
    this._add(surface);
}
