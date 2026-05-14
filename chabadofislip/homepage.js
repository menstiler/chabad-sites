const textWidgetHtml = `<div class="chabad_description_box">
<div class="header">
<h5>A PLACE TO BELONG!</h5> 
</div>
<div class="text">
Chabad of Islip is your home on the Great South Bay to experience the warmth, meaning, and joy of Jewish life. Join us for classes, Shabbat, holiday celebrations, and community events year-round.
</div>
<div class="action">
<a href="/4462264" class='learn-more-btn'>Learn More</a>
</div>
</div>
`;

const promosWidgetHtml = `<div class="promos-bg">
<div class="promos-container">
    <div class="promo-box">
    <a href="/3346420"></a>
    <div class="promo-box-info shul-bg"></div>
    <div class="title">The Shul</div>
    </div>
 <div class="promo-box">
 <a href="/2053763"></a>
 <div class="promo-box-info shabbat-bg"></div>
    <div class="title">Shabbat & Holidays</div>
    </div>
 <div class="promo-box">
 <a href="/7341392"></a>
 <div class="promo-box-info hebrew-school-bg"></div>
    <div class="title">Hebrew School</div>
    </div>
     <div class="promo-box">
      <a href="/2493539"></a>
     <div class="promo-box-info womens-circle-bg"></div>
    <div class="title">Jewish Women's Circle</div>
    </div>
    <div class="promo-box">
    <a href="/2053764"></a>
    <div class="promo-box-info adult-education-bg"></div>
    <div class="title">Adult Education</div>
    </div>
    <div class="promo-box">
    <a href="/2074578"></a>
    <div class="promo-box-info photos-bg"></div>
    <div class="title">Latest Photos</div>
    </div>
    <div class="promo-box">
      <a href="/3736954"></a>
    <div class="promo-box-info donate-bg"></div>
    <div class="title">Donate</div>
    </div>
     <div class="promo-box">
     <a href="/4046077"></a>
     <div class="promo-box-info fire-island-bg"></div>
    <div class="title">Fire Island Visitors</div>
    </div>
    </div>
</div>`;

const mobileSubscribeWidget = `<form autocomplete="off" class="bottom_subscribe_box" action="/templates/articlecco.asp?aid=4456691" method="post" id="form1" onsubmit="return Co.Forms.Validation.Validate(this);" novalidate="true">
<input type="hidden" name="site" value="">         
<input type="hidden" name="sc" value="">
<div class="co_body article-body cf">
<div id="formBody">
<div class="field-row">
<input type="text" class="mobile_input_field" name="q3_fullName[first]" placeholder="First Name" tabindex="1" required="false" class=" active active">         
<input type="text" class="mobile_input_field" name="q3_fullName[last]" placeholder="Last Name" tabindex="1" required="false" class=" active active">
<input type="text" class="mobile_input_field" name="q6_email" placeholder="Email" tabindex="1" required="false" class=" active active">   
</div>
<div class="break_floats"> </div>
<div class="clearfix">
<script>
      var recaptchaIsEnterprise = false;
           var recaptchaV2Key = "6LcG_TcUAAAAAKAVgwgW39ujc9OCjXSoQYFIA-Su";
  
  </script>          
<input type="hidden" class="js-recaptcha-input" name="cdo-captcha-response" value="" data-div-id="aa8b9f8c-fc59-4a59-9cd6-68d3089944e0" data-processed="false">
<div class="js-recaptcha-wrapper" id="aa8b9f8c-fc59-4a59-9cd6-68d3089944e0"> </div>
</div>
<div class="ccoFormFooter">
<div class="small bold center bottom_padding">
<div class="grey f-small"> </div>
</div>
<div align="center">
<input type="submit" value="Subscribe" name="SubmitCCO" tabindex="1000" id="CoButton">
<p align="center" style="font-size: 8pt; color: #666666; font-family: Verdana, Helvetica; margin-bottom: 3px; margin-top: 6px;">
<img valign="absbottom" src="https://w2.chabad.org/images/global/icons/lock.gif" width="16" height="16" alt="Secure">                                   This page uses 128 bit SSL encryption to keep your data secure.</p>
</div>
<input type="hidden" name="FormCCOSubmited" value="true"></div>
</form>
`;

function setUpSearch() {
  jQuery("#tabContentMain").append(
    '<div class="search_menu_item search-trigger-container"><a href="#" class="search-trigger"><i class="fa fa-search"></i></a></div>',
  );
  jQuery("#tabContentMain").append(jQuery(".cco_search_header"));
  jQuery("#tabContentMain").addClass("js-search-added");

  jQuery(".search-trigger").on("click", function () {
    jQuery(".cco_search_header").addClass("show");
    jQuery("#topAreaTopSearch_search").focus();
    jQuery(".search_menu_item").hide();
    return false;
  });

  jQuery(document).on("click", function (e) {
    if (
      jQuery(e.target).closest(".cco_search_header").length > 0 ||
      jQuery(e.target).closest(".search-trigger").length > 0
    ) {
    } else {
      jQuery(".cco_search_header").removeClass("show");
      jQuery(".search_menu_item").show();
    }
  });
}

function setUpScrolling() {
  window.addEventListener("scroll", function () {
    const header = document.querySelector("#header");

    if (!header) return;

    const headerOffsetTop = header.offsetTop; // Get the initial top position of the header
    const headerWrapper = document.querySelector("#header .wrapper");

    // Calculate the point at which the header should change
    // This is typically the bottom of the target element
    const scrollThreshold = header.offsetTop + header.offsetHeight;

    window.addEventListener("scroll", () => {
      if (window.scrollY > scrollThreshold) {
        headerWrapper.classList.add("scrolled-header");
      } else {
        headerWrapper.classList.remove("scrolled-header");
      }
    });

    if (window.pageYOffset > headerOffsetTop) {
      headerWrapper.classList.add("fixed-header");
    } else {
      headerWrapper.classList.remove("fixed-header");
    }
  });
}

function setUpSiteWideTicker() {
  if (!window.location.pathname.includes("6974961")) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<div class="donation_campaign highholidays">
  <div class="wrapper">
  <div class='top'>
  <div class="wrapper clearfix">
<div class="col1">
<div class="banner">
<a class="donate_link js-header-donate js-banner-donate-link" href="/6974961">High Holiday Appeal</a></div>
</div>
<div class="col2 title_container desktop-only">
<div class="large"><a class="donate_link js-header-donate js-banner-donate-link" href="/6974961">
Please Partner with Chabad of Islip - All donations being matched!
</a></div>
<div style="height: 5px;"></div>
  <div class="label">Thank you to our latest donors:</div>
</div>
<div class="col4 button_container">
<div id="DonateButton_wrapper" class="co_global_button red js-header-donate"><a id="DonateButton" href="/6974961" class="js-banner-donate-link button js-header-donate no_outline"><span class="donate-button__text--wide">Donate Today</span></a></div>
</div>
</div>
  </div>
  <div class="bottom">  
  <div class="label">Thank you to our latest donors:</div>
  <div id="TICKER" class="ticker"></div></div></div></div>`,
    );

    fetch(
      "https://api.menstiler.com/?id=1DwHmQF6J60S126sWqG_-kpxpRcgO4201IjHgAqGeHdU",
    )
      .then((response) => response.json())
      .then((data) => {
        const tempDiv = document.createElement("div");

        data.values.forEach((donor, index) => {
          if (index !== 0) {
            const donorDiv = document.createElement("div");
            donorDiv.className = "item";
            donorDiv.innerHTML = `
          <div class="name">
              ${donor[0]} - <b>$${donor[1]}</b>${
                donor[2] ? " - " + donor[2] : ""
              }

          </div>
        `;
            tempDiv.appendChild(donorDiv);
          }
        });

        const html = tempDiv.innerHTML;
        const el = document.getElementById("TICKER");

        if (el) {
          var ticker = new ScrollingTicker(el, html, {
            HorizontalDirection: "ltr",
          });
          el.ticker = ticker;
        }
      });

    const header = document.querySelector(".menu_wrapper");
    const sideMenu = document.getElementById("PrimaryNavigationContainer");

    if (header) {
      const stickyPoint = header.offsetTop + 22;
      sideMenu.style.top = `2px`;
      window.addEventListener("scroll", () => {
        sideMenu.style.top = `-${scrollY}px `;
        if (window.scrollY >= stickyPoint) {
          header.classList.add("fixed");
          sideMenu.style.top = `-100px`;
        } else {
          header.classList.remove("fixed");
        }
      });
    }
  }
}

function setUpFundraisingTicker() {
  const observer = new MutationObserver(() => {
    const el = document.querySelector(".fs-ticker-heading-container");
    if (el) {
      observer.disconnect();
      document.querySelector(".fs-countdown-widget").style.display = "none";
      document.querySelector(".fs-ticker-countdown-heading").innerText =
        "Donations being doubled till December 31";

      const smallText = document.querySelector(".fs-ticker-heading-small");
      if (smallText)
        smallText.textContent =
          "Say Yes to Community, Say Yes to Connection, Say Yes to Continuity.";
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  const container = document.querySelector(
    ".col-md-5.fs-ticker-heading-container",
  );
  if (!container) {
    console.error("Container not found!");
    return;
  }

  // ----------- CONFIG -----------
  const images = [
    "/media/images/1346/Lnln13461866.jpg",
    "/media/images/1346/KkSI13461862.jpg",
    "/media/images/1346/sJSe13461810.jpg",
  ];

  // const mobileImages = [
  //   "/media/images/1346/sLXJ13462540.jpg",
  //   "/media/images/1346/OicD13462542.jpg",
  //   "/media/images/1346/irnv13462546.jpg"
  // ];

  // const isMobile = window.innerWidth < 768;
  // const images = isMobile ? mobileImages : desktopImages;

  const SLIDE_INTERVAL = 3000;
  const SLIDE_DURATION = 600; // best smooth speed
  // --------------------------------

  // Remove all old background styling
  container.style.background = "none";
  container.style.backgroundImage = "none";

  // Prepare container for slider
  container.style.position = "relative";
  container.style.overflow = "hidden";

  // Read original height so slides don’t resize
  const fixedHeight = container.offsetHeight;
  container.style.height = fixedHeight + "px";

  // Create two slide layers
  const slideA = document.createElement("div");
  const slideB = document.createElement("div");

  [slideA, slideB].forEach((slide) => {
    Object.assign(slide.style, {
      position: "absolute",
      top: 0,
      left: "0%",
      width: "100%",
      height: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transition: `transform ${SLIDE_DURATION}ms ease-in-out`,
    });
  });

  container.appendChild(slideA);
  container.appendChild(slideB);

  let index = 0;
  slideA.style.backgroundImage = `url(${images[index]})`;

  let active = slideA;
  let next = slideB;

  function slide() {
    index = (index + 1) % images.length;

    // Prepare next slide **off-screen to the right**
    next.style.backgroundImage = `url(${images[index]})`;
    next.style.transform = "translateX(100%)";

    // Force reflow to ensure animation triggers reliably
    void next.offsetWidth;

    // Animate both: active slides left, next enters
    active.style.transform = "translateX(-100%)";
    next.style.transform = "translateX(0%)";

    // Swap roles after animation completes
    const temp = active;
    active = next;
    next = temp;

    // Reset old slide's transform instantly for next round
    setTimeout(() => {
      next.style.transition = "none";
      next.style.transform = "translateX(100%)";
      void next.offsetWidth;
      next.style.transition = `transform ${SLIDE_DURATION}ms ease-in-out`;
    }, SLIDE_DURATION);
  }

  // Set initial position of B
  next.style.transform = "translateX(100%)";

  setInterval(slide, SLIDE_INTERVAL);
}

function init() {
  setUpScrolling();
  setUpSearch();
  // setUpFundraisingTicker();

  const firstFooter = document.querySelector("#footer");
  if (firstFooter) {
    firstFooter.remove();
  }

  const parentElement = document.getElementById("content");

  const syndicated = document.querySelector(".co_content_container.syndicated");

  if (syndicated) {
    document.body.classList.remove("home");
  }

  if (window.location.pathname === "/") {
    // text and actions
    parentElement.insertAdjacentHTML("beforeBegin", textWidgetHtml);

    // subscription
    const subscribeContainer = document.querySelector(".subscribe");
    subscribeContainer.classList.remove("v280", "feed", "custom");

    const subscribeContainerForm = document.querySelector(".subscribe form");
    subscribeContainerForm.classList.add("bottom_subscribe_box");
    jQuery('.subscribe form input[type="submit"]').removeClass("buttonStyle1");
    jQuery('.subscribe form input[type="submit"]').addClass("CoButton");
    parentElement.after(subscribeContainer);

    parentElement.insertAdjacentHTML("afterend", promosWidgetHtml);

    if (jQuery("body").hasClass("mobile") && !subscribeContainer) {
      jQuery("#footer").prepend(mobileSubscribeWidget);
    }

    // small promos
    jQuery(".sneak-peek-container").hide();

    // other widgets
    jQuery(".candlelighting").hide();
    jQuery(".jli_feed").hide();
    jQuery(".parsha").hide();
    jQuery(".upcoming_holiday").hide();
    jQuery(".upcoming_events").hide();
    jQuery(".chabad_updates").hide();

    jQuery(".widget-4").attr("class", function (i, className) {
      return className.replace(/\bwidget-4\b/g, "widget-1");
    });

    jQuery(".g640").attr("class", function (i, className) {
      return className.replace(/\bg640\b/g, "g960");
    });

    jQuery(".v260").attr("class", function (i, className) {
      return className.replace(/\bv260\b/g, "v380");
    });
  }
}

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
