// Random Sizes and depth offsets for box items
$('.box').each(function() {
  var randSize = Math.round(Math.random() * 600) + 200;
  var randDepth = Math.round(Math.random() * 10);
  $(this)
    .css({
      width: randSize + 'px',
      height: randSize + 'px'
    })
    .attr('data-depth', randDepth);
})

new ButterScroll({
  $containerEl: $('.js-outer-container'),
  $elToScroll: $('.js-inner-container'),
  scrollEase: 0.4, // optional
  maxDepthOffset: 500 // optional
});