const legacyWidget = `<div class="hp-row legacy-widget">
<div class="legacy-image"></div>
<div class="legacy-content">
<div class="legacy-text">
<div class="legacy-icon"></div>
<div class="legacy-title">
<h3>Leave a Lasting Legacy</h3>
<p>Planned Giving to Chabad</p>
</div>
</div>
<a href="/PlannedGiving" class="legacy-button">Learn More Here</a>
</div>
</div>
</div>`;

const hugInJugWidget = `<div class="hp-row huginjug-widget">
<div class="huginjug-image"></div>
<div class="huginjug-content">
<div class="huginjug-text">
<div class="huginjug-title-section">
<div class="huginjug-icon"></div>
<div class="huginjug-title">
<h3>Hug in a Jug</h3>
<h5>Delivering Love One Matzo Ball at a Time</h5>
</div>
</div>
<p>Hug in a Jug was created to serve the needs of our growing senior community by delivering homemade soup, seasoned with love, support, and companionship. We bring love and warmth to seniors who are holocaust survivors, recovering from an illness or injury, and others who just need a friendly "pick-me-up" and some company.</p>
</div>
<div class="huginjug-button-wrapper">
<a href="https://huginajug.org/register" class="huginjug-button-outline">Volunteer</a>
<a href="https://huginajug.org/register#0324e1ad-8842-4a43-956b-463bd2dcc81c" class="huginjug-button">Register Here</a>
</div>
</div>
</div>
</div>`;

function setUpLayout() {
  // wrapping promos in container
  jQuery(
    ".message .widget_content .bottom_padding, .message .widget_content .readMore",
  ).wrapAll('<div class="text-column"></div>');

  const aboutUsImage = `<div class="image-column"><div class="photo-slideshow"></div></div>`;

  jQuery(".message").prepend(aboutUsImage);

  // wrapping promos in container
  var $rows = jQuery(".hp-row").slice(2, 3);

  $rows.wrapAll('<div class="hp-row-wrapper"></div>');

  // setup featured events
  const featuredEvents = jQuery(".promo_slider");
  featuredEvents[1].classList.add("featured-events");

  // add ongoing events
  jQuery(".hp-row-wrapper").append(`<div class='hp-row'>
    <div class="service-container">
    <div class="service"><a href="/4612757"></a><div class="text-content"><div class="times">Shabbat • 9:00 AM</div><div class="title">Shabbat Service</div><p> Join us for Shabbat morning services at the Chabad Jewish Center</p></div></div>
    <div class="service"><a href="/6310787"></a><div class="text-content"><div class="times"></div><div class="title">Torah & Tea</div><p> A weekly women's gathering featuring Torah insights, tea, and meaningful discussion</p></div></div>
    <div class="service"><a href="/4147253"></a><div class="text-content"><div class="times">Monday & Wednesday • 7:30 PM</div><div class="title">Weekly Torah & Tanya Study</div><p>Classes on the weekly Torah portion and Tanya, held every Monday and Wednesday at 7:30 PM</p></div></div>
    </div>
    </div>`);

  if (jQuery(".promo_slider").eq(1).find(".slide_wrapper").length <= 0) {
    jQuery(".promo_slider").eq(1).addClass("no-events");
  }

  if (jQuery("#noRecordsText")) {
    jQuery("#noRecordsText").html(
      `There's always something happening at Chabad. While no special events are currently scheduled, we invite you to join our ongoing programs. <br /> <br />  To stay informed about future programs and events, please <a href="/subscribe">join our mailing list here</a>.`,
    );
  }

  // jewish women's circle widget
  var $rows = jQuery(".hp_content_wrapper .sneak-peek-container .sneak_peek");

  $rows.wrapAll('<div class="sneak-peak-wrapper"></div>');

  if ($rows.length > 0) {
    const link = jQuery(
      ".hp_content_wrapper .sneak-peek-container .sneak_peek a",
    )[0].pathname;
    jQuery(".sneak-peak-wrapper").append(
      `<a href=${link} class='readMore'>RSVP Here</a>`,
    );
  }

  // update candlelighting widget title
  jQuery(
    ".hp_content_wrapper .candlelighting .widget_header.widget_header h5",
  ).text("Candle Lighting Times");

  // move subscribe form
  subscribeElement = document.querySelector(".hp-row.hp_subscribe");
  footerElement = document.querySelector("#footer");
  footerElement.prepend(subscribeElement);

  // add legacy section before footer
  footerElement.insertAdjacentHTML("beforebegin", legacyWidget);

  // add hug in jug section before syndicated content
  const widgetsSection = document.querySelector(".hp-row.hp_content_wrapper");
  widgetsSection.insertAdjacentHTML("afterend", hugInJugWidget);
}

function setUpAboutUsImages() {
  const slideshow = document.querySelector(
    ".widget-1.message .photo-slideshow",
  );

  if (!slideshow) {
    console.warn("Slideshow container not found.");
    return;
  }

  const waitForPhotos = setInterval(function () {
    const source = document.querySelector(".latest_photos");

    // Keep waiting until the Latest Photos widget appears
    if (!source) {
      console.log("Waiting for Latest Photos widget...");
      return;
    }

    const images = source.querySelectorAll("li img");

    // The widget exists, but its images may not have loaded yet
    if (!images.length) {
      console.log("Waiting for photo images...");
      return;
    }

    // Extract the background-image URLs
    const urls = Array.from(images)
      .map(function (img) {
        const bg = img.style.backgroundImage;
        const match = bg.match(/url\(["']?(.*?)["']?\)/i);
        return match ? match[1] : null;
      })
      .filter(Boolean);

    // Wait if the photos have not been populated yet
    if (!urls.length) {
      console.log("Widget found, but no photo URLs yet...");
      return;
    }

    // Stop polling once we have the URLs
    clearInterval(waitForPhotos);

    console.log("Photo URLs found:", urls);

    // Build the slideshow
    slideshow.innerHTML = "";

    const slides = urls.map(function (url, index) {
      const img = document.createElement("img");
      img.src = url;
      img.alt = "About Us photo " + (index + 1);

      if (index === 0) {
        img.classList.add("active");
      }

      slideshow.appendChild(img);
      return img;
    });

    // Rotate photos every 3 seconds
    if (slides.length > 1) {
      let current = 0;

      setInterval(function () {
        slides[current].classList.remove("active");
        current = (current + 1) % slides.length;
        slides[current].classList.add("active");
      }, 3000);
    }
  }, 500);
}

function init() {
  setUpLayout();
  setUpAboutUsImages();
}

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
