const url =
  "https://api.menstiler.com/?id=1DwHmQF6J60S126sWqG_-kpxpRcgO4201IjHgAqGeHdU";

const PAGE_SCRIPTS = [
  {
    aid: "6974961",
    href: "https://assets.menstiler.com/highholidays/donate-form.js",
    type: "script",
  },
  {
    aid: "6974961",
    href: "https://assets.menstiler.com/highholidays/donate-form.css",
    type: "style",
  },
  {
    aid: "ArticleCcoResponse_cdo/aid/6974961",
    href: "https://assets.menstiler.com/highholidays/update-sheet.js",
    type: "script",
  },
];

function pageSpecificStyling(url) {
  const styles = document.createElement("link");
  styles.rel = "stylesheet";
  styles.type = "text/css";
  styles.media = "screen";
  styles.href = url;
  document.getElementsByTagName("head")[0].appendChild(styles);
}

function pageSpecificJs(url) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function injectAsset(rule) {
  if (rule.type === "script") {
    pageSpecificJs(rule.href);
  } else if (rule.type === "style") {
    pageSpecificStyling(rule.href);
  } else if (rule.type === "redirect") {
    window.location.href = rule.href;
  }
}

PAGE_SCRIPTS.forEach((rule) => {
  if (window.location.href.indexOf(rule.aid) !== -1) {
    injectAsset(rule);
  } else {
    localStorage.removeItem("submissionId");
  }
});
