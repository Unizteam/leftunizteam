document.addEventListener("DOMContentLoaded", () => {
  // Handle enlarge functionality for all charts
  const enlargeButtons = document.querySelectorAll(".enlarge-btn");
  enlargeButtons.forEach((button) => {
    const chartContainer = button.closest(".chart-container");
    const fullScreenView = chartContainer.querySelector(".full-screen");
    const overlay = fullScreenView.querySelector(".overlay");
    const closeBtn = fullScreenView.querySelector(".close-button");

    // Open full-screen view
    button.addEventListener("click", () => {
      fullScreenView.style.display = "flex";
    });

    // Close full-screen view by clicking the close button
    closeBtn.addEventListener("click", () => {
      fullScreenView.style.display = "none";
    });

    // Close full-screen view by clicking outside the image
    overlay.addEventListener("click", () => {
      fullScreenView.style.display = "none";
    });
  });

  // Handle copy functionality for all code blocks
  const copyButtons = document.querySelectorAll(".copy-button");
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const codeBlock = button.closest(".code-block").querySelector(".code-block-content").innerText;

      // Copy to clipboard
      navigator.clipboard.writeText(codeBlock).then(
        () => {
          button.innerText = "Kopiert";
          button.style.color = "#00cc00"; // Change color to green for success feedback

          // Revert back to "Copy code" after 2 seconds
          setTimeout(() => {
            button.innerText = "Copy code";
            button.style.color = ""; // Reset the color
          }, 2000);
        },
        () => {
          alert("Kod kopyalanamadı.");
        }
      );
    });
  });
});
