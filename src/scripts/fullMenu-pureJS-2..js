const links = document.querySelectorAll("[href^='#']");
const V = 0.5;

const overlay = document.querySelector("#hamburgerOverlay");
const hamburgerMenu = document.querySelector("#hamburgerMenu");
const classes = ["open", "active"];
const elements = [hamburgerMenu, overlay];

const _toggleClass = (element, className) => {
  element.forEach((item, index) => item.classList.toggle(className[index]));
};

hamburgerMenu.addEventListener("click", e => {
  e.preventDefault();

  _toggleClass(elements, classes);
});

for (const iter of links) {
  iter.addEventListener("click", e => {
    e.preventDefault();

    const anchor = document.querySelector(iter.getAttribute("href"));
    const coordAnchor = anchor.getBoundingClientRect().top;
    const windowY = window.pageYOffset;

    let start = null;

    requestAnimationFrame(step);

    function step(time) {
      if (start === null) start = time;
      let progress = time - start;

      let coordY =
        coordAnchor < 0
          ? Math.max(windowY - progress / V, windowY + coordAnchor)
          : Math.min(windowY + progress / V, windowY + coordAnchor);

      window.scrollTo(0, coordY);

      if (coordY != windowY + coordAnchor) {
        requestAnimationFrame(step);
      } else {
        _toggleClass(elements, classes);
      }
    }
  });
}

// Реализация подсветки пунктов меню с актуальной секцией
let curentSectionId = null;

document.addEventListener("scroll", function() {
  const sections = document.querySelectorAll(".section");

  sections.forEach(section => {
    const topPos = section.getBoundingClientRect().top;

    if (topPos >= -25 && topPos <= 25) {
      curentSectionId = section.id;
    }
  });

  getActive(curentSectionId);
});

function getActive(curentSectionId) {
  links.forEach(link => {
    const href = link.getAttribute("href");

    link.classList.remove("active");

    if (href === `#${curentSectionId}`) {
      link.classList.add("active");
    }
  });
}
