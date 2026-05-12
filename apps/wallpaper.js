// --- WALLPAPER PICKER ---
let azWallpapers = [
  {
    name: "Neon City",
    url: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade"
  },
  {
    name: "Cyber Grid",
    url: "https://images.unsplash.com/photo-1526401485004-2fda9f6d6c36"
  },
  {
    name: "Purple Fog",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  {
    name: "Digital Sunset",
    url: "https://images.unsplash.com/photo-1500534623283-312aade485b7"
  }
];

function openWallpaperPicker() {
  const content = `
    <h2 style="margin-top:0;">Wallpaper Picker</h2>
    <p>Select a wallpaper to apply instantly.</p>

    <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:12px;">
      ${azWallpapers.map(w => `
        <div class="wpItem" data-url="${w.url}"
          style="
            height:90px;
            background:url('${w.url}') center/cover;
            border-radius:8px;
            border:1px solid var(--border-soft);
            cursor:pointer;
            box-shadow:0 0 10px #ff2bff55;
          "
        ></div>
      `).join("")}
    </div>

    <h3 style="margin-top:20px;">Custom Wallpaper</h3>
    <input id="wpCustom" placeholder="Paste image URL..."
      style="
        width:100%;
        padding:8px;
        background:rgba(255,255,255,0.08);
        border:1px solid var(--border-soft);
        border-radius:6px;
        color:white;
        outline:none;
      "
    >
    <button id="wpApplyCustom"
      style="
        margin-top:10px;
        padding:8px 12px;
        background:rgba(255,255,255,0.1);
        border:1px solid var(--border-soft);
        border-radius:6px;
        color:white;
        cursor:pointer;
      "
    >Apply</button>
  `;

  const win = createWindow("wallpaper", "Wallpaper Picker", content, {
    width: "480px",
    height: "520px",
    left: "420px",
    top: "160px"
  });

  win.querySelectorAll(".wpItem").forEach(item => {
    item.onclick = () => applyWallpaper(item.dataset.url);
  });

  win.querySelector("#wpApplyCustom").onclick = () => {
    const url = win.querySelector("#wpCustom").value.trim();
    if (url) applyWallpaper(url);
  };
}

function applyWallpaper(url) {
  const body = document.body;

  body.style.transition = "background 0.4s ease";
  body.style.background = `url('${url}') center/cover fixed`;

  pushNotification("Wallpaper updated");
}
