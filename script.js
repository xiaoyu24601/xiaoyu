const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const year = document.querySelector("[data-year]");
const revealItems = document.querySelectorAll(".reveal");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.dataset.theme = "dark";
}

if (year) {
  year.textContent = new Date().getFullYear();
}

const closeMenu = () => {
  document.body.classList.remove("nav-open");
  navLinks.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "打开菜单");
};

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "关闭菜单" : "打开菜单");
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    closeMenu();
  }
});

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";

  if (nextTheme === "dark") {
    document.documentElement.dataset.theme = "dark";
  } else {
    delete document.documentElement.dataset.theme;
  }

  localStorage.setItem("theme", nextTheme);
});

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
