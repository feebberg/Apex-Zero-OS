// --- SYSTEM INFO PANEL ---
let azStartTime = Date.now();

function openSystemInfo() {
  const content = `
    <h2 style="margin-top:0;">System Information</h2>

    <div style="display:flex; flex-direction:column; gap:14px;">

      <div class="siBlock">
        <b>OS Version:</b> Apex Zero OS 1.0
      </div>

      <div class="siBlock">
        <b>Uptime:</b> <span id="siUptime">0s</span>
      </div>

      <div class="siBlock">
        <b>Open Windows:</b> <span id="siWindows">0</span>
      </div>

      <div class="siBlock">
        <b>Desktops:</b> <span id="siDesktops">0</span>
      </div>

      <div class="siBlock">
        <b>CPU Load:</b>
        <div style="
          width:100%; height:10px;
          background:rgba(255,255,255,0.1);
          border-radius:6px; overflow:hidden;
        ">
          <div id="siCPU" style="
            width:0%; height:100%;
            background:linear-gradient(90deg,#ff2bff,#00f6ff);
          "></div>
        </div>
      </div>

      <div class="siBlock">
        <b>RAM Usage:</b>
        <div style="
          width:100%; height:10px;
          background:rgba(255,255,255,0.1);
          border-radius:6px; overflow:hidden;
        ">
          <div id="siRAM" style="
            width:0%; height:100%;
            background:linear-gradient(90deg,#00f6ff,#ff2bff);
          "></div>
        </div>
      </div>

      <div class="siBlock">
        <b>Browser:</b> ${navigator.userAgent}
      </div>

      <div class="siBlock">
        <b>Screen:</b> ${window.innerWidth} × ${window.innerHeight}
      </div>

    </div>
  `;

  const win = createWindow("systeminfo", "System Info", content, {
    width: "420px",
    height: "520px",
    left: "460px",
    top: "160px"
  });

  updateSystemInfo(win);
  setInterval(() => updateSystemInfo(win), 1000);
}

function updateSystemInfo(win) {
  if (!win) return;

  const uptime = Math.floor((Date.now() - azStartTime) / 1000);
  win.querySelector("#siUptime").textContent = uptime + "s";

  const windows = document.querySelectorAll(".azWindow").length;
  win.querySelector("#siWindows").textContent = windows;

  win.querySelector("#siDesktops").textContent = desktops.length;

  const cpu = Math.floor(Math.random() * 100);
  win.querySelector("#siCPU").style.width = cpu + "%";

  const ram = Math.floor(Math.random() * 100);
  win.querySelector("#siRAM").style.width = ram + "%";
}
