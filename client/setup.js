Meteor.startup(function() {
  Celestial = new Celestial();
  Celestial.addView("View1", View1);
  Celestial.addView("View2", View2);
});
      