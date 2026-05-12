// --- NOTIFICATION CENTER SYSTEM ---
let notifHistory = [];

function pushNotification(text) {
  const box = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = text;
  box.appendChild(toast);

  notifHistory.unshift({
    text,
    time: new Date().toLocaleTimeString()
  });

  setTimeout(() => toast.remove(), 3000);
}

let notifOpen = false;

function toggleNotificationCenter() {
  if (notifOpen) {
    closeNotificationCenter();
  } else {
    openNotificationCenter();
  }
}

function openNotificationCenter() {
  notifOpen = true;

  const panel = document.createElement("div");
  panel.id = "azNotifPanel";
  panel.style = `
    position:fixed;
    right:0;
    top:0;
    width:300px;
    height:100%;
    background:rgba(0,0,0,0.75);
    border-left:1px solid var(--border-soft);
    backdrop-filter:blur(12px);
    box-shadow:0 0 20px #ff2bff88;
    color:white;
    padding:16px;
    overflow-y:auto;
    z-index:999999;
    animation:slideIn 0.3s ease;
  `;

  panel.innerHTML = `
    <h2 style="margin-top:0;">Notifications</h2>
    <button id="notifClear"
      style="
        padding:6px 10px;
        background:rgba(255,255,255,0.1);
        border:1px solid var(--border-soft);
        border-radius:6px;
        color:white;
        cursor:pointer;
        margin-bottom:10px;
      "
    >Clear All</button>

    <div id="notifList">
      ${notifHistory.length === 0 ? 
        `<div style="opacity:0.6;">No notifications</div>` :
        notifHistory.map(n => `
          <div style="
            padding:8px;
            border:1px solid var(--border-soft);
            border-radius:6px;
            background:rgba(255,255,255,0.05);
            margin-bottom:8px;
          ">
            <div>${n.text}</div>
            <div style="opacity:0.6; font-size:12px;">${n.time}</div>
          </div>
        `).join("")
      }
    </div>
  `;

  document.body.appendChild(panel);

  panel.querySelector("#notifClear").onclick = () => {
    notifHistory = [];
    document.getElementById("notifList").innerHTML =
      `<div style="opacity:0.6;">No notifications</div>`;
  };
}

function closeNotificationCenter() {
  const panel = document.getElementById("azNotifPanel");
  if (!panel) return;

  panel.style.animation = "slideOut 0.3s ease";
  setTimeout(() => panel.remove(), 250);
  notifOpen = false;
}

// Close with ESC
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && notifOpen) closeNotificationCenter();
});

