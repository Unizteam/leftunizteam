document.addEventListener("DOMContentLoaded", () => {

  window.addEventListener("scroll", () => {
    const subnav = document.querySelector(".subnav");
    if (subnav) {
      if (window.scrollY > 50) {
        subnav.style.backdropFilter = "blur(50px)";
        subnav.style.webkitBackdropFilter = "blur(50px)";
      } else {
        subnav.style.backdropFilter = "none";
        subnav.style.webkitBackdropFilter = "none";
      }
    }
  });

  const enlargeButtons = document.querySelectorAll(".enlarge-btn");
  const fullScreenView = document.createElement("div");
  fullScreenView.classList.add("full-screen");
  fullScreenView.innerHTML = `
    <div class="overlay"></div>
    <button class="close-button">&times;</button>
    <img id="full-screen-img" src="" alt="Expanded Image">
  `;
  document.body.appendChild(fullScreenView);

  const fullScreenImg = fullScreenView.querySelector("#full-screen-img");
  const overlay = fullScreenView.querySelector(".overlay");
  const closeBtn = fullScreenView.querySelector(".close-button");

  enlargeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const chartContainer = button.closest(".chart-container");
      const img = chartContainer.querySelector(".chart img");

      if (img) {
        fullScreenImg.src = img.src;
        fullScreenView.style.display = "flex";
        fullScreenView.style.justifyContent = "center";
        fullScreenView.style.alignItems = "center";
      }
    });
  });

  closeBtn.addEventListener("click", () => {
    fullScreenView.style.display = "none";
  });

  overlay.addEventListener("click", () => {
    fullScreenView.style.display = "none";
  });

  const copyButtons = document.querySelectorAll(".copy-button");
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const codeBlock = button.closest(".code-block")?.querySelector("pre code, code.language-css, code.language-html");

      if (!codeBlock) {
        alert("Kod bulunamadı.");
        return;
      }

      const textToCopy = codeBlock.textContent.trim();

      navigator.clipboard.writeText(textToCopy).then(
        () => {
          button.textContent = "✅ Kopiert";
          button.style.color = "#00cc00"; 

          setTimeout(() => {
            button.textContent = "📋 Code kopieren";
            button.style.color = "";
          }, 3000);
        },
        () => {
          alert("Kopiert.");
        }
      );
    });
  });

  const ads = [
    { image: "cocacola.1.png", video: "cocacola1.mp4", link: "https://www.coca-cola-deutschland.de/" },
    { image: "trairline1.png", video: "trairlinevid.mp4", link: "https://www.turkishairlines.com/de-de/" },
    { image: "spotify.png", video: "spotify.mp4", link: "https://www.spotify.com/de-de/" },
    { image: "db.1.png", video: "dbvid.mp4", link: "https://vitaminwell.de/" },
    { image: "delight.png", video: "scas.mp4", link: "https://www.nike.com/de/" }
  ];

  let currentAdIndex = localStorage.getItem("lastAdIndex");
  currentAdIndex = currentAdIndex !== null ? (parseInt(currentAdIndex) + 1) % ads.length : 0;

  const videoElement = document.getElementById("ad-video");
  const sourceElement = document.getElementById("video-source");
  const imageElement = document.getElementById("ad-image");
  const muteButton = document.getElementById("mute-btn");
  const imageLink = document.createElement("a");

  imageElement.parentNode.insertBefore(imageLink, imageElement);
  imageLink.appendChild(imageElement);

  const loadAd = (index) => {
    const ad = ads[index];
    if (imageElement && sourceElement && videoElement) {
      imageElement.src = ad.image;
      sourceElement.src = ad.video;
      imageLink.href = ad.link;
      imageLink.target = "_blank";
      videoElement.load();
      localStorage.setItem("lastAdIndex", index);

      videoElement.play().catch(() => {
        console.log("Autoplay blocked after ad change.");
      });
    }
  };

  const loadNextAd = () => {
    currentAdIndex = (currentAdIndex + 1) % ads.length;
    loadAd(currentAdIndex);
    enableSoundAndPlay();
  };

  const enableSoundAndPlay = () => {
    if (videoElement) {
      videoElement.muted = false;
      videoElement.volume = 1.0;
      videoElement.play().catch(() => {
        console.log("Autoplay with sound blocked. Waiting for user interaction...");
      });
    }
  };

  document.body.addEventListener("click", () => {
    enableSoundAndPlay();
  }, { once: true });

  if (videoElement) {
    videoElement.addEventListener("ended", loadNextAd);

    muteButton.addEventListener("click", () => {
      videoElement.muted = !videoElement.muted;
      muteButton.textContent = videoElement.muted ? "🔇 Unmute" : "🔊 Mute";
    });

    videoElement.muted = true;
    muteButton.textContent = "🔇 Unmute";

    loadAd(currentAdIndex);
  }
});
