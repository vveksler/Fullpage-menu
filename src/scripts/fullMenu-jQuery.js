// Full menu in jQuery

const overlay = $("#hamburgerOverlay");
const menu = $("#hamburgerMenu");
const body = $("body");
const link = $(".nav-main__link");
const classes = ["open", "active", "hidden"];
const elements = [menu, overlay, body];

const _toggleClass = (element, classes) =>
  element.forEach((item, index) => $(item).toggleClass(classes[index]));

$(menu).on("click", e => {
  e.preventDefault();

  _toggleClass(elements, classes);
});

$(link).on("click", function(e) {
  e.preventDefault();
  const scroll_el = $(this).attr("href"); 

  if (scroll_el !== "#") {
    $("html").animate({ scrollTop: $(scroll_el).offset().top }, 600, () => {
      _toggleClass(elements, classes);
    });
  }
});
