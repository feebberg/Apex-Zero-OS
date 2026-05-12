/* ============================================================
   APEX ZERO OS 2.0 — SETTINGS ENGINE
   Persistent storage for all system + app settings
   ============================================================ */

const SETTINGS_KEY = "ApexZero_Settings_v2";

/* ------------------------------------------------------------
   LOAD SETTINGS FROM LOCALSTORAGE
   ------------------------------------------------------------ */
function loadAllSettings() {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    console.error("Settings corrupted — resetting.");
    return {};
  }
}

let SETTINGS = loadAllSettings();

/* ------------------------------------------------------------
   SAVE A SINGLE SETTING
   ------------------------------------------------------------ */
function saveSetting(key, value) {
  SETTINGS[key] = value;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(SETTINGS));
}

/* ------------------------------------------------------------
   LOAD A SINGLE SETTING
   ------------------------------------------------------------ */
function loadSetting(key, fallback = null) {
  return SETTINGS[key] !== undefined ? SETTINGS[key] : fallback;
}

/* ------------------------------------------------------------
   DELETE A SETTING
   ------------------------------------------------------------ */
function deleteSetting(key) {
  delete SETTINGS[key];
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(SETTINGS));
}

/* ------------------------------------------------------------
   RESET ALL SETTINGS
   ------------------------------------------------------------ */
function resetAllSettings() {
  SETTINGS = {};
  localStorage.removeItem(SETTINGS_KEY);
}

/* ------------------------------------------------------------
   APPLY SYSTEM SETTINGS ON BOOT
   ------------------------------------------------------------ */
function applySystemSettings() {
  /* Wallpaper */
  const wallpaper = loadSetting("wallpaper");
  if (wallpaper) {
    document.getElementById("desktop").style.backgroundImage = `url('${wallpaper}')`;
  }

  /* Lockscreen password */
  const lockPass = loadSetting("lockscreenPassword");
  if (lockPass) {
    console.log("Lockscreen password loaded.");
  }

  /* Spotlight hotkey */
  const hotkey = loadSetting("spotlightHotkey", "Space");
  window.SPOTLIGHT_HOTKEY = hotkey;

  /* Theme (future expansion) */
  const theme = loadSetting("theme", "neon");
  document.body.dataset.theme = theme;
}

/* ------------------------------------------------------------
   EXPORT API FOR APPS
   ------------------------------------------------------------ */
window.ApexSettings = {
  save: saveSetting,
  load: loadSetting,
  delete: deleteSetting,
  reset: resetAllSettings,
  apply: applySystemSettings
};
