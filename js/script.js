var updateResults = function(results) {
  bands.reset(results);
};

var container = $('.bands-container');
var p         = new massrel.Poller({frequency: 15, limit: 5}, updateResults);
var bands     = new massrel.Bands();
var bandsView = new massrel.BandsView({collection: bands});

container.html(bandsView.render().$el);
p.start();