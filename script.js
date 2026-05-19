const root = document.documentElement;
const aura = document.querySelector(".cursor-aura");
const hero = document.querySelector(".hero");
const cabinet = document.querySelector(".cabinet");
const anatomyPoints = [...document.querySelectorAll(".anatomy-point")];
const panel = document.querySelector(".reading-panel");

function setPointerPosition(event) {
  const x = event.clientX;
  const y = event.clientY;

  aura?.style.setProperty("transform", `translate3d(${x - 64}px, ${y - 64}px, 0)`);

  if (hero) {
    const heroBounds = hero.getBoundingClientRect();
    const heroX = ((x - heroBounds.left) / heroBounds.width) * 100;
    const heroY = ((y - heroBounds.top) / heroBounds.height) * 100;
    hero.style.setProperty("--cursor-x", `${heroX}%`);
    hero.style.setProperty("--cursor-y", `${heroY}%`);
  }

  if (cabinet) {
    const cabinetBounds = cabinet.getBoundingClientRect();
    const cabinetX = ((x - cabinetBounds.left) / cabinetBounds.width) * 100;
    const cabinetY = ((y - cabinetBounds.top) / cabinetBounds.height) * 100;
    cabinet.style.setProperty("--cabinet-x", `${cabinetX}%`);
    cabinet.style.setProperty("--cabinet-y", `${cabinetY}%`);

    anatomyPoints.forEach((point, index) => {
      const depth = (index + 1) * 0.75;
      point.style.setProperty("--tx", `${(cabinetX - 50) / depth}px`);
      point.style.setProperty("--ty", `${(cabinetY - 50) / (depth * 1.5)}px`);
    });
  }
}

function setScrollMotion() {
  const scrollY = window.scrollY;
  const progress = Math.min(scrollY / Math.max(window.innerHeight * 0.85, 1), 1);

  root.style.setProperty("--scroll-y", scrollY.toFixed(2));
  root.style.setProperty("--portal-scale", (1 + progress * 0.18).toFixed(3));
  root.style.setProperty("--hero-opacity", Math.max(1 - progress * 1.4, 0).toFixed(3));
}

anatomyPoints.forEach((point) => {
  const label = document.createElement("span");
  label.className = "anatomy-label";
  label.textContent = point.dataset.title || "Oracle";
  point.append(label);
});

function selectPoint(point) {
  anatomyPoints.forEach((item) => item.classList.toggle("is-active", item === point));

  if (!panel) return;

  panel.classList.add("is-visible");
  panel.setAttribute("aria-hidden", "false");
  panel.querySelector("h3").textContent = point.dataset.title || "Selected Sign";
  panel.querySelector("p:last-child").textContent =
    point.dataset.copy || "The body has already begun to answer.";
}

anatomyPoints.forEach((point) => {
  point.addEventListener("mouseenter", () => selectPoint(point));
  point.addEventListener("focus", () => selectPoint(point));
  point.addEventListener("click", () => selectPoint(point));
});

window.addEventListener("mousemove", setPointerPosition);
window.addEventListener("scroll", setScrollMotion, { passive: true });
setScrollMotion();
