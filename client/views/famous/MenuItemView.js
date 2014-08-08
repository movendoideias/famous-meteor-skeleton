var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

MenuItemView = function () {
    View.apply(this, arguments);

    _createBody.call(this);
}

MenuItemView.prototype = Object.create(View.prototype);
MenuItemView.prototype.constructor = MenuItemView;

MenuItemView.DEFAULT_OPTIONS = {
    iconUrl: '',
    title: 'Menu Sem Nome',
    url: '',
    fontSize: 26,
    width: 276,
    height: 55,
    angle: -0.2,
    iconSize: 32,
};

function _createBody() {
    var surface = new Surface({
        size: [this.options.width, this.options.height],
        content: "<a href='/" + this.options.url + "'>" + this.options.title + "</a>",
        properties: {
            fontSize: '24px'
        }
    });

    var rotateModifier = new StateModifier({
        transform: Transform.rotateZ(this.options.angle)
    });

    var skewModifier = new StateModifier({
        transform: Transform.skew(0, 0, this.options.angle)
    });

    this._add(rotateModifier).add(skewModifier).add(surface);
}




