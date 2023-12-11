document.addEventListener("DOMContentLoaded", function () {
  var dropdown = document.querySelector(".header__item--has-dropdown");
  var header = document.querySelector(".header");

  dropdown.addEventListener("mouseenter", function () {
    header.classList.add("header__expanded");
  });

  dropdown.addEventListener("mouseleave", function () {
    header.classList.remove("header__expanded");
  });
});
