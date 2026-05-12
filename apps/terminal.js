function openTerminal() {
  const content = `
    <div id="termOutput" style="
      height: calc(100% - 40px);
      overflow-y: auto;
      font-family: monospace;
      white-space: pre-wrap;
      padding: 6px;
    "></div>

    <input id="termInput" placeholder="Enter command..."
      style="
        width: 100%;
        padding: 8px;
        background: rgba(255,255,255,0.08);
        border: 1px solid var(--border-soft);
        border-radius: 6px;
        color: white;
        outline: none;
        font-family: monospace;
      "
    >
  `;

  const win = createWindow("terminal", "Terminal", content, {
    width: "600px",
    height: "400px",
    left: "160px",
    top: "120px"
  });

  const input = win.querySelector("#termInput");
  const output = win.querySelector("#termOutput");

  input.focus();

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const cmd = input.value.trim();
      runTerminalCommand(cmd, output);
      input.value = "";
    }
  });
}

function runTerminalCommand(cmd, output) {
  if (!cmd) return;

  print(output, "> " + cmd);

  const parts = cmd.split(" ");
  const base = parts[0].toLowerCase();

  switch (base) {
    case "help":
      print(output, "Available commands:\nhelp\necho <text>\ntime\nclear");
      break;

    case "echo":
      print(output, parts.slice(1).join(" "));
      break;

    case "time":
      print(output, new Date().toLocaleTimeString());
      break;

    case "clear":
      output.innerHTML = "";
      break;

    default:
      print(output, "Unknown command: " + base);
  }

  output.scrollTop = output.scrollHeight;
}

function print(output, text) {
  output.innerHTML += text + "\n";
}

