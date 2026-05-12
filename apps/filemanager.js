// Simple virtual file system
let VFS = {
  "Documents": {
    type: "folder",
    children: {}
  },
  "Games": {
    type: "folder",
    children: {}
  },
  "notes.txt": {
    type: "file",
    content: "Welcome to Apex Zero OS!"
  }
};

function openFileManager() {
  const content = `
    <div style="display:flex; height:100%;">
      
      <!-- Sidebar -->
      <div style="
        width:180px;
        border-right:1px solid var(--border-soft);
        padding:10px;
        background:rgba(255,255,255,0.05);
      ">
        <button id="fmNewFolder" style="width:100%; margin-bottom:6px;">New Folder</button>
        <button id="fmNewFile" style="width:100%;">New File</button>
      </div>

      <!-- Main panel -->
      <div id="fmPanel" style="flex:1; padding:10px; overflow-y:auto;"></div>

    </div>
  `;

  const win = createWindow("filemanager", "File Manager", content, {
    width: "720px",
    height: "480px",
    left: "200px",
    top: "120px"
  });

  renderFolder(win, VFS);

  win.querySelector("#fmNewFolder").onclick = () => {
    const name = prompt("Folder name:");
    if (!name) return;
    VFS[name] = { type: "folder", children: {} };
    renderFolder(win, VFS);
  };

  win.querySelector("#fmNewFile").onclick = () => {
    const name = prompt("File name:");
    if (!name) return;
    VFS[name] = { type: "file", content: "" };
    renderFolder(win, VFS);
  };
}

function renderFolder(win, folder) {
  const panel = win.querySelector("#fmPanel");

  panel.innerHTML = `
    <h3>Files</h3>
    <div style="display:flex; flex-direction:column; gap:8px;">
      ${Object.keys(folder).map(name => fileEntry(name, folder[name])).join("")}
    </div>
  `;

  panel.querySelectorAll(".fmEntry").forEach(btn => {
    btn.onclick = () => {
      const name = btn.dataset.name;
      const item = folder[name];

      if (item.type === "folder") {
        openSubFolder(win, name, item);
      } else {
        openTextFile(name, item);
      }
    };
  });
}

function fileEntry(name, item) {
  return `
    <div class="fmEntry"
      data-name="${name}"
      style="
        padding:8px;
        border:1px solid var(--border-soft);
        border-radius:6px;
        background:rgba(255,255,255,0.05);
        cursor:pointer;
      "
    >
      ${item.type === "folder" ? "📁" : "📄"} ${name}
    </div>
  `;
}

function openSubFolder(win, name, folderObj) {
  const panel = win.querySelector("#fmPanel");

  panel.innerHTML = `
    <h3>${name}</h3>
    <button id="fmBack">⬅ Back</button>
    <div style="margin-top:10px; display:flex; flex-direction:column; gap:8px;">
      ${Object.keys(folderObj.children).map(n => fileEntry(n, folderObj.children[n])).join("")}
    </div>
  `;

  panel.querySelector("#fmBack").onclick = () => renderFolder(win, VFS);

  panel.querySelectorAll(".fmEntry").forEach(btn => {
    btn.onclick = () => {
      const n = btn.dataset.name;
      const item = folderObj.children[n];

      if (item.type === "folder") {
        openSubFolder(win, n, item);
      } else {
        openTextFile(n, item);
      }
    };
  });
}

function openTextFile(name, fileObj) {
  const content = `
    <textarea id="fmTextArea"
      style="
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.4);
        border:1px solid var(--border-soft);
        border-radius:6px;
        color:white;
        padding:10px;
        resize:none;
      "
    >${fileObj.content}</textarea>
  `;

  const win = createWindow("file-" + name, name, content, {
    width: "500px",
    height: "400px",
    left: "260px",
    top: "160px"
  });

  const area = win.querySelector("#fmTextArea");
  area.oninput = () => {
    fileObj.content = area.value;
  };
}

