var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var Timer         = require('famous/utilities/Timer');

MenuView = function () {
    View.apply(this, arguments);

    _createBody.call(this);
    _createMenuItems.call(this);
}

MenuView.prototype = Object.create(View.prototype);
MenuView.prototype.constructor = MenuView;

MenuView.DEFAULT_OPTIONS = {
    stripData: {},
    angle: -0.2,
    stripWidth: 276,
    stripHeight: 54,
    topOffset: 37,
    stripOffset: 58,
    staggerDelay: 35,
    featureOffset: 280,
    transition: {
        duration: 400,
        curve: 'easeOut'
    }
};

function _createBody() {
    var surface = new Surface({
        classes: ['menu-wrapper']
    });
    var sizeModifier = new StateModifier({
        size: [276, undefined],
        origin: [1, 0]
    });
    
    this._add(sizeModifier).add(surface);
}

function _createMenuItems() {
    var view = new View();
    var sizeModifier = new StateModifier({
        size: [276, undefined],
        origin: [1, 0]
    });

    var sizeNode = view.add(sizeModifier);

    this.menuItemModifiers = [];
    var yOffset = 40;

    var menuItemsData = [
        { title: 'Início', url: '', iconUrl: 'img/strip-icons/famous.png' },
        { title: 'Eventos', url: 'events', iconUrl: 'img/strip-icons/famous.png' },
        { title: 'Meus Topas', url: 'events', iconUrl: 'img/strip-icons/famous.png' },
        { title: 'Amigos', url: 'friends', iconUrl: 'img/strip-icons/famous.png' },
        { title: 'Perfil', url: 'settings', iconUrl: 'img/strip-icons/famous.png' },
    ];

    for (var i = 0; i < menuItemsData.length; i++) {

        var menuItemView = new MenuItemView({
            iconUrl: menuItemsData[i].iconUrl,
            title: menuItemsData[i].title,
            url: menuItemsData[i].url
            
        });

        var menuItemModifier = new StateModifier({
            transform: Transform.translate(0, yOffset, 0),
            size: [undefined, 100]
        });

        this.menuItemModifiers.push(menuItemModifier);
        sizeNode.add(menuItemModifier).add(menuItemView);

        yOffset += 40;
    }
    
    this._add(sizeNode);
}


MenuView.prototype.resetStrips = function() {
    for(var i = 0; i < this.menuItemModifiers.length; i++) {
        var initX = -this.options.stripWidth;
        var initY = this.options.topOffset
        + this.options.stripOffset * i
        + this.options.stripWidth * Math.tan(-this.options.angle);

        this.menuItemModifiers[i].setTransform(Transform.translate(initX, initY, 0));
    }
};

MenuView.prototype.animateStrips = function() {
    this.resetStrips();

    var transition = this.options.transition;
    var delay = this.options.staggerDelay;
    var stripOffset = this.options.stripOffset;
    var topOffset = this.options.topOffset;

    for(var i = 0; i < this.menuItemModifiers.length; i++) {
        Timer.setTimeout(function(i) {
            var yOffset = topOffset + stripOffset * i;

            this.menuItemModifiers[i].setTransform(
                Transform.translate( 0, yOffset, 0), transition);
        }.bind(this, i), i * delay);
    }
};
