const loadGame = () => {
  const script = document.createElement("script");
  script.src = "runner.js";
  script.async = true;
  document.head.appendChild(script);
};

const loadSW = async () => {
  try {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("sw.js");
      await navigator.serviceWorker.ready;
    }
  } catch (e) {
    console.warn("Service worker failed, loading game anyway", e);
  }
  loadGame();
};

window.addEventListener("load", loadSW);
