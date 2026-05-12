function openGameHub() {
  const content = `
    <h2 style="margin-top:0;">Game Hub</h2>
    <p>Select a game to launch inside Apex Zero OS.</p>

    <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px;">
      ${gameCard("Minecraft", "https://classic.minecraft.net/")}
      ${gameCard("Agar.io", "https://agar.io/")}
      ${gameCard("Paper.io", "https://paper-io.com/")}
      ${gameCard("Slither.io", "https://slither.io/")}
    </div>
  `;

  createWindow("gamehub", "Game Hub", content, {
    width: "900px",
    height: "560px",
    left: "120px",
    top: "80px"
  });

  bindGameButtons();
}

function gameCard(name, url) {
  return `
    <div style="
      padding:10px;
      border:1px solid var(--border-soft);
      border-radius:10px;
      background:rgba(255,255,255,0.05);
      box-shadow:0 0 10px #ff2bff55;
    ">
      <div style="font-size:16px; margin-bottom:6px;">${name}</div>
      <button class="ghLaunchBtn"
        data-url="${url}"
        style="
          padding:6px 10px;
          background:rgba(255,255,255,0.08);
          border:1px solid var(--border-soft);
          border-radius:6px;
          color:white;
          cursor:pointer;
        "
      >Launch</button>
    </div>
  `;
}

function bindGameButtons() {
  document.querySelectorAll(".ghLaunchBtn").forEach(btn => {
    btn.onclick = () => openGameWindow(btn.dataset.url);
  });
}

function openGameWindow(url) {
  const iframe = `
    <iframe src="${url}"
      style="width:100%; height:100%; border:none; border-radius:8px; background:black;"
      allowfullscreen
    ></iframe>
  `;

  createWindow("game-" + Math.random().toString(36).slice(2), "Game", iframe, {
    width: "960px",
    height: "600px",
    left: "140px",
    top: "90px"
  });
}

