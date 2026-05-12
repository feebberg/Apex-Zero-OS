// --- VIRTUAL DESKTOP SYSTEM ---
let desktops = [
  { id: 0, windows: [] }
];

let currentDesktop = 0;

// Create a new desktop
function createDesktop() {
  const id = desktops.length;
  desktops.push({ id, windows: [] });
  switchDesktop(id);
}

// Switch to a desktop
function switchDesktop(id) {
  // Save current windows
  desktops[currentDesktop].windows = Array.from(document.querySelectorAll(".azWindow"))
    .map(w => ({
      app: w.dataset.app,
      left: w.style.left,
      top: w.style.top,
      width: w.style.width,
      height: w.style.height,
      content: w.querySelector(".azContent").innerHTML,
      title: w.querySelector(".azTitle").textContent
    }));

  // Clear screen
  document.querySelectorAll(".azWindow").forEach(w => w.remove());

  currentDesktop = id;

  // Restore windows
  desktops[id].windows.forEach(w => {
    const restored = createWindow(
      w.app,
      w.title,
      w.content,
      { left: w.left, top: w.top, width: w.width, height: w.height }
    );
  });

  pushNotification("Switched to Desktop " + (id + 1));
}

// Desktop Manager window
function openDesktopManager() {
  const content = `
    <h2 style="margin-top:0;">Virtual Desktops</h2>
    <p>Manage your workspaces.</p>

    <div style="display:flex; flex-direction:column; gap:10px;">
      ${desktops.map((d, i) => `
        <button class="deskBtn" data-id="${i}"
          style="
            padding:8px;
            background:rgba(255,255,255,0.08);
            border:1px solid var(--border-soft);
            border-radius:6px;
            color:white;
            cursor:pointer;
          "
        >
          Desktop ${i + 1} ${i === currentDesktop ? "(Active)" : ""}
        </button>
      `).join("")}

      <button id="deskNew"
        style="
          padding:8px;
          background:rgba(0,255,150,0.15);
          border:1px solid var(--border-soft);
          border-radius:6px;
          color:white;
          cursor:pointer;
        "
      >
        ➕ New Desktop
      </button>
    </div>
  `;

  const win = createWindow("desktops", "Virtual Desktops", content, {
    width: "300px",
    height: "360px",
    left: "380px",
    top: "180px"
  });

  win.querySelectorAll(".deskBtn").forEach(btn => {
    btn.onclick = () => {
      const id = Number(btn.dataset.id);
      switchDesktop(id);
    };
  });

  win.querySelector("#deskNew").onclick = () => {
    createDesktop();
    openDesktopManager();
  };
}

// Keyboard shortcuts
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "ArrowRight") {
    const next = (currentDesktop + 1) % desktops.length;
    switchDesktop(next);
  }
  if (e.ctrlKey && e.key === "ArrowLeft") {
    const prev = (currentDesktop - 1 + desktops.length) % desktops.length;
    switchDesktop(prev);
  }
});

