// Just load the game. No service worker.
window.addEventListener("load", () => {
  const s = document.createElement("script");
  s.src = "runner.js";
  s.async = true;
  document.head.appendChild(s);
});
