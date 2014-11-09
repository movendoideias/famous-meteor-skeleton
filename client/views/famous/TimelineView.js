var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var Modifier = require("famous/core/Modifier");
var Scrollview = require("famous/views/Scrollview");
var View = require('famous/core/View');
var ViewSequence = require('famous/core/ViewSequence');
var ContainerSurface = require("famous/surfaces/ContainerSurface");

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
        transform: Transform.translate(60, -40, 2)
    });

    this.add(this.bringBackModifier).add(this.bringBackSurface);
    this.add(surface);
}

function _createSearchHeader () {
    var headerView = new View();
    
    this.add(headerView);
    
    var headerMod = new StateModifier({
        transform: Transform.translate(0, 0, 2)
    })
    
    var x = headerView.add(headerMod);
    
    var searchSurface = new Surface({
         size: [undefined, 150],
        classes: ['timeline-search-wrapper']
    });    
    var searchMod = new StateModifier({
        transform: Transform.behind
    });
    
     x.add(searchMod).add(searchSurface);
    
    var searchInput = new Surface({
        content : "<input type='text' class='red-input' value='Write something'>" 
    });
    var searchInputMod = new StateModifier({
        size:[undefined,0],
        transform: Transform.translate(0, 100, 1)
    })
       
    x.add(searchInputMod).add(searchInput);
    
}

function _createResultsBox () {
    var scrollView = new Scrollview();
    console.log(screen.height);
    console.log(window.innerHeight);
    var containerScroll = new ContainerSurface({
        size: [undefined, document.documentElement.clientHeight - 150],
        properties: {
            overflow: 'hidden'
        }
    });
    
    var viewMod = new Modifier({
        transform: Transform.translate(0, 150, 1)
    })
    
    this.add(viewMod).add(containerScroll); 
    
    var postsView = new ViewSequence();
    scrollView.sequenceFrom(postsView);
    
    for(var i = 0; i < 20; i++){

        var postView = new View();
        
        var postMod = new StateModifier({
            size: [undefined, 155]
        });

        var resultsSurface = new Surface({
            size: [undefined, 150],
            classes: ['timeline-results-wrapper'],
            content: 'Timeline content ' + i,
            properties: {
                backgroundColor: '#A0A0A0',
                lineHeight: '150px',
                marginTop: '10px'
            }
        });
                
        resultsSurface.pipe(scrollView);  
        
        var y  = postView.add(postMod);
        y.add(resultsSurface);
        
        postsView.push(postView);
    } 
    containerScroll.add(scrollView);
}

function _setListeners() {
    this.bringBackSurface.on('click', function() {
        this._eventOutput.emit('timelineToggle');
    }.bind(this));
}
