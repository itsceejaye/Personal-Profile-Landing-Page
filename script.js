(function () {
  function onDomReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  function getSystemPrefersDark() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}

    var themeToggleBtn = document.getElementById("themeToggleBtn");
    if (themeToggleBtn) {
      themeToggleBtn.textContent =
        theme === "dark" ? "Light Mode" : "Dark Mode";
    }
  }

  function initTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem("theme");
    } catch (e) {}
    var theme = saved || (getSystemPrefersDark() ? "dark" : "light");
    applyTheme(theme);
    var btn = document.getElementById("themeToggleBtn");
    if (btn)
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  function playBackgroundMusic() {
    var audio = document.createElement("audio");
    audio.src = "Astral.mp3";
    audio.loop = true;
    audio.volume = 0.3;
    audio.autoplay = true;
    audio.style.display = "none";
    document.body.appendChild(audio);

    function tryPlay() {
      audio.play().catch(function () {});
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("keydown", tryPlay);
    }
    audio.addEventListener("error", function () {
      console.warn(
        "Audio file not found. Please add background-music.mp3 to your project folder."
      );
    });
    document.addEventListener("click", tryPlay);
    document.addEventListener("keydown", tryPlay);

    var timestampEl = document.getElementById("songTimestamp");
    function updateTimestamp() {
      var seconds = Math.floor(audio.currentTime % 60);
      var minutes = Math.floor(audio.currentTime / 60);
      if (timestampEl) {
        timestampEl.textContent =
          minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      }
    }
    audio.addEventListener("timeupdate", updateTimestamp);
    audio.addEventListener("play", updateTimestamp);
    audio.addEventListener("loadedmetadata", updateTimestamp);
    setInterval(updateTimestamp, 1000);

    var volumeSlider = document.getElementById("volumeSlider");
    if (volumeSlider) {
      volumeSlider.addEventListener("input", function () {
        audio.volume = parseFloat(volumeSlider.value);
      });
      volumeSlider.value = audio.volume;
    }
  }

  onDomReady(function init() {
    var flipBtn = document.getElementById("flipBtn");
    var backBtn = document.getElementById("backBtn");
    var themeToggleBtn = document.getElementById("themeToggleBtn");
    var card = document.getElementById("card");

    initTheme();
    playBackgroundMusic();

    if (flipBtn) {
      flipBtn.addEventListener("click", function () {
        card.classList.add("flipped");

        setTimeout(function () {
          var funFacts = document.querySelector(".fun-facts");
          if (funFacts) {
            funFacts.classList.add("animate");
          }
        }, 300);
      });
    }

    if (backBtn) {
      backBtn.addEventListener("click", function () {
        card.classList.remove("flipped");

        var funFacts = document.querySelector(".fun-facts");
        if (funFacts) {
          funFacts.classList.remove("animate");
        }
      });
    }

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", function () {
        var current =
          document.documentElement.getAttribute("data-theme") || "dark";
        var next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        themeToggleBtn.setAttribute(
          "aria-pressed",
          next === "dark" ? "true" : "false"
        );
      });
    }
  });
})();
