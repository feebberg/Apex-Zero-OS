let spotlightOpen = false;

function openSpotlight() {
  if (spotlightOpen) return;
  spotlightOpen = true;

  const box = document.createElement("div");
  box.id = "azSpotlight";
  box.style = `
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 480px;
    padding: 16px;
    background: rgba(0,0,0,0.75);
    border: 1px solid var(--border-soft);
    border-radius: 12px;
    box-shadow: 0 0 20px #ff2bff88;
    backdrop-filter: blur(12px);
    z-index: 999999;
  `;

  box.innerHTML = `
    <input id="azSpotInput" placeholder="Search apps..."
      style="
        width:100%;
        padding:10px;
        background:rgba(255,255,255,0.08);
        border:1px solid var(--border-soft);
        border-radius:8px;
        color:white;
        outline:none;
        font-size:16px;
      "
    >
    <div id="azSpotResults" style="margin-top:12px; color:white;"></div>
  `;

  document.body.appendChild(box);

  const input = document.getElementById("azSpotInput");
  const results = document.getElementById("azSpotResults");

  input.focus();

  input.oninput = () => {
    const q = input.value.toLowerCase();
    renderSpotlightResults(q, results);
  };

  input.onkeydown = e => {
    if (e.key === "Escape") closeSpotlight();
  };
}

function closeSpotlight() {
  const box = document.getElementById("azSpotlight");
  if (box) box.remove();
  spotlightOpen = false;
}

function renderSpotlightResults(query, resultsBox) {
  const apps = [
    { id: "gamehub", name: "Game Hub" },
    { id: "terminal", name: "Terminal" },
    { id: "filemanager", name: "File Manager" },
    { id: "musicplayer", name: "Music Player" },
    { id: "settings", name: "Settings" },
    { id: "assistant", name: "AI Assistant" }
  ];

  const matches = apps.filter(a => a.name.toLowerCase().includes(query));

  if (matches.length === 0) {
    resultsBox.innerHTML = `<div style="opacity:0.6;">No results</div>`;
    return;
  }

  resultsBox.innerHTML = matches
    .map(a => `
      <div class="spotItem"
        data-id="${a.id}"
        style="
          padding:8px;
          border-radius:6px;
          cursor:pointer;
          background:rgba(255,255,255,0.05);
          margin-bottom:6px;
        "
      >
        🔍 ${a.name}
      </div>
    `)
    .join("");

  resultsBox.querySelectorAll(".spotItem").forEach(item => {
    item.onclick = () => {
      const id = item.dataset.id;
      closeSpotlight();
      openAppById(id);
    };
  });
}

// Keyboard shortcut: SPACEBAR opens Spotlight
document.addEventListener("keydown", e => {
  if (e.code === "Space" && !spotlightOpen) {
    e.preventDefault();
    openSpotlight();
  } else if (e.code === "Escape" && spotlightOpen) {
    closeSpotlight();
  }
});

