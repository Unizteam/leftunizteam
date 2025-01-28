document.addEventListener("DOMContentLoaded", () => {
  // Handle subnav blur effect on scroll
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

  // Handle enlarge functionality for all charts
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

  // Handle copy functionality for all code blocks
  const copyButtons = document.querySelectorAll(".copy-button");
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const codeBlock = button.closest(".code-block").querySelector(".code-block-content").innerText;

      navigator.clipboard.writeText(codeBlock).then(
        () => {
          button.innerText = "Kopiert";
          button.style.color = "#00cc00"; // Green for success feedback

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

  // Advertisement System
  const ads = [
    { image: "cocacola.1.png", video: "cocacola1.mp4" },
    { image: "trairline1.png", video: "trairlinevid.mp4" },
    { image: "spotify.png", video: "spotify.mp4" },
    { image: "db.1.png", video: "dbvid.mp4" }
  ];

  // Get last played ad index from localStorage, or start from 0
  let currentAdIndex = localStorage.getItem("lastAdIndex");
  currentAdIndex = currentAdIndex !== null ? (parseInt(currentAdIndex) + 1) % ads.length : 0;

  const videoElement = document.getElementById("ad-video");
  const sourceElement = document.getElementById("video-source");
  const imageElement = document.getElementById("ad-image");
  const muteButton = document.getElementById("mute-btn");

  // Function to load an advertisement
  const loadAd = (index) => {
    const ad = ads[index];
    imageElement.src = ad.image;
    sourceElement.src = ad.video;
    videoElement.load(); // Reload video
    localStorage.setItem("lastAdIndex", index); // Save current ad index

    // Play video automatically after change
    videoElement.play().catch(error => {
      console.log("Autoplay blocked after ad change.");
    });
  };

  // Function to load the next advertisement when video ends
  const loadNextAd = () => {
    currentAdIndex = (currentAdIndex + 1) % ads.length; // Cycle through ads sequentially
    loadAd(currentAdIndex);
    enableSoundAndPlay(); // Ensure sound settings persist
  };

  // Ensure video plays with sound after first interaction
  const enableSoundAndPlay = () => {
    videoElement.muted = false;
    videoElement.volume = 1.0;
    videoElement.play().catch(error => {
      console.log("Autoplay with sound blocked. Waiting for user interaction...");
    });
  };

  // Autoplay only after first user interaction (click/tap)
  document.body.addEventListener("click", () => {
    enableSoundAndPlay();
  }, { once: true });

  // Automatically load the next ad when the video ends
  videoElement.addEventListener("ended", () => {
    loadNextAd(); // Move to the next ad in sequence
  });

  // Mute / Unmute button functionality
  muteButton.addEventListener("click", () => {
    videoElement.muted = !videoElement.muted;
    muteButton.textContent = videoElement.muted ? "🔇 Unmute" : "🔊 Mute";
  });

  videoElement.muted = true; // Start with sound muted
  muteButton.textContent = "🔇 Unmute"; // Button should indicate Unmute option

  // Load the next ad on page refresh
  loadAd(currentAdIndex);
});
