document.addEventListener("DOMContentLoaded", () => {
  const navLinks = Array.from(document.querySelectorAll(".site-nav__link"));
  const targetLinks = new Map(
    navLinks.map((link) => [link.getAttribute("href")?.slice(1), link]),
  );
  const sections = Array.from(
    document.querySelectorAll(
      "#home, #opleidingen, #nieuws, #campussen, #contact",
    ),
  );

  if (!sections.length || !navLinks.length) {
    return;
  }

  const setActiveLink = (targetId) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${targetId}`;
      link.classList.toggle("site-nav__link--active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (left, right) => right.intersectionRatio - left.intersectionRatio,
        )[0];

      if (!visibleEntry) {
        return;
      }

      const targetId = visibleEntry.target.id;
      if (targetLinks.has(targetId)) {
        setActiveLink(targetId);
      }
    },
    {
      root: null,
      threshold: [0.2, 0.4, 0.6],
      rootMargin: "-20% 0px -65% 0px",
    },
  );

  sections.forEach((section) => observer.observe(section));
  setActiveLink("home");
});
