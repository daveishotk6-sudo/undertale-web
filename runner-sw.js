// Load the game directly, no service worker
const loadGame = () => {
  const script = document.createElement("script");
  script.src = "runner.js";
  script.async = true;
  document.head.appendChild(script);
};

// Unregister any existing service workers then load the game
window.addEventListener("load", async () => {
  if ("serviceWorker" in navigator) {
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
      // Also clear all caches
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (e) {
      console.warn("SW cleanup failed", e);
    }
  }
  loadGame();
});
