// --- SETTINGS ENGINE (PERSISTENT) ---

// Load saved settings or create empty object
let AZ_SETTINGS = JSON.parse(localStorage.getItem("AZ_SETTINGS") || "{}");

// Save settings to localStorage
function saveSetting(key, value) {
  AZ_SETTINGS[key] = value;
  localStorage.setItem("AZ_SETTINGS", JSON.stringify(AZ_SETTINGS));
}

// Get a setting
function getSetting(key, fallback = null) {
  return AZ_SETTINGS[key] ?? fallback;
}

