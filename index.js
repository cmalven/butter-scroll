var throttle = require('lodash.throttle');

module.exports = function(options) {
  /*
  OPTIONS:
  $containerEl        The jQuery element that holds the element to scroll
                      [jQuery Object] (required)
  $elToScroll         The jQuery element that will be scrolled
                      [jQuery Object] (required)
  scrollEase          The ease at which the element will be scrolled into position
                      [Number] (optional)
  maxDepthOffset      The max amount of offset that the highest depth layer can have
                      [Number] (optional)
  */
 
  //
  //   Private Vars
  //
  //////////////////////////////////////////////////////////////////////
 
  var self = {
    targetScroll: 0,
    currentScroll: 0,
    maxDepth: 10,
    depthAttr: 'depth',
    eventThrottleMs: 16,
    isScrolling: false,
    arrivalThreshold: 0.05,
    depthItems: [],
    prefixedTransform: typeof window.Modernizr !== 'undefined' ? Modernizr.prefixed('transform') : 'transform',
    cssTransformsSupported: typeof window.Modernizr !== 'undefined' ? Modernizr.csstransforms : true,
    cssTransforms3dSupported: typeof window.Modernizr !== 'undefined' ? Modernizr.csstransforms3d : true
  };
 
 
  //
  //   Public Vars
  //
  //////////////////////////////////////////////////////////////////////
 
  self.settings = $.extend({
    scrollEase: 0.15,
    maxDepthOffset: 500
  }, options);
 
 
  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////
 
  var _init = function() {
    // Bail out if CSS transforms aren't supported
    if (!self.cssTransformsSupported || !self.cssTransforms3dSupported) return;

    // Setup
    _configure();
    _addDepthItems();
    _addEventListeners();
    _handleDepth();
    window.requestAnimationFrame(_update);
  };

  var _configure = function() {
    // Set the container settings
    self.settings.$containerEl[0].style.cssText = `
      overflow: hidden;
      position: fixed;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
    `

    // Create the scroller element
    var $scroller = $('<div class="scroller" />');
    $scroller[0].style.cssText = `
      display: block;
      width: 100%;
    `
    $('body').append($scroller);
  };

  var _addDepthItems = function() {
    $('*[data-' + self.depthAttr + ']').each(function() {
      var depth = $(this).data(self.depthAttr);
      var item = {
        $el: $(this),
        depth: depth,
        topOffset: $(this).offset().top,
        percentageDepth: depth / self.maxDepth
      }
      self.depthItems.push(item);
    });
  };
 
  var _addEventListeners = function() {
    $(window)
      .on('resize', throttle(_onResize, self.eventThrottleMs))
      .on('scroll', throttle(_onScroll, self.eventThrottleMs))
      .trigger('resize');
  };

  var _update = function() {
    // If we're scrolled into position, stop animating for now
    if (Math.abs(self.targetScroll - self.currentScroll) < self.arrivalThreshold) {
      self.currentScroll = self.targetScroll;
      _setScroll(self.currentScroll);
      return self.isScrolling = false;
    }

    // Otherwise, figure out how much to animate the scroll by
    var scrollY = (self.targetScroll - self.currentScroll) * self.settings.scrollEase;
    self.currentScroll += scrollY;
    _setScroll(self.currentScroll);

    // Offset each parallax piece individually
    _handleDepth();

    // Request a new animation frame
    window.requestAnimationFrame(_update);
  };

  var _setScroll = function(scrollPosition) {
    self.settings.$elToScroll[0].style[self.prefixedTransform] = `translateZ(0) translateY(${scrollPosition}px)`
  };

  var _handleDepth = function() {
    // Get the position of the browser window that we'll measure distance against
    var scrollOrigin = Math.abs(self.targetScroll) + ($(window).height() / 2);
    var maxDistance = $(window).height() * 2;

    var depthItemsLength = self.depthItems.length;
    while (depthItemsLength--) {
      var item = self.depthItems[depthItemsLength];
      var distance = scrollOrigin - item.topOffset;
      var percentageDistance = distance / maxDistance;
      var offset = Math.round(self.settings.maxDepthOffset * item.percentageDepth * percentageDistance * -1);
      item.$el[0].style[self.prefixedTransform] = `translateY(${offset}px) translateZ(0)`;
    }
  };

  var _onResize = function(evt) {
    var height = self.settings.$elToScroll.innerHeight();
    $('.scroller').height(height);
  };

  var _onScroll = function(evt) {
    var posY = $(window).scrollTop();
    self.targetScroll = Math.round(-posY);

    // If we weren't scrolling before, start scrolling
    // and request an animation frame
    if (!self.isScrolling) {
      self.isScrolling = true;
      window.requestAnimationFrame(_update);
    }
  };
 
 
  //
  //   Initialize
  //
  //////////////////////////////////////////////////////////////////////
 
  _init();
 
  // Return the Object
  return self;
};