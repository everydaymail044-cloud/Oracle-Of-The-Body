const hero = document.querySelector(".hero");
const artifacts = [...document.querySelectorAll(".artifact")];
const panel = document.querySelector(".reading-panel");
const form = document.querySelector("form");

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
  panel.querySelector("h2").textContent = artifact.dataset.title || "Selected Sign";
  panel.querySelector("p:last-child").textContent =
    artifact.dataset.copy || "The body has already begun to answer.";
}

hero?.addEventListener("mousemove", (event) => {
  const bounds = hero.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width) * 100;
  const y = ((event.clientY - bounds.top) / bounds.height) * 100;

  hero.style.setProperty("--cursor-x", `${x}%`);
  hero.style.setProperty("--cursor-y", `${y}%`);

  artifacts.forEach((artifact, index) => {
    const depth = (index + 1) * 0.7;
    artifact.style.setProperty("--tx", `${(x - 50) / depth}px`);
    artifact.style.setProperty("--ty", `${(y - 50) / (depth * 1.4)}px`);
  });
});

artifacts.forEach((artifact) => {
  artifact.addEventListener("mouseenter", () => selectArtifact(artifact));
  artifact.addEventListener("focus", () => selectArtifact(artifact));
  artifact.addEventListener("click", () => selectArtifact(artifact));
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = form.querySelector("button");
  const input = form.querySelector("input");

  if (!button || !input) return;

  button.textContent = input.value ? "Thank You" : "Enter Email";
  setTimeout(() => {
    button.textContent = "Sign Up";
  }, 1800);
});
