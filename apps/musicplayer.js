let mpIndex = 0;

const mpSongs = [
  {
    name: "Cyberwave Dreams",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Cosmonkey/Cosmonkey_-_Singles/Cosmonkey_-_01_-_Space_Trip.mp3"
  },
  {
    name: "Neon Runner",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/It_is_time_for_adventure/Komiku_-_07_-_Run_against_the_universe.mp3"
  },
  {
    name: "Digital Sunset",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/It_is_time_for_adventure/Komiku_-_03_-_Friends_2018.mp3"
  }
];

let mpAudio = new Audio(mpSongs[0].url);

function openMusicPlayer() {
  const content = `
    <div style="display:flex; flex-direction:column; gap:14px;">

      <h2 style="margin:0;">Music Player</h2>

      <div id="mpSongName" style="font-size:18px; text-shadow:0 0 10px #ff2bff;">
        ${mpSongs[mpIndex].name}
      </div>

      <div style="display:flex; gap:10px;">
        <button id="mpPrev">⏮</button>
        <button id="mpPlay">▶</button>
        <button id="mpNext">⏭</button>
      </div>

      <div style="
        width:100%;
        height:10px;
        background:rgba(255,255,255,0.1);
        border-radius:6px;
        overflow:hidden;
      ">
        <div id="mpProgress" style="
          width:0%;
          height:100%;
          background:linear-gradient(90deg, #ff2bff, #00f6ff);
        "></div>
      </div>

    </div>
  `;

  const win = createWindow("musicplayer", "Music Player", content, {
    width: "360px",
    height: "240px",
    left: "260px",
    top: "160px"
  });

  const playBtn = win.querySelector("#mpPlay");
  const prevBtn = win.querySelector("#mpPrev");
  const nextBtn = win.querySelector("#mpNext");
  const nameBox = win.querySelector("#mpSongName");
  const progress = win.querySelector("#mpProgress");

  playBtn.onclick = () => {
    if (mpAudio.paused) {
      mpAudio.play();
      playBtn.textContent = "⏸";
    } else {
      mpAudio.pause();
      playBtn.textContent = "▶";
    }
  };

  prevBtn.onclick = () => {
    mpIndex = (mpIndex - 1 + mpSongs.length) % mpSongs.length;
    loadSong(nameBox, playBtn);
  };

  nextBtn.onclick = () => {
    mpIndex = (mpIndex + 1) % mpSongs.length;
    loadSong(nameBox, playBtn);
  };

  mpAudio.ontimeupdate = () => {
    const percent = (mpAudio.currentTime / mpAudio.duration) * 100;
    progress.style.width = percent + "%";
  };
}

function loadSong(nameBox, playBtn) {
  mpAudio.pause();
  mpAudio = new Audio(mpSongs[mpIndex].url);
  nameBox.textContent = mpSongs[mpIndex].name;
  mpAudio.play();
  playBtn.textContent = "⏸";
}

