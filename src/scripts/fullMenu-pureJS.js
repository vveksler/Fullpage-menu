// pure JavaScript
const body = document.querySelector("body");
const overlay = document.querySelector("#hamburgerOverlay");
const menu = document.querySelector("#hamburgerMenu");
const classes = ["open", "active", "hidden"];
const elements = [menu, overlay, body];

const _toggleClass = (element, className) => {
  element.forEach((item, index) => $(item).toggleClass(className[index]));
};

menu.addEventListener("click", e => {
  e.preventDefault();

  _toggleClass(elements, classes);
});

overlay.addEventListener("click", function(e) {
  const target = e.target;

  if (target.classList.contains("nav-main__link")) {
    const scroll_el = target.getAttribute("href");
    const html = document.querySelector("html");

    var section;
    if (scroll_el !== "#")
      section = document.querySelector(scroll_el).offsetTop;

    scrollTo(html, section, 600);
  }
});

function scrollTo(element, to, duration) {
  console.log(to);
  
  var start = element.scrollTop,
    change = to - start,
    currentTime = 0,
    increment = 20;

  (function animateScroll() {
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime, start, change, duration);

    element.scrollTop = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    } else {
      _toggleClass(elements, classes);
    }
  })();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};
