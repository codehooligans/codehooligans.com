// Email is stored ROT13-shifted and assembled at runtime so it never
// appears as plain text in the page source, cutting down on scraper bots.
function rot13(str) {
  return str.replace(/[a-zA-Z]/g, function (c) {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const encoded = "cnhy@pbqrubbyvtnaf.pbz";
  const email = rot13(encoded);
  const link = document.getElementById("email-link");
  if (link) {
    link.href = "mailto:" + email;
  }

  const yearEl = document.getElementById("copyright-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // <details> content is hidden internally (not just display:none), so CSS
  // alone can't force it open on desktop while defaulting closed on mobile —
  // the open attribute has to be set based on viewport width.
  const contactToggle = document.querySelector(".contact-toggle");
  if (contactToggle) {
    const desktopQuery = window.matchMedia("(min-width: 701px)");
    const syncContactToggle = (e) => {
      contactToggle.open = e.matches;
    };
    syncContactToggle(desktopQuery);
    desktopQuery.addEventListener("change", syncContactToggle);
  }
});
