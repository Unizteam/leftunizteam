// Pagination Logic
const contentsPerPage = 20; // Number of contents per page
let currentPage = 1; // Default to the first page

// Select all content cards from the HTML
const allContents = Array.from(document.querySelectorAll('.topic-cards .card'));

// Function to Render Contents for the Current Page
function renderContents() {
  const startIndex = (currentPage - 1) * contentsPerPage;
  const endIndex = startIndex + contentsPerPage;

  // Show only the contents for the current page
  allContents.forEach((content, index) => {
    if (index >= startIndex && index < endIndex) {
      content.style.display = 'block'; // Show content
    } else {
      content.style.display = 'none'; // Hide content
    }
  });

  updatePaginationControls();
}

// Function to Update Pagination Controls
function updatePaginationControls() {
  const totalPages = Math.ceil(allContents.length / contentsPerPage);
  const paginationContainer = document.querySelector('.pagination');

  paginationContainer.innerHTML = `
    <button id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button id="nextPage" ${
      currentPage === totalPages ? 'disabled' : ''
    }>Next</button>
  `;

  // Add event listeners for pagination buttons
  document.getElementById('prevPage').addEventListener('click', () => {
    currentPage--;
    renderContents();
    window.scrollTo(0, 0); // Scroll to the top of the page
  });

  document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    renderContents();
    window.scrollTo(0, 0); // Scroll to the top of the page
  });
}

// Add header animation on page load
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header-container");
  if (header) {
    header.style.animation = "fadeInUp 1s ease-out forwards";
  }
});

// Initialize the Page
renderContents();
