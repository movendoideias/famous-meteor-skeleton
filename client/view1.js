var Surface = famous.core.Surface,
      View = famous.core.View,
      Transform = famous.core.Transform,
      StateModifier = famous.modifiers.StateModifier,
      Easing = famous.transitions.Easing;


Template["view1"].events({
  "click button": function(e, t) {
    Router.go("View2", {transition: "SlideLeft"});
  }
});


var template = document.createElement("div");
UI.insert(UI.render(Template["view1"]), template);
var surface = new Surface({
  size: [undefined, undefined],
  content: template,
  classes: ["view1"]
});

var viewModifier = new StateModifier({
  transform: Transform.translate(0, 0, 0)
});

View1 = new View();
View1.add(viewModifier).add(surface);

this.View1 = View1;