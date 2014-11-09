var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var Timer         = require('famous/utilities/Timer');

MenuView = function () {
    View.apply(this, arguments);

    _createBackground.call(this);
    _createMenuItems.call(this);
}

MenuView.prototype = Object.create(View.prototype);
MenuView.prototype.constructor = MenuView;

MenuView.DEFAULT_OPTIONS = {
    menuItemWidth: 276,
    menuItemHeight: 54,
    topOffset: 5,
    menuItemOffset: 59,
    duration: 400,
    staggerDelay: 35
};

function _createBackground() {
    var backSurface = new Surface({
        size: [276, undefined],
        classes: ['menu-wrapper']
    });

    this._add(backSurface);

    var sizeModifier = new StateModifier({
        //size: [276, undefined],
        origin: [1, 0]
    });

    this._add(sizeModifier).add(backSurface);
}

function _createMenuItems() {

    var view = new View();
    var sizeModifier = new StateModifier({
        size: [276, undefined],
        origin: [1, 0]
    });

    var sizeNode = view.add(sizeModifier);

    this.menuItemModifiers = [];

    var menuItemsData = [
        { title: 'Start', url: '', iconUrl: 'img/strip-icons/famous.png' },
        { title: 'Events', url: 'events', iconUrl: 'img/strip-icons/famous.png' },
        { title: 'My items', url: 'events', iconUrl: 'img/strip-icons/famous.png' },
        { title: 'Friends', url: 'friends', iconUrl: 'img/strip-icons/famous.png' },
        { title: 'Profile', url: 'settings', iconUrl: 'img/strip-icons/famous.png' }
    ];

    
    for (var i = 0, l = menuItemsData.length;i < l; i++) {

        var menuItemView = new MenuItemView({
            iconUrl: menuItemsData[i].iconUrl,
            title: menuItemsData[i].title,
            url: menuItemsData[i].url,
            width: this.options.menuItemWidth,
            height: this.options.menuItemHeight
        });

        var yOffset = this.options.topOffset + this.options.menuItemOffset * i;

        var menuItemModifier = new StateModifier({
            transform: Transform.translate(this.options.menuItemWidth, yOffset, 0)
        });

        this.menuItemModifiers.push(menuItemModifier);
        sizeNode.add(menuItemModifier).add(menuItemView);
    }

    this._add(sizeNode);
};


MenuView.prototype.resetMenuItems = function () {
    for(var i = 0; i < this.menuItemModifiers.length; i++) {
        var initX = this.options.menuItemWidth;
        var initY = this.options.topOffset + this.options.menuItemOffset * i + this.options.menuItemHeight * 2;

        this.menuItemModifiers[i].setOpacity(0.0);
        this.menuItemModifiers[i].setTransform(Transform.translate(initX, initY, 0));
    }
};

MenuView.prototype.animateMenuItems = function() {
    this.resetMenuItems();

    for(var i = 0; i < this.menuItemModifiers.length; i++) {
        // use Timer.setTimeout instead of window.setTimeout
        // Time can be found in famous/utilities

        Timer.setTimeout(function(i) {
            var yOffset = this.options.topOffset + this.options.menuItemOffset * i;

            this.menuItemModifiers[i].setOpacity(1, { duration: this.options.duration, curve: 'easeOut' });
            this.menuItemModifiers[i].setTransform(
                Transform.translate( 0, yOffset, 0), { duration: this.options.duration, curve: 'easeOut' });
        }.bind(this, i), i*this.options.staggerDelay);
    }
};
