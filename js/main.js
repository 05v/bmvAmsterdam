class Dropdown {
  constructor(selector) {
    this.dropdownToggle = document.querySelector(
      `${selector} .header__dropdowntoggle`
    );
    this.dropdownMenu = document.querySelector(`${selector} .header__dropdown`);
    this.header = document.querySelector(".header");

    if (this.dropdownToggle) {
      this.initEvents();
    }
  }

  toggle() {
    if (this.dropdownMenu.classList.contains("show")) {
      this.dropdownMenu.classList.remove("show");
      this.header.classList.remove("header__expanded");
    } else {
      this.dropdownMenu.classList.add("show");
      this.header.classList.add("header__expanded");
    }
  }

  initEvents() {
    this.dropdownToggle.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.toggle();
      }
    });

    this.dropdownToggle.parentElement.addEventListener("mouseenter", () =>
      this.toggle()
    );
    this.dropdownToggle.parentElement.addEventListener("mouseleave", () =>
      this.toggle()
    );
  }
}

class DropdownMobile {
  constructor(selector) {
    this.dropdownToggleMobile = document.querySelector(selector);
    this.dropdownMenuMobile = document.querySelector(
      ".header__dropdown-mobile"
    );

    if (this.dropdownToggleMobile) {
      this.initEvents();
    }
  }

  toggle() {
    if (this.dropdownMenuMobile.style.display === "flex") {
      this.dropdownMenuMobile.style.display = "";
      this.dropdownMenuMobile.style.position = "";
    } else {
      this.dropdownMenuMobile.style.display = "flex";
      this.dropdownMenuMobile.style.position = "static";
    }
  }

  minimize() {
    this.dropdownMenuMobile.style.display = "";
    this.dropdownMenuMobile.style.position = "";
  }

  initEvents() {
    this.dropdownToggleMobile.addEventListener("click", () => this.toggle());
  }
}

class MobileMenu {
  constructor(selector, dropdownMobile) {
    this.hamburger = document.querySelector(selector);
    this.mobileMenu = document.querySelector(".header__mobile-menu");
    this.icon = this.hamburger ? this.hamburger.querySelector("i") : null;
    this.dropdownMobile = dropdownMobile;

    if (this.hamburger) {
      this.initEvents();
    }
  }

  toggle() {
    this.mobileMenu.classList.toggle("active");
    if (this.mobileMenu.classList.contains("active")) {
      this.icon.classList.remove("fa-bars");
      this.icon.classList.add("fa-xmark");
    } else {
      this.icon.classList.remove("fa-xmark");
      this.icon.classList.add("fa-bars");
      this.dropdownMobile.minimize();
    }
  }

  close() {
    if (
      window.innerWidth > 800 &&
      this.mobileMenu.classList.contains("active")
    ) {
      this.mobileMenu.classList.remove("active");
      this.icon.classList.remove("fa-xmark");
      this.icon.classList.add("fa-bars");
      this.dropdownMobile.minimize();
    }
  }

  initEvents() {
    this.hamburger.addEventListener("click", () => this.toggle());
    window.addEventListener("resize", () => this.close());
  }
}

class App {
  constructor() {
    this.dropdown = new Dropdown(".header__item--has-dropdown");
    this.dropdownMobile = new DropdownMobile(".header__dropdowntoggle-mobile");
    this.mobileMenu = new MobileMenu(".header__hamburger", this.dropdownMobile);
  }
}

const app = new App();
