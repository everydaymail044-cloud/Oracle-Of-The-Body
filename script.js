const root = document.documentElement;
const aura = document.querySelector(".cursor-aura");
const hero = document.querySelector(".hero");
const cabinet = document.querySelector(".cabinet");
const artifacts = [...document.querySelectorAll(".artifact")];
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

    artifacts.forEach((artifact, index) => {
      const depth = (index + 1) * 0.75;
      artifact.style.setProperty("--tx", `${(cabinetX - 50) / depth}px`);
      artifact.style.setProperty("--ty", `${(cabinetY - 50) / (depth * 1.5)}px`);
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

artifacts.forEach((artifact) => {
  const label = document.createElement("span");
  label.className = "artifact-label";
  label.textContent = artifact.dataset.title || "Oracle";
  artifact.append(label);
});

function selectArtifact(artifact) {
  artifacts.forEach((item) => item.classList.toggle("is-active", item === artifact));

  if (!panel) return;

  panel.classList.add("is-visible");
  panel.setAttribute("aria-hidden", "false");
  panel.querySelector("h3").textContent = artifact.dataset.title || "Selected Sign";
  panel.querySelector("p:last-child").textContent =
    artifact.dataset.copy || "The body has already begun to answer.";
}

artifacts.forEach((artifact) => {
  artifact.addEventListener("mouseenter", () => selectArtifact(artifact));
  artifact.addEventListener("focus", () => selectArtifact(artifact));
  artifact.addEventListener("click", () => selectArtifact(artifact));
});

window.addEventListener("mousemove", setPointerPosition);
window.addEventListener("scroll", setScrollMotion, { passive: true });
setScrollMotion();
