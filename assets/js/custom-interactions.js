/* Scroll-reveal interactions for modular homepage blocks */
(function () {
  var elements = document.querySelectorAll("[data-reveal]");
  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, io) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var target = entry.target;
        var delay = parseInt(target.getAttribute("data-delay") || "0", 10);

        window.setTimeout(function () {
          target.classList.add("is-visible");
        }, delay);

        io.unobserve(target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px"
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();
