// --- WINDOW MANAGER ---

let zIndexCounter = 1000;

function createWindow(id, title, content, opts = {}) {
  const win = document.createElement("div");
  win.className = "azWindow";
  win.dataset.id = id;

  win.style.width = opts.width || "400px";
  win.style.height = opts.height || "300px";
  win.style.left = opts.left || "200px";
  win.style.top = opts.top || "120px";
  win.style.zIndex = zIndexCounter++;

  // TITLE BAR
  const titlebar = document.createElement("div");
  titlebar.className = "azTitleBar";

  const titleText = document.createElement("div");
  titleText.className = "azTitle";
  titleText.textContent = title;

  const closeBtn = document.createElement("div");
  closeBtn.className = "azClose";

  titlebar.appendChild(titleText);
  titlebar.appendChild(closeBtn);

  // CONTENT
  const contentDiv = document.createElement("div");
  contentDiv.className = "azContent";
  contentDiv.innerHTML = content;

  win.appendChild(titlebar);
  win.appendChild(contentDiv);
  document.body.appendChild(win);

  // CLOSE BUTTON FIXED
  closeBtn.onclick = () => {
    win.remove();
  };

  // DRAGGING
  let offsetX = 0;
  let offsetY = 0;
  let dragging = false;

  titlebar.addEventListener("mousedown", e => {
    dragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = zIndexCounter++;
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
