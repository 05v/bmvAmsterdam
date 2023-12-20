class Dropdown {
  constructor(selector) {
    this.dropdownToggle = document.querySelector(
      `${selector} .header__dropdowntoggle`
    );
    this.dropdownMenu = document.querySelector(`${selector} .header__dropdown`);
    this.header = document.querySelector(".header");
    this.activatedByKeyboard = false;

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

  checkFocusWithin() {
    setTimeout(() => {
      if (
        !this.dropdownToggle.contains(document.activeElement) &&
        !this.dropdownMenu.contains(document.activeElement)
      ) {
        this.hideDropdown();
        this.activatedByKeyboard = false;
      }
    }, 1);
  }

  hideDropdown() {
    this.dropdownMenu.classList.remove("show");
    this.header.classList.remove("header__expanded");
  }

  initEvents() {
    this.dropdownToggle.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.activatedByKeyboard = true;
        this.toggle();
      }
    });

    this.dropdownToggle.parentElement.addEventListener("mouseenter", () => {
      if (!this.activatedByKeyboard) {
        this.toggle();
      }
    });

    this.dropdownToggle.parentElement.addEventListener("mouseleave", () => {
      if (!this.activatedByKeyboard) {
        this.toggle();
      }
    });

    this.dropdownToggle.addEventListener("blur", () => {
      this.checkFocusWithin();
    });

    const dropdownLinks = this.dropdownMenu.querySelectorAll("a");
    dropdownLinks.forEach((link) => {
      link.addEventListener("blur", () => {
        this.checkFocusWithin();
      });
    });
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
      document.body.style.overflow = "hidden";
    } else {
      this.icon.classList.remove("fa-xmark");
      this.icon.classList.add("fa-bars");
      this.dropdownMobile.minimize();
      document.body.style.overflow = "";
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
      document.body.style.overflow = "";
    }
  }

  initEvents() {
    this.hamburger.addEventListener("click", () => this.toggle());
    window.addEventListener("resize", () => this.close());
  }
}

class Carousel {
  constructor(selector, data) {
    this.carouselElement = document.querySelector(selector);
    this.carouselViewport = this.carouselElement.querySelector(
      ".carousel__viewport"
    );
    this.carouselData = data;
    this.currentIndex = 0;
    this.autoScrollInterval = null;
    this.autoScrollDelay = 4000;
    this.initCarousel();
    this.initEvents();
    this.startAutoScroll();
  }

  initCarousel() {
    this.updateCarousel();
  }

  updateCarousel() {
    const item = this.carouselData[this.currentIndex];
    const image = this.carouselElement.querySelector(".carousel__image");
    const title = this.carouselElement.querySelector(".carousel__title");
    const link = this.carouselElement.querySelector(".carousel__link");

    image.src = item.image;
    image.alt = item.title;
    title.textContent = item.title;
    link.href = `/projecten/${item.link}`;
  }

  nextItem() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselData.length;
    this.updateCarousel();
  }

  previousItem() {
    this.currentIndex =
      (this.currentIndex - 1 + this.carouselData.length) %
      this.carouselData.length;
    this.updateCarousel();
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(
      () => this.nextItem(),
      this.autoScrollDelay
    );
  }

  stopAutoScroll() {
    clearInterval(this.autoScrollInterval);
  }

  resetAutoScroll(delay) {
    this.stopAutoScroll();
    this.autoScrollDelay = delay;
    this.startAutoScroll();
  }

  initEvents() {
    const leftButton = this.carouselElement.querySelector(
      ".carousel__button--left"
    );
    const rightButton = this.carouselElement.querySelector(
      ".carousel__button--right"
    );

    leftButton.addEventListener("click", () => {
      this.previousItem();
      this.resetAutoScroll(6000);
      setTimeout(() => this.resetAutoScroll(4000), 6000);
    });

    rightButton.addEventListener("click", () => {
      this.nextItem();
      this.resetAutoScroll(6000);
      setTimeout(() => this.resetAutoScroll(4000), 6000);
    });
  }
}

const carouselData = [
  {
    title: "Nieuwbouw AICS",
    link: "nieuwbouw-aics",
    image:
      "files/images/AICS/Nieuwbouw Amsterdam International Community School Buitenveldert.jpg",
  },
  {
    title: "Renovatie bs de Wereldburger",
    link: "renovatie-wereldburger",
    image:
      "files/images/Basisschool de Wereldburger/Nieuwbouw Basisschool De Wereldburger.jpg",
  },
  {
    title: "Nieuwbouw Spinoza20first",
    link: "nieuwbouw-spinoza20first",
    image: "files/images/Spinoza20first/Nieuwbouw Spinoza20first.jpg",
  },
  {
    title: "Amsterdam Museum",
    link: "amsterdam-museum",
    image: "files/images/Amsterdam Museum/Foto 1.jpg",
  },
  {
    title: "Nieuwe Sporthallen Zuid",
    link: "nieuwe-sporthallen-zuid",
    image:
      "files/images/Nieuwe Sporthallen Zuid/Haalbaarheidstudie Nieuwe Sporthallen Zuid.png",
  },
  {
    title: "Sportpark Goed Genoeg & AFC",
    link: "sportpark-goedgenoeg-afc",
    image:
      "files/images/Sportpark Goed Genoeg AFC/Sportpark Goed Genoeg Clubgebouw AFC.jpg",
  },
  {
    title: "Verhalenhuis Nieuw-West Osdorpplein",
    link: "verhalenhuis-nieuwwest-osdorpplein",
    image:
      "files/images/Verhalenhuis Nieuw-West Osdorpplein/01_CIE_Osdorp_Bibliotheek_Hero_05_Copyright_AbsentMatter2022.jpg",
  },
];

class App {
  constructor() {
    this.dropdown = new Dropdown(".header__item--has-dropdown");
    this.dropdownMobile = new DropdownMobile(".header__dropdowntoggle-mobile");
    this.mobileMenu = new MobileMenu(".header__hamburger", this.dropdownMobile);
    this.carousel = new Carousel(".carousel", carouselData);
  }
}

const app = new App();
