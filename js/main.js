document.addEventListener("DOMContentLoaded", function () {
  var dropdownToggle = document.querySelector(
    ".header__item--has-dropdown .header__dropdowntoggle"
  );
  var dropdownMenu = document.querySelector(
    ".header__item--has-dropdown .header__dropdown"
  );
  var header = document.querySelector(".header");

  function toggleDropdown() {
    if (dropdownMenu.classList.contains("show")) {
      dropdownMenu.classList.remove("show");
      header.classList.remove("header__expanded");
    } else {
      dropdownMenu.classList.add("show");
      header.classList.add("header__expanded");
    }
  }

  dropdownToggle.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      toggleDropdown();
    }
  });

  var dropdown = document.querySelector(".header__item--has-dropdown");

  dropdown.addEventListener("mouseenter", function () {
    dropdownMenu.classList.add("show");
    header.classList.add("header__expanded");
  });

  dropdown.addEventListener("mouseleave", function () {
    dropdownMenu.classList.remove("show");
    header.classList.remove("header__expanded");
  });
});
