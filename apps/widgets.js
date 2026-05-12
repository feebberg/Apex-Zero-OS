// --- WIDGET MANAGER ---
let widgetCount = 0;

function createWidget(title, innerHTML, opts = {}) {
  const w = document.createElement("div");
  w.className = "azWidget";
  w.style = `
    position:absolute;
    left:${opts.left || 40 + widgetCount * 20}px;
    top:${opts.top || 40 + widgetCount * 20}px;
    width:${opts.width || "200px"};
    padding:10px;
    background:rgba(0,0,0,0.55);
    border:1px solid var(--border-soft);
    border-radius:10px;
    color:white;
    box-shadow:0 0 12px #ff2bff55;
    backdrop-filter:blur(10px);
    cursor:move;
    z-index:9999;
  `;

  w.innerHTML = `
    <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
      <b>${title}</b>
      <div class="wClose" style="
        width:16px; height:16px; border-radius:50%;
        background:#ff4b6b; cursor:pointer;
      "></div>
    </div>
    <div class="wContent">${innerHTML}</div>
  `;

  document.body.appendChild(w);
  widgetCount++;

  w.querySelector(".wClose").onclick = () => w.remove();
  makeWidgetDraggable(w);

  return w;
}

function makeWidgetDraggable(w) {
  let drag = false;
  let offX = 0;
  let offY = 0;

  w.addEventListener("mousedown", e => {
    if (e.target.classList.contains("wClose")) return;
    drag = true;
    offX = e.clientX - w.offsetLeft;
    offY = e.clientY - w.offsetTop;
  });

  document.addEventListener("mousemove", e => {
    if (!drag) return;
    w.style.left = e.clientX - offX + "px";
    w.style.top = e.clientY - offY + "px";
  });

  document.addEventListener("mouseup", () => drag = false);
}

// --- CLOCK WIDGET ---
function widgetClock() {
  const w = createWidget("Clock", `<div id="wClockTime" style="font-size:22px;"></div>`);
  const timeBox = w.querySelector("#wClockTime");

  function update() {
    timeBox.textContent = new Date().toLocaleTimeString();
  }

  update();
  setInterval(update, 1000);
}

// --- NOTES WIDGET ---
function widgetNotes() {
  const w = createWidget("Notes", `
    <textarea id="wNotesArea" style="
      width:100%; height:120px;
      background:rgba(255,255,255,0.08);
      border:1px solid var(--border-soft);
      border-radius:6px;
      color:white; padding:6px;
      resize:none;
    "></textarea>
  `);

  const area = w.querySelector("#wNotesArea");
  area.value = localStorage.getItem("azNotes") || "";

  area.oninput = () => {
    localStorage.setItem("azNotes", area.value);
  };
}

// --- SYSTEM STATS WIDGET ---
function widgetStats() {
  const w = createWidget("System Stats", `
    <div style="font-size:14px; opacity:0.8;">Fake CPU Load</div>
    <div id="wCPUBar" style="
      width:100%; height:10px;
      background:rgba(255,255,255,0.1);
      border-radius:6px; overflow:hidden;
      margin-top:6px;
    ">
      <div id="wCPUFill" style="
        width:0%; height:100%;
        background:linear-gradient(90deg,#ff2bff,#00f6ff);
      "></div>
    </div>
  `);

  const fill = w.querySelector("#wCPUFill");

  setInterval(() => {
    const load = Math.floor(Math.random() * 100);
    fill.style.width = load + "%";
  }, 800);
}

// --- OPEN WIDGET MENU ---
function openWidgets() {
  const content = `
    <h2 style="margin-top:0;">Widgets</h2>
    <p>Select a widget to place on your desktop.</p>

    <button class="wBtn" data-type="clock">🕒 Clock</button><br><br>
    <button class="wBtn" data-type="notes">📝 Notes</button><br><br>
    <button class="wBtn" data-type="stats">📊 System Stats</button>
  `;

  const win = createWindow("widgets", "Widgets", content, {
    width: "300px",
    height: "260px",
    left: "360px",
    top: "180px"
  });

  win.querySelectorAll(".wBtn").forEach(btn => {
    btn.onclick = () => {
      const type = btn.dataset.type;
      if (type === "clock") widgetClock();
      if (type === "notes") widgetNotes();
      if (type === "stats") widgetStats();
    };
  });
}

