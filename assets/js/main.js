(() => {
  "use strict";

  const header = document.getElementById("site-header");
  const menuButton = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const currentYear = document.getElementById("copyright-year");

  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  const onScroll = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function closeMenu() {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    mobileNav.hidden = true;
  }

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const nextState = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(nextState));
      menuButton.setAttribute("aria-label", nextState ? "Close navigation" : "Open navigation");
      mobileNav.hidden = !nextState;
    });
    mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && !mobileNav.hidden) {
        closeMenu();
        menuButton.focus();
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) closeMenu();
    });
  }

  const serviceSelect = document.getElementById("service");
  if (serviceSelect) {
    const requestedService = new URLSearchParams(window.location.search).get("service");
    if (requestedService && Array.from(serviceSelect.options).some(o => o.value === requestedService)) {
      serviceSelect.value = requestedService;
    }
  }

  const config = window.BIZFLIGHT_CONTACT || {};
  const verifiedEmail = String(config.verifiedEmail || "").trim();
  if (verifiedEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(verifiedEmail)) {
    const contactInfo = document.querySelector(".contact-info small");
    if (contactInfo) {
      const emailLink = document.createElement("a");
      emailLink.href = "mailto:" + verifiedEmail;
      emailLink.textContent = verifiedEmail;
      emailLink.style.color = "#235dea";
      contactInfo.replaceWith(emailLink);
    }
  }

  const form = document.getElementById("contact-form");
  if (!form) return;

  const submitButton = document.getElementById("contact-submit");
  const status = document.getElementById("form-status");
  const googleAction = String(config.googleFormAction || "");
  const fields = config.googleFormFields || {};
  const fieldNames = ["full_name", "email", "company", "service", "engagement", "message"];

  if (config.provider === "google-forms" &&
      /^https:\/\/docs\.google\.com\/forms\/d\/e\/[^/]+\/formResponse(?:\?.*)?$/.test(googleAction) &&
      fieldNames.every(name => /^entry\.\d+$/.test(String(fields[name] || "")))) {
    form.action = googleAction;
    form.method = "POST";
    form.removeAttribute("novalidate");
    fieldNames.forEach(name => {
      const input = form.querySelector(`[name="${name}"]`);
      if (input) input.name = fields[name];
    });
    submitButton.disabled = false;
    status.dataset.state = "ready";
    status.textContent = "The enquiry form is connected. On submission, Google Forms will process your details.";
  } else if (config.provider === "typeform" &&
      /^https:\/\/([a-z0-9-]+\.)*typeform\.com\/to\/[a-zA-Z0-9]+\/?$/.test(String(config.typeformUrl || ""))) {
    document.getElementById("form-placeholder").hidden = true;
    document.getElementById("typeform-link").hidden = false;
    const link = document.getElementById("external-form-link");
    link.href = config.typeformUrl;
  }
})();
