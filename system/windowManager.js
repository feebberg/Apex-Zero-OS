/* ============================================================
   APEX ZERO OS 2.0 — WINDOW MANAGER
   Fully synced with style.css + main.js
   ============================================================ */

let zIndexCounter = 1000;

/* ------------------------------------------------------------
   CREATE WINDOW
   ------------------------------------------------------------ */
function createWindow(id, title, content, opts = {}) {
  const win = document.createElement("div");
  win.className = "azWindow";
  win.dataset.id = id;

  // Default size + position
  win.style.width = opts.width || "450px";
  win.style.height = opts.height || "300px";
  win.style.left = opts.left || "200px";
  win.style.top = opts.top || "150px";
  win.style.zIndex = zIndexCounter++;

  // Save original bounds for restore
  win._normalBounds = {
    width: win.style.width,
    height: win.style.height,
    left: win.style.left,
    top: win.style.top
  };
  win._isMaximized = false;

  /* ------------------------------------------------------------
     TITLE BAR
     ------------------------------------------------------------ */
  const titlebar = document.createElement("div");
  titlebar.className = "azTitleBar";

  const titleText = document.createElement("div");
  titleText.className = "azTitle";
  titleText.textContent = title;

  const controls = document.createElement("div");
  controls.className = "azControls";

  const minBtn = document.createElement("div");
  minBtn.className = "azMin";

  const maxBtn = document.createElement("div");
  maxBtn.className = "azMax";

  const closeBtn = document.createElement("div");
  closeBtn.className = "azClose";

  controls.appendChild(minBtn);
  controls.appendChild(maxBtn);
  controls.appendChild(closeBtn);

  titlebar.appendChild(titleText);
  titlebar.appendChild(controls);

  /* ------------------------------------------------------------
     CONTENT AREA
     ------------------------------------------------------------ */
  const contentDiv = document.createElement("div");
  contentDiv.className = "azContent";
  contentDiv.innerHTML = content;

  win.appendChild(titlebar);
  win.appendChild(contentDiv);
  document.body.appendChild(win);

  /* ------------------------------------------------------------
     BUTTON ACTIONS
     ------------------------------------------------------------ */
  closeBtn.onclick = () => win.remove();

  minBtn.onclick = () => {
    win.style.display = "none";
    pushNotification(`${title} minimized`);
  };

  maxBtn.onclick = () => toggleMaximize(win);

  /* ------------------------------------------------------------
     DRAGGING
     ------------------------------------------------------------ */
  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  titlebar.addEventListener("mousedown", e => {
    if (e.target === closeBtn || e.target === maxBtn || e.target === minBtn) return;

    dragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;

    win.style.zIndex = zIndexCounter++;

    // If dragging a maximized window, restore first
    if (win._isMaximized) {
      toggleMaximize(win, { fromDrag: true, mouseX: e.clientX });
      offsetX = e.clientX - win.offsetLeft;
    }
  });

  document.addEventListener("mousemove", e => {
    if (!dragging) return;
    win.style.left = e.clientX - offsetX + "px";
    win.style.top = e.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });

  return win;
}

/* ------------------------------------------------------------
   MAXIMIZE / RESTORE
   ------------------------------------------------------------ */
function toggleMaximize(win, options = {}) {
  if (!win._isMaximized) maximizeWindow(win);
  else restoreWindow(win, options);
}

function maximizeWindow(win) {
  win._normalBounds = {
    width: win.style.width,
    height: win.style.height,
    left: win.style.left,
    top: win.style.top
  };

  win.style.left = "0px";
  win.style.top = "0px";
  win.style.width = window.innerWidth + "px";
  win.style.height = window.innerHeight + "px";

  win._isMaximized = true;
}

function restoreWindow(win, options = {}) {
  const b = win._normalBounds;

  win.style.width = b.width;
  win.style.height = b.height;
  win.style.left = b.left;
  win.style.top = b.top;

  win._isMaximized = false;

  // If restoring from drag, center under cursor
  if (options.fromDrag) {
    const rect = win.getBoundingClientRect();
    win.style.left = options.mouseX - rect.width / 2 + "px";
  }
}
