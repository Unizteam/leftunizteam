document.addEventListener("DOMContentLoaded", () => {

  window.addEventListener("scroll", () => {
    const subnav = document.querySelector(".subnav");
    if (window.scrollY > 50) {
      subnav.style.backdropFilter = "blur(50px)";
      subnav.style.webkitBackdropFilter = "blur(50px)";
    } else {
      subnav.style.backdropFilter = "none";
      subnav.style.webkitBackdropFilter = "none";
    }
  });

  const enlargeButtons = document.querySelectorAll(".enlarge-btn");
  enlargeButtons.forEach((button) => {
    const chartContainer = button.closest(".chart-container");
    const fullScreenView = chartContainer.querySelector(".full-screen");
    const overlay = fullScreenView.querySelector(".overlay");
    const closeBtn = fullScreenView.querySelector(".close-button");

    button.addEventListener("click", () => {
      fullScreenView.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      fullScreenView.style.display = "none";
    });

    overlay.addEventListener("click", () => {
      fullScreenView.style.display = "none";
    });
  });

  const copyButtons = document.querySelectorAll(".copy-button");
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const codeBlock = button.closest(".code-block").querySelector(".code-block-content").innerText;

      navigator.clipboard.writeText(codeBlock).then(
        () => {
          button.innerText = "Kopiert";
          button.style.color = "#00cc00"; 

          setTimeout(() => {
            button.innerText = "Copy code";
            button.style.color = "";
          }, 2000);
        },
        () => {
          alert("Kod kopyalanamadı.");
        }
      );
    });
  });

  const ads = [
    { image: "cocacola.1.png", video: "cocacola1.mp4" },
    { image: "trairline1.png", video: "trairlinevid.mp4" },
    { image: "spotify.png", video: "spotify.mp4" },
    { image: "db.1.png", video: "dbvid.mp4" }
  ];

  let currentAdIndex = localStorage.getItem("lastAdIndex");
  currentAdIndex = currentAdIndex !== null ? (parseInt(currentAdIndex) + 1) % ads.length : 0;

  const videoElement = document.getElementById("ad-video");
  const sourceElement = document.getElementById("video-source");
  const imageElement = document.getElementById("ad-image");
  const muteButton = document.getElementById("mute-btn");

  const loadAd = (index) => {
    const ad = ads[index];
    imageElement.src = ad.image;
    sourceElement.src = ad.video;
    videoElement.load(); 
    localStorage.setItem("lastAdIndex", index); 

    videoElement.play().catch(error => {
      console.log("Autoplay blocked after ad change.");
    });
  };

  const loadNextAd = () => {
    currentAdIndex = (currentAdIndex + 1) % ads.length;
    loadAd(currentAdIndex);
    enableSoundAndPlay(); 
  };

  const enableSoundAndPlay = () => {
    videoElement.muted = false;
    videoElement.volume = 1.0;
    videoElement.play().catch(error => {
      console.log("Autoplay with sound blocked. Waiting for user interaction...");
    });
  };

  document.body.addEventListener("click", () => {
    enableSoundAndPlay();
  }, { once: true });

  videoElement.addEventListener("ended", () => {
    loadNextAd(); 
  });

  muteButton.addEventListener("click", () => {
    videoElement.muted = !videoElement.muted;
    muteButton.textContent = videoElement.muted ? "🔇 Unmute" : "🔊 Mute";
  });

  videoElement.muted = true; 
  muteButton.textContent = "🔇 Unmute"; 

  loadAd(currentAdIndex);
}); 