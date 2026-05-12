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
    { id: "musicplayer", icon: "🎵", title: "Music Player" }
  ];

  apps.forEach(app => {
    const div = document.createElement("div");
    div.className = "dockIcon";
    div.title = app.title;
    div.textContent = app.icon;
    div.onclick = () => openAppById(app.id);
    dock.appendChild(div);
  });
}

function openAppById(id) {
  if (id === "gamehub") return openGameHub();
  if (id === "terminal") return openTerminal();
  if (id === "filemanager") return openFileManager();
  if (id === "musicplayer") return openMusicPlayer();
}
