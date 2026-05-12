// --- SPOTLIGHT SEARCH ---

function openSpotlight() {
  if (document.getElementById("azSpotlight")) return;

  const box = document.createElement("div");
  box.id = "azSpotlight";
  box.style.position = "fixed";
  box.style.top = "20%";
  box.style.left = "50%";
  box.style.transform = "translateX(-50%)";
  box.style.width = "420px";
  box.style.padding = "20px";
  box.style.background = "rgba(0,0,0,0.6)";
  box.style.border = "1px solid var(--border-soft)";
  box.style.borderRadius = "12px";
  box.style.backdropFilter = "blur(12px)";
  box.style.boxShadow = "0 0 20px #ff2bff55";
  box.style.zIndex = 99999;

  box.innerHTML = `
    <input id="spotInput" placeholder="Search apps..."
      style="
        width:100%;
        padding:10px;
        border-radius:8px;
        border:1px solid var(--border-soft);
        background:rgba(255,255,255,0.1);
        color:white;
        outline:none;
      "
    >
  `;

  document.body.appendChild(box);

  const input = document.getElementById("spotInput");
  input.focus();

  input.addEventListener("keydown", e => {
    if (e.key === "Escape") box.remove();
  });
}

// load hotkey from settings (default: Ctrl+Space)
let spotlightHotkey = getSetting("spotlightHotkey", "Ctrl+Space");

// global hotkey
document.addEventListener("keydown", e => {
  if (spotlightHotkey === "Ctrl+Space" && e.ctrlKey && e.code === "Space") {
    openSpotlight();
    e.preventDefault();
  }
});
