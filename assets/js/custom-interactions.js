/* Scroll-reveal and homepage contact popup interactions */
(function () {
  var elements = document.querySelectorAll("[data-reveal]");
  if (elements.length) {
    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
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
    }
  }

  var openBtn = document.querySelector("[data-contact-open]");
  var modal = document.querySelector("[data-contact-modal]");
  var closeBtn = document.querySelector("[data-contact-close]");

  if (!openBtn || !modal || !closeBtn) return;

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    openBtn.setAttribute("aria-expanded", "true");
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    openBtn.setAttribute("aria-expanded", "false");
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
})();
