function setUpLayout() {
  // wrapping promos in container
  jQuery(
    ".message .widget_content .bottom_padding, .message .widget_content .readMore",
  ).wrapAll('<div class="text-column"></div>');

  const aboutUsImage = `<div class="image-column"></div>`;

  jQuery(".message").prepend(aboutUsImage);

  // setting up featured events
  // const clonedSlider = jQuery(".widget-1.promo_slider").last().parent().clone();
  // clonedSlider.addClass('featured-events');
  // clonedSlider.find('.slide_wrapper').slice(3).remove();
  // jQuery(".widget-4 .widget_content").first().before(clonedSlider);
  // jQuery(".widget-4 .widget_header h5").first().text("Featured Events");

  // wrapping promos in container
  var $rows = jQuery(".hp-row").slice(2, 4);

  $rows.wrapAll('<div class="hp-row-wrapper"></div>');
}

function init() {
  setUpLayout();
}

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
