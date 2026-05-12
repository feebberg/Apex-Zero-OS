function openAssistant() {
  const content = `
    <div style="display:flex; flex-direction:column; height:100%;">

      <div id="asstOutput" style="
        flex:1;
        overflow-y:auto;
        padding:10px;
        font-family:system-ui;
        white-space:pre-wrap;
      "></div>

      <div style="display:flex; gap:6px; margin-top:10px;">
        <input id="asstInput" placeholder="Ask me something..."
          style="
            flex:1;
            padding:8px;
            background:rgba(255,255,255,0.08);
            border:1px solid var(--border-soft);
            border-radius:6px;
            color:white;
            outline:none;
          "
        >
        <button id="asstSend"
          style="
            padding:8px 12px;
            background:rgba(255,255,255,0.1);
            border:1px solid var(--border-soft);
            border-radius:6px;
            color:white;
            cursor:pointer;
          "
        >Send</button>
      </div>

    </div>
  `;

  const win = createWindow("assistant", "AI Assistant", content, {
    width: "420px",
    height: "480px",
    left: "340px",
    top: "160px"
  });

  const input = win.querySelector("#asstInput");
  const send = win.querySelector("#asstSend");
  const output = win.querySelector("#asstOutput");

  send.onclick = () => {
    const msg = input.value.trim();
    if (!msg) return;
    addAsstMessage(output, "You", msg);
    input.value = "";
    setTimeout(() => {
      const reply = generateAssistantReply(msg);
      addAsstMessage(output, "Assistant", reply);
    }, 300);
  };

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") send.click();
  });
}

function addAsstMessage(output, sender, text) {
  output.innerHTML += `\n<b>${sender}:</b> ${text}`;
  output.scrollTop = output.scrollHeight;
}

function generateAssistantReply(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi")) {
    return "Hey! How can I help you inside Apex Zero OS?";
  }

  if (msg.includes("game")) {
    return "You can open the Game Hub from the dock — Minecraft, Agar.io, Paper.io and more are ready.";
  }

  if (msg.includes("terminal")) {
    return "Open the Terminal from the dock to run commands like help, echo, time, and clear.";
  }

  if (msg.includes("file")) {
    return "The File Manager lets you create folders, make text files, and open them in windows.";
  }

  if (msg.includes("music")) {
    return "The Music Player has a built‑in playlist with neon progress bars.";
  }

  if (msg.includes("settings")) {
    return "Settings lets you change themes, accent colors, and animations.";
  }

  if (msg.includes("who are you")) {
    return "I’m the built‑in AI Assistant for Apex Zero OS — your digital sidekick.";
  }

  return "I’m not sure about that yet, but I’m learning. Try asking about apps, games, or OS features.";
}

