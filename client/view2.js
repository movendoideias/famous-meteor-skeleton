var Surface = famous.core.Surface,
      View = famous.core.View,
      Transform = famous.core.Transform,
      StateModifier = famous.modifiers.StateModifier,
      Easing = famous.transitions.Easing;
      Transitionable = famous.transitions.Transitionable,
      SpringTransition = famous.transitions.SpringTransition,
      TransitionableTransform = famous.transitions.TransitionableTransform;

Template["view2"].events({
  "click button": function(e, t) {
    Router.go("View1", {transition: "SlideRight"});
  }
});


var template = document.createElement("div");
UI.insert(UI.render(Template["view2"]), template);
var surface = new Surface({
  size: [undefined, undefined],
  content: template,
  classes: ["view2"]
});

var viewModifier = new StateModifier({
  origin: [.5, .5],
  transform: Transform.scale(1, 1, 1)
});

View2 = new View();
View2.add(viewModifier).add(surface);

this.View2 = View2;