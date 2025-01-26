
document.getElementById("copy-button").addEventListener("click", function () {
    const codeBlock = document.getElementById("code-block").innerText;
    navigator.clipboard.writeText(codeBlock).then(
      () => {
        alert("Kod panoya kopyalandı!");
      },
      () => {
        alert("Kod kopyalanamadı.");
      }
    );
  });
  

const downloadBtn = document.getElementById('download-btn');
const enlargeBtn = document.getElementById('enlarge-btn');
const fullScreenView = document.getElementById('full-screen-view');
const closeBtn = document.getElementById('close-btn');

// Download functionality
downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = 'escape_velocity_formula.png'; // Ensure the image is in the same directory
  link.download = 'escape_velocity_formula.png';
  link.click();
});

// Enlarge functionality
enlargeBtn.addEventListener('click', () => {
  fullScreenView.style.display = 'flex';
});

// Close full-screen view
closeBtn.addEventListener('click', () => {
  fullScreenView.style.display = 'none';
});
