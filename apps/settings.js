let azSettings = {
  theme: "neon",
  accent: "#ff2bff",
  animations: true
};

function openSettings() {
  const content = `
    <h2 style="margin-top:0;">Settings</h2>

    <div style="display:flex; flex-direction:column; gap:16px;">

      <!-- THEME -->
      <div>
        <h3>Theme</h3>
        <select id="setTheme" style="padding:6px; width:160px;">
          <option value="neon">Neon (Default)</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>

      <!-- ACCENT COLOR -->
      <div>
        <h3>Accent Color</h3>
        <input id="setAccent" type="color" value="${azSettings.accent}">
      </div>

      <!-- ANIMATIONS -->
      <div>
        <h3>Animations</h3>
        <label>
          <input id="setAnim" type="checkbox" ${azSettings.animations ? "checked" : ""}>
          Enable animations
        </label>
      </div>

    </div>
  `;

  const win = createWindow("settings", "Settings", content, {
    width: "420px",
    height: "360px",
    left: "300px",
    top: "160px"
  });

  const themeSel = win.querySelector("#setTheme");
  const accentSel = win.querySelector("#setAccent");
  const animSel = win.querySelector("#setAnim");

  themeSel.value = azSettings.theme;

  themeSel.onchange = () => {
    azSettings.theme = themeSel.value;
    applyTheme();
  };

  accentSel.oninput = () => {
    azSettings.accent = accentSel.value;
    applyTheme();
  };

  animSel.onchange = () => {
    azSettings.animations = animSel.checked;
    applyAnimations();
  };
}

function applyTheme() {
  const root = document.documentElement;

  if (azSettings.theme === "neon") {
    root.style.setProperty("--bg-main", "radial-gradient(circle at top, #3b0b5f 0, #05010a 45%, #000000 100%)");
    root.style.setProperty("--accent-neon", azSettings.accent);
  }

  if (azSettings.theme === "dark") {
    root.style.setProperty("--bg-main", "#000000");
    root.style.setProperty("--accent-neon", azSettings.accent);
  }

  if (azSettings.theme === "light") {
    root.style.setProperty("--bg-main", "#f5f5f5");
    root.style.setProperty("--accent-neon", azSettings.accent);
  }
}

function applyAnimations() {
  const body = document.body;
  body.style.transition = azSettings.animations ? "0.25s ease" : "none";
}

