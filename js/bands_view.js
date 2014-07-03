massrel.BandsView = Backbone.View.extend({
  template: _.template($('#bands-template').html()),
  divider: _.template($('#bands-divider').html()),
  bandViews: [],

  initialize: function() {
    this.listenTo(this.collection, "reset", this._renderOrRefresh);
  },
  
  render: function() {
    this.$el.html(this.template({"search_label": "some label"}));
    return this._renderBands();
  },

  _renderBands: function() {
    var _this, lastBand;
    _this    = this;
    lastBand = this.collection.models[bandsView.collection.length - 1];
    this.collection.forEach(function(band) {
      var bandView = new massrel.BandView({model: band});
      _this.bandViews.push(bandView);
      _this.$el.append(bandView.render().$el);

      if(band != lastBand) _this.$el.append(_this.divider);
    });
    return this;
  },

  _refreshBands: function() {
    var i;
    for(i = 0; i < this.bandViews.length; i++) {
      var band = this.collection.models[i];
      this.bandViews[i].refresh(band);
    }
    return this;
  },

  _renderOrRefresh: function() {
    if(this.bandViews.length > 0) {
      return this._refreshBands();
    } else {
      return this.render();
    }
  }
});