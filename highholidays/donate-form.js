function getFromSheet(freshResponse = false) {
  try {
    fetch(url + (freshResponse ? `&invalidate=true` : ""))
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        const bar = document.querySelector(SELECTORS.progressBar);
        const label = document.querySelector(SELECTORS.label);
        const percentEl = document.querySelector(SELECTORS.percent);
        const donors = data.values.reverse();
        const tickerTrack = document.querySelector(SELECTORS.tickerTrack);
        tickerTrack.style.display = "none";
        tickerTrack.innerHTML = "";

        if (donors.length > 0 && donors[0][0].length > 0) {
          const $latestDonors = jQuery(SELECTORS.tickerContainer);
          const newEl = document.createElement("h4");
          newEl.textContent = SELECTORS.tickerHeaderText;
          newEl.className = "donors-title";
          $latestDonors[0].parentNode.insertBefore(newEl, $latestDonors[0]);
        }

        donors.forEach(([name, amount, dedication, current, goal], index) => {
          if (index !== donors.length - 1) {
            if (name.length > 0 || amount.length > 0) {
              const li = document.createElement("li");
              li.className = "donor-item";
              li.innerHTML = `<div class="name">${name}</div><div class="amount"> $${parseInt(
                amount,
                10
              ).toLocaleString()}</div>${
                dedication ? `<div class="dedication">${dedication}</div>` : ""
              }`;
              tickerTrack.appendChild(li);
            }

            if (current && goal) {
              const amountNumber = parseInt(current, 10) * 2;
              const goalNumber = parseInt(goal, 10);
              const percent = (amountNumber / goalNumber) * 100;

              if (bar && percent !== 0) {
                bar.style.width = `min(calc(${percent}% + 45px), 100%)`;
                bar.setAttribute("aria-valuenow", percent);
              }

              if (label) {
                label.textContent = `$${amountNumber.toLocaleString()} OF $${goalNumber.toLocaleString()} RAISED`;
              }

              if (percentEl && percent !== 0) {
                const percentDisplay =
                  percent >= 1 ? percent.toFixed(0) : percent.toFixed(2);
                percentEl.textContent = `${percentDisplay}%`;
              }
            }
          }
        });

        function loadScript(src, callback) {
          const script = document.createElement("script");
          script.src = src;
          script.onload = callback;
          script.onerror = () => console.error(`Failed to load script: ${src}`);
          document.head.appendChild(script);
        }

        loadScript(
          "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
          () => {
            $j = jQuery.noConflict();
            loadScript(
              "https://cdn.jsdelivr.net/gh/mazedigital/Web-Ticker@master/jquery.webticker.min.js",
              () => {
                tickerTrack.style.display = "block";
                $j(function () {
                  $j(SELECTORS.tickerTrack).webTicker({
                    speed: 50,
                    direction: "left",
                    startEmpty: true,
                    duplicate: true,
                    hoverpause: false,
                  });
                });
              }
            );
          }
        );
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  } catch (err) {
    console.error("Error:", err);
  }
}

function pageSetup() {
  jQuery(SELECTORS.appealContainer).remove();
  const divEl = document.createElement("div");
  divEl.id = "amount-display";
  divEl.innerHTML = `<div class="center">${Co.Settings.MosadName} receives</div><div class="amount">$0</div><div class="matched-text">${SELECTORS.amountDisplaySubtext}</div>`;

  const amountContainer = document.getElementById(SELECTORS.amountContainer);
  if (!amountContainer) return;
  amountContainer.appendChild(divEl);

  $amountOptions = document.querySelectorAll(SELECTORS.amountOptions);
  $amountInput = document.getElementById(SELECTORS.amountInput);
  $anonymousInput = document.querySelector(SELECTORS.anonymousInput);
  $nameInput = document.querySelector(SELECTORS.nameInput);
  $displayNameInput = document.querySelector(SELECTORS.displayNameInput);
  $displayAmount = document.querySelector(SELECTORS.displayAmount);
  $amountInput.setAttribute("min", "0");

  $amountOptions.forEach((el) =>
    el.addEventListener("change", function (e) {
      if (e.target.value === "Other") {
        $amountInput.setValue("");
        $displayAmount.textContent = "$0";
        $amountInput.focus();
      } else {
        const total = parseFloat(e.target.value.replace("$", ""));
        $amountInput.setValue(total);
        $displayAmount.textContent = (
          total * SELECTORS.multiplier
        ).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      }
      $amountInput.dispatchEvent(new Event("change", { bubbles: true }));
    })
  );

  $amountInput.addEventListener("input", function (e) {
    const total = parseFloat(e.target.value);
    let amountToDisplay = parseFloat(
      e.target.value * SELECTORS.multiplier
    ).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    if (isNaN(total)) {
      amountToDisplay = "$0";
    }
    $displayAmount.textContent = amountToDisplay;
  });

  $nameInput.addEventListener("change", function (e) {
    if (!$anonymousInput.checked) {
      $displayNameInput.setValue(e.target.value);
    }
  });

  $anonymousInput.addEventListener("change", function (e) {
    if (e.target.checked) {
      $displayNameInput.setValue("Anonymous");
      $displayNameInput.disable();
    } else {
      $displayNameInput.setValue($nameInput.value);
      $displayNameInput.enable();
    }
  });

  document
    .querySelector(SELECTORS.submitButton)
    .addEventListener("click", function (e) {
      if ($amountInput.value <= 0) {
        e.preventDefault();
        e.stopPropagation();
        const divEl = document.createElement("div");
        divEl.classList.add("form-error-message");
        divEl.innerHTML = `<i class="fa fa-fw fa-exclamation-circle"></i>&nbsp; ${SELECTORS.amountErrorMessage}<div class="form-error-arrow"><div class="form-error-arrow-inner"></div></div>`;
        $amountInput.after(divEl);
        $amountInput.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    });

  $amountOptions.forEach((el) =>
    el.addEventListener("change", function (e) {
      if (window.innerWidth <= 768) {
        $amountInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    })
  );

  const target = document.querySelector(SELECTORS.formContainer);
  const banner = document.querySelector(SELECTORS.donateButtonContainer);

  if (target && banner) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            banner.classList.add("hidden");
          } else {
            if (entry.boundingClientRect.top > 0) {
              banner.classList.remove("hidden");
            }
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(target);
  }
}

function headerSetup() {
  let articleHeader = jQuery(SELECTORS.headerContainer);

  if (articleHeader.length === 0) {
    jQuery(SELECTORS.bodyContainer).before(
      '<div class="master-content-wrapper"></div>'
    );

    // Re-select the newly created element
    articleHeader = jQuery(SELECTORS.headerContainer);
  }
  jQuery(SELECTORS.headerTitle).remove();

  articleHeader.before(`
  <div class="banner">
    <picture>
    <source srcset=${SELECTORS.mobileBanner} media="(max-width: 650px)">
    <img src=${SELECTORS.banner} alt="Hero Banner" class="banner-img">
  </picture>
  </div>
   <div class="campaign-progress">
    <h4>
      $0 OF $0 RAISED
    </h4>
    <div class="progress-bar-container">
      <div class="progress-bar"><span class="percent"></span></div>
    </div> 
  </div>
  <div class="campaign-article">
    ${SELECTORS.campaignTextHtml}
  </div>
  `);
  articleHeader.append(`             
              <div class="matchers-container">
              <h3>${SELECTORS.matchersTitle}</h3>            
                <div class="matchers-wrapper">
                ${SELECTORS.matchers
                  .map((matcher) => {
                    return `<div class="matcher">
                    <img src=${matcher.image} />
                  </div>`;
                  })
                  .join("")}                                     
                </div>
              </div>              
            <div class="ticker-container">
              <ul class="ticker-track">
              </ul>
            </div>
            `);
  if (!window.location.pathname.includes("ArticleCcoResponse_cdo")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="mobile-button-container"> <a href=${SELECTORS.formId}>${SELECTORS.donateButtonText}</a></div>`
    );
  } else {
    document
      .querySelector(SELECTORS.receiptContainer)
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function init() {
  headerSetup();
  pageSetup();
  if (!window.location.pathname.includes("ArticleCcoResponse_cdo")) {
    getFromSheet();
    window.getFromSheet = getFromSheet;
  }
}

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
