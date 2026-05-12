// --- LOCK SCREEN SYSTEM ---
let lockActive = false;
let lockPassword = "1234"; // You can change this

function showLockScreen() {
  if (lockActive) return;
  lockActive = true;

  const lock = document.createElement("div");
  lock.id = "azLockScreen";
  lock.style = `
    position:fixed;
    inset:0;
    background:radial-gradient(circle at top, #3b0b5f 0, #05010a 45%, #000000 100%);
    backdrop-filter:blur(12px);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    color:white;
    z-index:9999999;
    animation:fadeIn 0.4s ease;
  `;

  lock.innerHTML = `
    <div style="text-align:center;">
      <div id="lockTime" style="font-size:48px; text-shadow:0 0 20px #ff2bff;"></div>
      <div id="lockDate" style="font-size:20px; opacity:0.8; margin-bottom:40px;"></div>

      <div id="lockPress" style="font-size:18px; opacity:0.6;">
        Press any key to unlock
      </div>

      <div id="lockInputBox" style="display:none; flex-direction:column; gap:10px;">
        <input id="lockInput" type="password" placeholder="Enter password"
          style="
            padding:10px;
            width:220px;
            background:rgba(255,255,255,0.08);
            border:1px solid var(--border-soft);
            border-radius:6px;
            color:white;
            outline:none;
            text-align:center;
          "
        >
        <button id="lockSubmit"
          style="
            padding:8px;
            width:220px;
            background:rgba(255,255,255,0.1);
            border:1px solid var(--border-soft);
            border-radius:6px;
            color:white;
            cursor:pointer;
          "
        >Unlock</button>
      </div>
    </div>
  `;

  document.body.appendChild(lock);

  updateLockTime();
  setInterval(updateLockTime, 1000);

  document.addEventListener("keydown", lockKeyHandler);
}

function lockKeyHandler() {
  const press = document.getElementById("lockPress");
  const box = document.getElementById("lockInputBox");

  if (!press) return;

  press.style.display = "none";
  box.style.display = "flex";

  const input = document.getElementById("lockInput");
  input.focus();

  document.removeEventListener("keydown", lockKeyHandler);
}

function updateLockTime() {
  const t = document.getElementById("lockTime");
  const d = document.getElementById("lockDate");
  if (!t) return;

  const now = new Date();
  t.textContent = now.toLocaleTimeString();
  d.textContent = now.toLocaleDateString(undefined, { weekday:"long", month:"long", day:"numeric" });
}

function unlockScreen() {
  const input = document.getElementById("lockInput");
  if (!input) return;

  if (input.value === lockPassword) {
    const lock = document.getElementById("azLockScreen");
    lock.style.animation = "fadeOut 0.4s ease";
    setTimeout(() => lock.remove(), 350);
    lockActive = false;
  } else {
    input.value = "";
    input.placeholder = "Wrong password";
  }
}

document.addEventListener("click", e => {
  if (e.target.id === "lockSubmit") unlockScreen();
});

// Auto-lock after inactivity
let idleTimer;
function resetIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(showLockScreen, 1000 * 60 * 2); // 2 minutes
}
document.addEventListener("mousemove", resetIdle);
document.addEventListener("keydown", resetIdle);
resetIdle();

