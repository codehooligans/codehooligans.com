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
});
