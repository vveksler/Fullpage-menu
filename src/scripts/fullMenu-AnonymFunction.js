// анонимная самовызывающаяся функция

const obj = {
  overlay: "#hamburgerOverlay",
  menu: "#hamburgerMenu"
};

const fullMenu = (function({
  overlay: o = "#hamburgerOverlay",
  menu: m = "#hamburgerMenu"
}) {
  const body = document.querySelector("body");
  const overlay = document.querySelector(o);
  const menu = document.querySelector(m);
  const classes = ["open", "active", "hidden"];
  const elements = [menu, overlay, body];
  const duration = 1000;

  const _toggleClass = (element, className) => {
    element.forEach((item, index) => $(item).toggleClass(className[index]));
  };

  const handleListeners = function() {
    menu.addEventListener("click", e => {
      e.preventDefault();

      _toggleClass(elements, classes);
    });

    overlay.addEventListener("click", function(e) {
      const target = e.target;

      if (target.classList.contains("nav-main__link")) {
        const scroll_el = target.getAttribute("href");

        $("html").animate({ scrollTop: $(scroll_el).offset().top }, duration, () => {
          _toggleClass(elements, classes);
        });
      }
    });
  };

  return {
    toggle: handleListeners
  };
})(obj);

export default fullMenu;