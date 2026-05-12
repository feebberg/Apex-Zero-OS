// --- WALLPAPER PICKER ---

function openWallpaperPicker() {
  const content = `
    <h2 style="margin-top:0;">Wallpaper Picker</h2>
    <p>Paste an image URL to set as your wallpaper.</p>

    <input id="wpInput" placeholder="https://example.com/image.jpg"
      style="
        width:100%;
        padding:8px;
        border-radius:8px;
        border:1px solid var(--border-soft);
        background:rgba(255,255,255,0.08);
        color:white;
        margin-bottom:10px;
      "
    >

    <button id="wpApply" style="
      padding:8px 14px;
      border-radius:8px;
      border:1px solid var(--border-soft);
      background:rgba(0,0,0,0.6);
      color:white;
      cursor:pointer;
    ">Apply</button>
  `;

  const win = createWindow("wallpaper", "Wallpaper Picker", content, {
    width: "420px",
    height: "220px",
    left: "320px",
    top: "160px"
  });

  const input = win.querySelector("#wpInput");
  const btn = win.querySelector("#wpApply");

  btn.onclick = () => {
    const url = input.value.trim();
    if (!url) return;
    applyWallpaper(url);
  };
}

function applyWallpaper(url) {
  const desktop = document.getElementById("desktop");
  if (!desktop) return;

  desktop.style.background = `url('${url}') center/cover fixed`;
  saveSetting("wallpaper", url);
  pushNotification("Wallpaper updated");
}

// Load saved wallpaper on startup
window.addEventListener("load", () => {
  const saved = getSetting("wallpaper");
  if (saved) {
    const desktop = document.getElementById("desktop");
    if (desktop) {
      desktop.style.background = `url('${saved}') center/cover fixed`;
    }
  }
});
