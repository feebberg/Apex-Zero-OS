
let azZ = 10;

// Create a draggable window
function createWindow(id, title, content, opts = {}) {
  const desktop = document.getElementById("desktop");

  const win = document.createElement("div");
  win.className = "azWindow";
  win.dataset.app = id;

  win.style.width = opts.width || "720px";
  win.style.height = opts.height || "480px";
  win.style.left = opts.left || "80px";
  win.style.top = opts.top || "60px";
  win.style.zIndex = ++azZ;

  win.innerHTML = `
    <div class="azTitleBar">
      <div class="azTitle">${title}</div>
      <div class="azCloseBtn"></div>
    </div>
    <div class="azContent">${content}</div>
  `;

  desktop.appendChild(win);

  win.querySelector(".azCloseBtn").onclick = () => win.remove();
  makeDraggable(win);

  return win;
}

// Dragging logic
function makeDraggable(win) {
  const bar = win.querySelector(".azTitleBar");
  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  bar.addEventListener("mousedown", e => {
    dragging = true;
    azZ++;
    win.style.zIndex = azZ;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
  });

  document.addEventListener("mousemove", e => {
    if (!dragging) return;
    win.style.left = e.clientX - offsetX + "px";
    win.style.top = e.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => dragging = false);
}

// Notifications
function pushNotification(text) {
  const box = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = text;
  box.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
