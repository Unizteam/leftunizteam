const contentsPerPage = 20; // Number of contents per page
let currentPage = 1; // Default to the first page

// Select all content cards from the HTML
const allContents = Array.from(document.querySelectorAll('.topic-cards .card'));

// Initialize the Page from URL or Default to Page 1
const urlParams = new URLSearchParams(window.location.search);
currentPage = parseInt(urlParams.get('page')) || 1;

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
    <button id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
  `;

  // Update URL with current page (without reloading)
  window.history.replaceState(null, '', `?page=${currentPage}`);

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

// Add Header Animation on Page Load
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header-container");
  if (header) {
    header.style.animation = "fadeInUp 1s ease-out forwards";
  }

  // Add event listeners for mobile header
  const menuIcon = document.querySelector('.fa-bars');
  const searchIcon = document.querySelector('.fa-search');

  if (menuIcon) {
    menuIcon.addEventListener('click', () => {
      alert('Menu button clicked! Add your menu functionality here.');
    });
  }

  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      alert('Search button clicked! Add your search functionality here.');
    });
  }
});

// Handle Back Navigation (Browser's Back Button)
window.addEventListener('popstate', () => {
  const urlParams = new URLSearchParams(window.location.search);
  currentPage = parseInt(urlParams.get('page')) || 1;
  renderContents();
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
});

// Initialize the Page
renderContents();
