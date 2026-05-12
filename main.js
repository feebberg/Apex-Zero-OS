/* ============================================================
   APEX ZERO OS 2.0 — MAIN SYSTEM BOOT FILE
   Handles:
   - Boot sequence
   - Dock app launching
   - Window restore from minimize
   - Spotlight init
   - Wallpaper init
   - Lockscreen init
   ============================================================ */

/* ------------------------------------------------------------
   BOOT SEQUENCE
   ------------------------------------------------------------ */
window.addEventListener("DOMContentLoaded", () => {
  console.log("Apex Zero OS 2.0 booting…");

  // Apply saved settings
  ApexSettings.apply();

  // Initialize core systems
  initDock();
  initSpotlight();
  initWallpaper();
  initLockscreen();

  console.log("Apex Zero OS 2.0 ready.");
});

/* ------------------------------------------------------------
   DOCK APP LAUNCHER
   ------------------------------------------------------------ */
function initDock() {
  const icons = document.querySelectorAll(".dockIcon");

  icons.forEach(icon => {
    icon.addEventListener("click", () => {
      const app = icon.dataset.app;
      launchApp(app);
    });
  });
}

/* ------------------------------------------------------------
   APP LAUNCHER
   ------------------------------------------------------------ */
function launchApp(appName) {
  switch (appName) {
    case "gamehub":
      openGameHub();
      break;

    case "terminal":
      openTerminal();
      break;

    case "filemanager":
      openFileManager();
      break;

    case "musicplayer":
      openMusicPlayer();
      break;

    case "settings":
      openSettingsApp();
      break;

    case "assistant":
      openAssistant();
      break;

    default:
      pushNotification(`Unknown app: ${appName}`);
  }
}

/* ------------------------------------------------------------
   RESTORE MINIMIZED WINDOWS
   ------------------------------------------------------------ */
function restoreWindowById(id) {
  const win = document.querySelector(`.azWindow[data-id="${id}"]`);
  if (!win) return;

  win.style.display = "block";
  win.style.zIndex = ++zIndexCounter;
}

/* ------------------------------------------------------------
   SPOTLIGHT INIT
   ------------------------------------------------------------ */
function initSpotlight() {
  window.addEventListener("keydown", e => {
    if (e.code === window.SPOTLIGHT_HOTKEY) {
      toggleSpotlight();
    }
  });
}

/* ------------------------------------------------------------
   WALLPAPER INIT
   ------------------------------------------------------------ */
function initWallpaper() {
  const saved = ApexSettings.load("wallpaper");
  if (saved) {
    document.getElementById("desktop").style.backgroundImage = `url('${saved}')`;
  }
}

/* ------------------------------------------------------------
   LOCKSCREEN INIT
   ------------------------------------------------------------ */
function initLockscreen() {
  const lockscreen = document.getElementById("lockscreen");
  const savedPass = ApexSettings.load("lockscreenPassword");

  if (!savedPass) {
    lockscreen.classList.add("hidden");
    return;
  }

  lockscreen.innerHTML = `
    <h2 style="color:white; font-size:32px;">Apex Zero OS</h2>
    <input id="lockInput" type="password" placeholder="Enter password">
  `;

  const input = document.getElementById("lockInput");

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      if (input.value === savedPass) {
        lockscreen.classList.add("hidden");
      } else {
        input.value = "";
        pushNotification("Incorrect password");
      }
    }
  });
}

/* ------------------------------------------------------------
   NOTIFICATION HELPER
   ------------------------------------------------------------ */
function pushNotification(text) {
  const container = document.getElementById("notifications");

  const note = document.createElement("div");
  note.className = "notification";
  note.textContent = text;

  container.appendChild(note);

  setTimeout(() => {
    note.style.opacity = "0";
    setTimeout(() => note.remove(), 300);
  }, 2500);
}
