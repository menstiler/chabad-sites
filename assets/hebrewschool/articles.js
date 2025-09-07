const articleImages = {
  4462264: "https://w2.chabad.org/media/images/1096/DqYs10964991.jpg",
  3736954: "https://w2.chabad.org/media/images/1096/YhDU10965037.jpg",
};

function setArticleBackground() {
  const currentUrl = window.location.href;

  for (const key in articleImages) {
    if (currentUrl.includes(key)) {
      const element = document.querySelector(".master-content-wrapper");
      if (element) {
        element.style.backgroundImage = `url(${articleImages[key]})`;
        element.style.backgroundSize = "cover";
        element.style.backgroundPosition = "center";
      }
      break;
    }
  }
}

setArticleBackground();
