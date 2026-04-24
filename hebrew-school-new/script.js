const REGISTER_PAGE = 7329214;

function setUpScrolling() {
  const header = document.querySelector(".sticky-top");

  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      header.classList.add("scrolled-header");
    } else {
      header.classList.remove("scrolled-header");
    }
  });
}

function addClassWhenHovering() {
  document.querySelectorAll(".section-header").forEach((header) => {
    header.addEventListener("mouseenter", () => {
      document.querySelectorAll(".section.active").forEach((expanded) => {
        expanded.classList.remove("active");
      });
      const section = header.parentElement;
      section.classList.add("active");
    });
  });
}

function toggleContactForm() {
  const contactForm = document.querySelector("#contact form");
  const showContactBtn = document.getElementById("showContact");
  const hideContactBtn = document.getElementById("hideContact");
  const contactTextContent = document.getElementById("contactTextContent");
  const contactFormContainer = document.getElementById("contactFormContainer");

  function showForm() {
    contactTextContent.classList.add("slide-out");
    contactFormContainer.classList.add("slide-in");

    setTimeout(() => {
      const firstInput = document.querySelector('input[name="First Name"]');
      if (firstInput) firstInput.focus();
    }, 600);
  }

  function hideForm() {
    contactTextContent.classList.remove("slide-out");
    contactFormContainer.classList.remove("slide-in");

    // Reset form after animation (optional)
    setTimeout(() => {
      if (contactForm && contactForm.reset) {
        contactForm.reset();
      }
    }, 600);
  }

  if (showContactBtn) {
    showContactBtn.addEventListener("click", function (e) {
      e.preventDefault();
      showForm();
      if (window.innerWidth <= 768) {
        contactForm.style.transform = "translateX(0)";
      } else {
        contactForm.style.transform = "translate3d(0px, 0px, 0px)";
      }
      contactForm.style.opacity = "1";
    });
  }

  if (hideContactBtn) {
    hideContactBtn.addEventListener("click", function (e) {
      e.preventDefault();
      hideForm();
      document.getElementById("hideContact").addEventListener("click", () => {
        contactForm.style.transform = "translate3d(-120%, 0px, 0px);";
        contactForm.style.opacity = "0";
      });
    });
  }
}

function setUpMenu() {
  const burgerMenu = document.getElementById("burger-menu");
  const navMenu = document.getElementById("navigation");
  const headerLogo = document.querySelector(".sticky-top .logo");
  const socialsContainer = document.querySelector(".socials-container");
  const cloneLogo = headerLogo.cloneNode(true);
  const cloneSocials = socialsContainer.cloneNode(true);
  if (
    window.innerWidth <= 768 &&
    !window.location.pathname.includes(REGISTER_PAGE)
  ) {
    const headerBtn = document.querySelector(
      ".sticky-top .item.parent:last-child",
    );
    const cloneHeaderBtn = headerBtn.cloneNode(true);
    headerLogo.insertAdjacentElement("afterend", cloneHeaderBtn);
  }
  function toggleMobileMenu() {
    burgerMenu.classList.toggle("active");

    if (window.innerWidth <= 768) {
      if (burgerMenu.classList.contains("active")) {
        navMenu.classList.add("active");
        navMenu.appendChild(cloneLogo);
        navMenu.appendChild(cloneSocials);
        navMenu.style.visibility = "";
        navMenu.style.transform = "translateX(0)";
      } else {
        navMenu.classList.remove("active");
        headerLogo.classList.remove("active-menu");
        navMenu.style.visibility = "visible";
        navMenu.style.transform = "translateX(-249vw)";
      }
    } else {
      navMenu.style.transform = "";
    }
  }

  function closeMobileMenu() {
    burgerMenu.classList.remove("active");
    navMenu.classList.remove("active");
    if (window.innerWidth <= 768) {
      navMenu.style.visibility = "";
      navMenu.style.transform = "translateX(-249vw)";
    } else {
      navMenu.style.transform = "";
    }
  }

  burgerMenu.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      toggleMobileMenu();
    }
  });

  // const navLinks = document.querySelectorAll("#navigation a");
  // navLinks.forEach((link) => {
  //   link.addEventListener("click", closeMobileMenu);
  // });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}

function setUpListenerForSubmit() {
  const contactForm = document.querySelector('input[name="SubmitCCO"]');

  if (contactForm) {
    contactForm.addEventListener("click", (e) => {
      if (e.target.form.checkValidity()) {
        e.target.value = "Please Wait...";
      }
    });
  }
}

function setUpAccordion() {
  const items = document.querySelectorAll(".accordion .item");

  items.forEach((item) => {
    const header = item.querySelector(".header");

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      items.forEach((i) => i.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

function setUpReadMore() {
  if (window.innerWidth <= 768) {
    const btn = document.querySelector(
      ".statement-container .button-container",
    );
    const readMoreBtn = `<a>Read More</a>`;
    const readMoreTxt = document.querySelectorAll(
      ".statement-container .row:nth-child(n+2)",
    );

    if (btn) {
      btn.innerHTML = readMoreBtn;
      btn.addEventListener("click", () => {
        const isOpen = btn.classList.toggle("expanded");
        btn.innerHTML = isOpen ? "<a>Read less</a>" : readMoreBtn;

        readMoreTxt.forEach((container) => {
          container.classList.toggle("show");
        });
      });
    }
  }
}

function setUpFooter() {
  if (!window.location.pathname.includes(REGISTER_PAGE)) {
    const footerBtn = document.querySelector("footer .item.parent:last-child");
    const container = document.querySelector("footer .right-column .logo");
    container.after(footerBtn);
  }
}

function setUpSlidingBanner() {
  const slides = document.querySelectorAll(".banner img");
  let index = 0;

  if (!slides) return;
  if (slides.length >= 2) {
    setInterval(() => {
      slides[index].classList.remove("active");

      index = (index + 1) % slides.length;

      slides[index].classList.add("active");
    }, 6000);
  } else {
    slides[index].classList.add("active");
  }
}

function init() {
  setUpScrolling();
  setUpMenu();
  addClassWhenHovering();
  // toggleContactForm();
  setUpListenerForSubmit();
  setUpAccordion();
  setUpReadMore();
  setUpFooter();
  setUpSlidingBanner();
}

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("load", init);
}
