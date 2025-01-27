// Copy functionality
document.getElementById("copy-button").addEventListener("click", function () {
  const codeBlock = document.getElementById("code-block").innerText;

  // Copy to clipboard
  navigator.clipboard.writeText(codeBlock).then(
    () => {
      const copyButton = document.getElementById("copy-button");
      copyButton.innerText = "Kopiert";
      copyButton.style.color = "#00cc00";

      setTimeout(() => {
        copyButton.innerText = "Copy code";
        copyButton.style.color = "";
      }, 2000);
    },
    () => {
      alert("Kod kopyalanamadı.");
    }
  );
});

// Download functionality
const downloadBtn = document.getElementById("download-btn");
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = "escape_velocity_formula.png"; // Ensure the image file is in the same directory
  link.download = "escape_velocity_formula.png";
  link.click();
});

// Enlarge functionality
const enlargeBtn = document.getElementById("enlarge-btn");
const fullScreenView = document.getElementById("full-screen-view");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("close-btn");

// Open the full-screen view
enlargeBtn.addEventListener("click", () => {
  fullScreenView.style.display = "flex";
});

// Close the full-screen view by clicking the close button
closeBtn.addEventListener("click", () => {
  fullScreenView.style.display = "none";
});

// Close the full-screen view by clicking outside the image
overlay.addEventListener("click", () => {
  fullScreenView.style.display = "none";
});
