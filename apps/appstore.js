// --- APP STORE SYSTEM ---
let azInstalled = {
  gamehub: true,
  terminal: true,
  filemanager: true,
  musicplayer: true,
  settings: true,
  assistant: true,
  spotlight: true,
  widgets: true,
  desktops: true,
  lock: true,
  notifications: true
};

const azStoreApps = [
  {
    id: "calculator",
    name: "Calculator",
    icon: "🧮",
    desc: "A simple neon calculator for Apex Zero OS.",
    file: "calculator.js"
  },
  {
    id: "browser",
    name: "Web Browser",
    icon: "🌐",
    desc: "A lightweight in‑window browser.",
    file: "browser.js"
  },
  {
    id: "wallpaper",
    name: "Wallpaper Picker",
    icon: "🖼️",
    desc: "Change your desktop wallpaper instantly.",
    file: "wallpaper.js"
  }
];

function openAppStore() {
  const content = `
    <h2 style="margin-top:0;">Apex Zero App Store</h2>
    <p>Install apps to expand your OS.</p>

    <div style="display:flex; flex-direction:column; gap:12px;">
      ${azStoreApps.map(app => `
        <div style="
          padding:10px;
          border:1px solid var(--border-soft);
          border-radius:8px;
          background:rgba(255,255,255,0.05);
        ">
          <div style="font-size:18px; margin-bottom:4px;">
            ${app.icon} ${app.name}
          </div>
          <div style="opacity:0.7; margin-bottom:8px;">
            ${app.desc}
          </div>

          <button class="storeBtn"
            data-id="${app.id}"
            data-file="${app.file}"
            style="
              padding:6px 10px;
              background:rgba(255,255,255,0.1);
              border:1px solid var(--border-soft);
              border-radius:6px;
              color:white;
              cursor:pointer;
            "
          >
            ${azInstalled[app.id] ? "Uninstall" : "Install"}
          </button>
        </div>
      `).join("")}
    </div>
  `;

  const win = createWindow("appstore", "App Store", content, {
    width: "420px",
    height: "520px",
    left: "420px",
    top: "160px"
  });

  win.querySelectorAll(".storeBtn").forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const file = btn.dataset.file;

      if (azInstalled[id]) {
        uninstallApp(id, btn);
      } else {
        installApp(id, file, btn);
      }
    };
  });
}

function installApp(id, file, btn) {
  azInstalled[id] = true;
  btn.textContent = "Uninstall";

  pushNotification("Installed " + id);

  // Dynamically load JS file
  const script = document.createElement("script");
  script.src = "apps/" + file;
  document.body.appendChild(script);
}

function uninstallApp(id, btn) {
  azInstalled[id] = false;
  btn.textContent = "Install";

  pushNotification("Uninstalled " + id);
}

