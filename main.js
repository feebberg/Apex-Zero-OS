window.onload = () => {
  initDock();
  pushNotification("Apex Zero OS Loaded");
};

function initDock() {
  const dock = document.getElementById("dock");

  const apps = [
    { id: "gamehub", icon: "🎮", title: "Game Hub" },
    { id: "terminal", icon: "💻", title: "Terminal" },
    { id: "filemanager", icon: "📁", title: "File Manager" },
    { id: "musicplayer", icon: "🎵", title: "Music Player" },
    { id: "settings", icon: "⚙️", title: "Settings" },
    { id: "assistant", icon: "🤖", title: "AI Assistant" },
    { id: "spotlight", icon: "🔍", title: "Spotlight Search" },
    { id: "widgets", icon: "🧩", title: "Widgets" },
    { id: "desktops", icon: "🖥️", title: "Virtual Desktops" },
    { id: "lock", icon: "🔒", title: "Lock Screen" }
  ];

  apps.forEach(app => {
    const div = document.createElement("div");
    div.className = "dockIcon";
    div.title = app.title;
    div.textContent = app.icon;

    div.onclick = () => {
      if (app.id === "spotlight") return openSpotlight();
      if (app.id === "widgets") return openWidgets();
      if (app.id === "desktops") return openDesktopManager();
      if (app.id === "lock") return showLockScreen();
      openAppById(app.id);
    };

    dock.appendChild(div);
  });
}

function openAppById(id) {
  if (id === "gamehub") return openGameHub();
  if (id === "terminal") return openTerminal();
  if (id === "filemanager") return openFileManager();
  if (id === "musicplayer") return openMusicPlayer();
  if (id === "settings") return openSettings();
  if (id === "assistant") return openAssistant();
}
