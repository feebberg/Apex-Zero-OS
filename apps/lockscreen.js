// --- LOCK SCREEN ---

let lockPassword = getSetting("lockPassword", "1234");
let lockOverlay = null;

function showLockScreen() {
  if (lockOverlay) return;

  lockOverlay = document.createElement("div");
  lockOverlay.style.position = "fixed";
  lockOverlay.style.inset = "0";
  lockOverlay.style.background = "rgba(0,0,0,0.9)";
  lockOverlay.style.display = "flex";
  lockOverlay.style.flexDirection = "column";
  lockOverlay.style.alignItems = "center";
  lockOverlay.style.justifyContent = "center";
  lockOverlay.style.color = "white";
  lockOverlay.style.zIndex = 999999;

  lockOverlay.innerHTML = `
    <h2>Apex Zero Locked</h2>
    <p>Enter password to unlock.</p>
    <input id="lockInput" type="password"
      style="
        padding:8px;
        border-radius:8px;
        border:1px solid var(--border-soft);
        background:rgba(255,255,255,0.08);
        color:white;
        margin-bottom:10px;
      "
    >
    <button id="lockBtn" style="
      padding:8px 14px;
      border-radius:8px;
      border:1px solid var(--border-soft);
      background:rgba(0,0,0,0.6);
      color:white;
      cursor:pointer;
    ">Unlock</button>
  `;

  document.body.appendChild(lockOverlay);

  const input = document.getElementById("lockInput");
  const btn = document.getElementById("lockBtn");

  input.focus();

  const tryUnlock = () => {
    if (input.value === lockPassword) {
      lockOverlay.remove();
      lockOverlay = null;
      pushNotification("Unlocked");
    } else {
      pushNotification("Wrong password");
    }
  };

  btn.onclick = tryUnlock;
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") tryUnlock();
  });
}

function setLockPassword(newPass) {
  lockPassword = newPass;
  saveSetting("lockPassword", newPass);
  pushNotification("Lock password updated");
}
