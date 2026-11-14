/* glow.js: cursor-follow spotlight on cards (desktop only) */
(function () {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  document.addEventListener("pointermove", function (e) {
    var card = e.target.closest && e.target.closest(".product-card, .feature");
    if (!card) return;
    var r = card.getBoundingClientRect();
    card.style.setProperty("--mx", (e.clientX - r.left) + "px");
    card.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });
})();
