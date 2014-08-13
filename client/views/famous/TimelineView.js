var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

TimelineView = function () {
    View.apply(this, arguments);

    _createBody.call(this);
    _createSearchHeader.call(this);
    _createResultsBox.call(this);

    _setListeners.call(this);
}

TimelineView.prototype = Object.create(View.prototype);
TimelineView.prototype.constructor = TimelineView;

TimelineView.DEFAULT_OPTIONS = {};


function _createBody() {
    var surface = new Surface({
        size: [undefined, undefined],
        content: 'Timeline',
        classes: ['timeline-wrapper']
    });

    this.bringBackSurface = new Surface({
        size: [60, 60],
        content: '^^',
        properties: {
            backgroundColor: 'rgb(63, 63, 63)'
        }
    });
    this.bringBackModifier = new StateModifier({
        transform: Transform.translate(60, -40, 1)
    });

    this._add(this.bringBackModifier).add(this.bringBackSurface);
    this._add(surface);
}

function _createSearchHeader () {
    var searchSurface = new Surface({
        size: [undefined, 150],
        classes: ['timeline-search-wrapper']
    });

    var searchInput = new Surface({
        content : "<input type='text' class='red-input' value='Digite o que você gostaria de fazer'>" 
    });
    var searchInputMod = new StateModifier({
        transform: Transform.translate(0, 100, 1)
    })

    this._add(searchInputMod).add(searchInput);
    this._add(searchSurface);
}

function _createResultsBox () {
    var resultsSurface = new Surface({
        size: [undefined, undefined],
        classes: ['timeline-results-wrapper'],
        content: 'conteúdo da timeline'
    });
    var resultsModifier = new StateModifier({
        transform: Transform.translate(0, 150, 1)
    })

    this._add(resultsModifier).add(resultsSurface);
}

function _setListeners() {
    this.bringBackSurface.on('click', function() {
        this._eventOutput.emit('timelineToggle');
    }.bind(this));
}
