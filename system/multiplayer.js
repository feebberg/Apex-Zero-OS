// --- MULTIPLAYER ENGINE ---
let socket;

function initMultiplayer() {
  socket = new WebSocket("wss://your-server-url-here");

  socket.onopen = () => {
    pushNotification("Connected to multiplayer");
  };

  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);

    if (data.type === "chat") {
      addChatMessage(data.user, data.text);
    }

    if (data.type === "windowMove") {
      const win = document.querySelector(`[data-mid="${data.id}"]`);
      if (win) {
        win.style.left = data.left;
        win.style.top = data.top;
      }
    }
  };
}

function sendMultiplayer(data) {
  if (socket && socket.readyState === 1) {
    socket.send(JSON.stringify(data));
  }
}
