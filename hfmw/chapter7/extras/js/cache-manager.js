(function () {
  
  var CacheManager = window.CacheManager = function (pageSelector) {
    this.page = $(pageSelector);
  };

  var proto = {};

  proto.ensureFreshContent = function (selector, updateURL) {
    if (!window.applicationCache) return;

    this.selector  = selector;
    this.updateURL = updateURL;
    
    this.addAppCacheListeners();
    
    this.page.live('pageshow', $.proxy(this.checkCache, this));
  };

  proto.addAppCacheListeners = function () {
    var appCache = window.applicationCache,
        showCached = $.proxy(this.showCached, this);
    
    // If there's nothing to update, we'll show the cached version.
    // Note that a couple of these might fire, but in our case
    // there's no real harm in calling the handler multiple times.
    appCache.addEventListener('cached', showCached, false);
    appCache.addEventListener('error', showCached, false);
    appCache.addEventListener('noupdate', showCached, false);
    appCache.addEventListener('obsolete', showCached, false);

    // But! If we recognize an update, swap out the cache & display it.
    appCache.addEventListener('updateready', $.proxy(this.updateCache, this), false);

    // Bear with us... 
    // This works around problems with the listeners & jQM on some devices.
    // See also note in checkCache()
    appCache.__listenersAdded = true;

  };

  proto.checkCache = function () {
    var appCache = window.applicationCache;
    
    // See note above in addAppCacheListeners()
    // On some devices, with jQM, the applicationCache object appears to be overridden
    // when new pages are initted. So we'll need to re-register the listeners.
    // Though not ideal, we check this by glomming on to the applicationCache object.
    if (!appCache.__listenersAdded) this.addAppCacheListeners();

    try {
      if (appCache.status != appCache.UNCACHED) {
        // Hide the content until we know we have the latest
        $.mobile.showPageLoadingMsg();
        $(this.selector).hide();
        appCache.update();
      }
    } catch (e) {
      // If it failed, just show the cached data.
      this.showCached();
    }
  };

  proto.showCached = function (evt) {
    $(this.selector).show();
    $.mobile.hidePageLoadingMsg();
  };

  proto.updateCache = function (evt) {
    var self = this;

    // AJAX request to get updated dynamic data
    $.get(self.updateURL, function(data) {
      $(self.selector).html(data).show();
      $.mobile.hidePageLoadingMsg();    
      $(self.selector).listview().listview('refresh');
    });

    try {
      window.applicationCache.swapCache();
    } catch (e) {}

  };

  CacheManager.prototype = proto;

}());
