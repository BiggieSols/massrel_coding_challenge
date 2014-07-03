massrel.Bands = Backbone.Collection.extend({
  parse: function(res) {
    res.bands = [];
    res.forEach(function(bandData) {
      res.bands.push(new massrel.Band(bandData));
    });
    return res;
  }
});