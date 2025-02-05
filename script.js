const contentsPerPage = 20; 
let currentPage = 1; 

const allContents = Array.from(document.querySelectorAll('.topic-cards .card'));

const urlParams = new URLSearchParams(window.location.search);
currentPage = parseInt(urlParams.get('page')) || 1;

function renderContents() {
  const startIndex = (currentPage - 1) * contentsPerPage;
  const endIndex = startIndex + contentsPerPage;

  allContents.forEach((content, index) => {
    if (index >= startIndex && index < endIndex) {
      content.style.display = 'block'; 
    } else {
      content.style.display = 'none'; 
    }
  });

  updatePaginationControls();
}

function updatePaginationControls() {
  const totalPages = Math.ceil(allContents.length / contentsPerPage);
  const paginationContainer = document.querySelector('.pagination');

  paginationContainer.innerHTML = `
    <button id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
  `;

  window.history.replaceState(null, '', `?page=${currentPage}`);

  document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderContents();
      window.scrollTo(0, 0); 
    }
  });

  document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderContents();
      window.scrollTo(0, 0); 
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header-container");
  if (header) {
    header.style.animation = "fadeInUp 1s ease-out forwards";
  }

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

window.addEventListener('popstate', () => {
  const urlParams = new URLSearchParams(window.location.search);
  currentPage = parseInt(urlParams.get('page')) || 1;
  renderContents();
  window.scrollTo({ top: 0, behavior: 'smooth' }); 
});

renderContents();
