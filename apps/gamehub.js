// --- GAME HUB (6 MOST RECENT GAMES) ---

const azGames = [
  {
    id: "eagler1122",
    name: "Eaglercraft 1.12.2",
    desc: "Your original offline WASM build.",
    icon: "⛏️",
    url: "https://github.com/feebberg/Apex-Zero/blob/main/Eaglercraft_1.12.2_WASM_Offline_Download%20(2).html"
  },
  {
    id: "game2",
    name: "Game Slot 2",
    desc: "Add your next game here.",
    icon: "🎮",
    url: ""
  },
  {
    id: "game3",
    name: "Game Slot 3",
    desc: "Add your next game here.",
    icon: "🕹️",
    url: ""
  },
  {
    id: "game4",
    name: "Game Slot 4",
    desc: "Add your next game here.",
    icon: "⚡",
    url: ""
  },
  {
    id: "game5",
    name: "Game Slot 5",
    desc: "Add your next game here.",
    icon: "🔥",
    url: ""
  },
  {
    id: "game6",
    name: "Game Slot 6",
    desc: "Add your next game here.",
    icon: "🚀",
    url: ""
  }
];

function openGameHub() {
  const content = `
    <h2 style="margin-top:0;">Game Hub</h2>
    <p>Select a game to launch in a window.</p>

    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill,minmax(180px,1fr));
      gap:12px;
    ">
      ${azGames.map(g => `
        <div class="gameCard" data-id="${g.id}"
          style="
            padding:10px;
            border-radius:10px;
            border:1px solid var(--border-soft);
            background:rgba(255,255,255,0.05);
            cursor:pointer;
            transition:0.2s;
          "
        >
          <div style="font-size:24px; margin-bottom:6px;">${g.icon}</div>
          <div style="font-weight:bold; margin-bottom:4px;">${g.name}</div>
          <div style="opacity:0.7; font-size:13px;">${g.desc}</div>
        </div>
      `).join("")}
    </div>
  `;

  const win = createWindow("gamehub", "Game Hub", content, {
    width: "640px",
    height: "480px",
    left: "260px",
    top: "120px"
  });

  win.querySelectorAll(".gameCard").forEach(card => {
    card.onclick = () => {
      const id = card.dataset.id;
      const game = azGames.find(g => g.id === id);
      if (!game || !game.url) return;
      openGameWindow(game);
    };
  });
}

function openGameWindow(game) {
  const content = `
    <h3 style="margin-top:0;">${game.icon} ${game.name}</h3>
    <div style="margin-bottom:8px; opacity:0.8;">${game.desc}</div>
    <div style="
      width:100%;
      height:calc(100% - 60px);
      border-radius:8px;
      overflow:hidden;
      border:1px solid var(--border-soft);
      background:rgba(0,0,0,0.6);
    ">
      <iframe
        src="${game.url}"
        style="width:100%; height:100%; border:none;"
      ></iframe>
    </div>
  `;

  createWindow(game.id, game.name, content, {
    width: "800px",
    height: "520px",
    left: "280px",
    top: "140px"
  });
}
