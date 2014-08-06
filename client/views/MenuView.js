// Famous Modules
var Surface    = require('famous/core/Surface');
var Modifier   = require('famous/core/Modifier');
var Transform  = require('famous/core/Transform');
var View       = require('famous/core/View');
var GridLayout = require('famous/views/GridLayout');

MenuView = function (params) {
    View.apply(this, arguments);

    this.open = false;

    this.hinge = new Modifier({
        transform: Transform.thenMove(Transform.rotateY(-Math.PI/2.5), [-100, 0, 0])
    });

    this.layout = new GridLayout({
        dimensions: [1, 6]
    });

    this.buttons = [];
    this.layout.sequenceFrom(this.buttons);

    createButtons.call(this);

    this._add(new Modifier({size : [100, undefined]})).add(new Modifier({origin : [1,0]})).add(this.hinge).add(this.layout);
}

MenuView.prototype = Object.create(View.prototype);
MenuView.prototype.constructor = MenuView;

MenuView.prototype.flipOut = function() {
    this.hinge.setTransform(Transform.translate(-100, 0, 0), { duration: 500, curve: 'easeOut' });
}

MenuView.prototype.flipIn = function() {
    this.hinge.setTransform(Transform.thenMove(Transform.rotateY(-Math.PI/2.2), [-100, 0, 0]), { duration: 500, curve: 'easeOut' });
};

var categories = [
    {
        name: 'all',
        icon: '&#xf01c;'
    },
    {
        name: 'home',
        icon: '&#xf015;'
    },
    {
        name: 'work',
        icon: '&#xf0b1;'
    },
    {
        name: 'friends',
        icon: '&#xf0c0;'
    },
    {
        name: 'shopping',
        icon: '&#xf07a;'
    },
    {
        name: 'settings',
        icon: '&#xf013;'
    }
];

var createButtons = function() {
    for(var i = 0; i < categories.length; i++) {
        var buttonView = new View();

        var backingSurface = new Surface({
            size: [undefined, undefined],
            classes: ["fa", "side-view-button", categories[i]["name"]]
        });

        var iconSurface = new Surface({
            size: [undefined, undefined],
            content: categories[i]['icon'],
            classes: ["fa", "side-view-button", categories[i]["name"]],
            properties: {
                lineHeight: '60px'
            }
        });

        var iconMod = new Modifier({
            transform: Transform.translate(0, 0, 1),
            size: [100, 60],
            origin: [.5, .5]
        });

        buttonView.add(backingSurface);
        buttonView.add(iconMod).add(iconSurface);
        this.buttons.push(buttonView);
    }
};

