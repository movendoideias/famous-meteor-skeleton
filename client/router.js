Router.map(function() {

  this.route("View1", {
    path: "/:transition?",
    template: "blank",
    onBeforeAction: function() {
      Celestial.show("View1", this.params.transition);
    }
  });

  this.route("View2", {
    path: "/view2/:transition?",
    template: "blank",
    onBeforeAction: function() {
      Celestial.show("View2", this.params.transition);
    }
  });
  
});
