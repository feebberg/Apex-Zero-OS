// --- SETTINGS ENGINE (PERSISTENT) ---

let AZ_SETTINGS = JSON.parse(localStorage.getItem("AZ_SETTINGS") || "{}");

function saveSetting(key, value) {
  AZ_SETTINGS[key] = value;
  localStorage.setItem("AZ_SETTINGS", JSON.stringify(AZ_SETTINGS));
}

function getSetting(key, fallback = null) {
  return AZ_SETTINGS[key] ?? fallback;
}
