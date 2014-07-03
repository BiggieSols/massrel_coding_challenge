massrel.BandView = Backbone.View.extend({
  template: _.template($('#band-template').html()),
  
  render: function() {
    var csvNum;
    csvNum = this._commaSeparateNumber(this.model.get("count"));
    this.$el.html(this.template({csvNum: csvNum}));
    return this;
  },

  refresh: function(refreshedBand) {
    this._animateCount(this.model.escape("count"), refreshedBand.escape("count"));
    this._fadeName(this.model.escape("name"), refreshedBand.escape("name"));
    this.model = refreshedBand;
  },

  _fadeName: function(oldName, newName) {
    var $nameNode;

    if(oldName !== newName) {
      $nameNode = this.$('.name');
      $nameNode.fadeOut(300, function() {
        $nameNode.text(newName);
      });
      $nameNode.fadeIn(300);
    }
  },

  _animateCount: function(oldCount, newCount) {
    var start, end, _this;
    start = oldCount;
    end   = newCount;
    _this = this;

  // Animate the element"s value from x to y:
    $({count: start}).animate({count: end}, {
        duration: 1000,
        step: function() {
          _this.$(".count").text(_this._commaSeparateNumber(Math.round(this.count)));
        }
    });
  },

  _commaSeparateNumber: function(val) {
    var valArr = val.toString().split("");
    var len = valArr.length;
    for(var i = 3; i < len; i += 3) {
      valArr.splice(len - i, 0, ",");
    }
    return valArr.join("");
  }
});