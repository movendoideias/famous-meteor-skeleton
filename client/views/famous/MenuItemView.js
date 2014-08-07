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
};

function _createBody() {
    var surface = new Surface({
        size: [undefined, undefined],
        content: "<a href='/" + this.options.url + "'>" + this.options.title + "</a>",
        properties: {
            color: 'white',
            fontSize: '24px'
        }
    });
    this._add(surface);
}




