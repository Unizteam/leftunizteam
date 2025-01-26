document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input'); // Search input field
    const articleContainer = document.querySelector('.article-container'); // Container for articles
    const loadMoreButton = document.getElementById('load-more-button'); // "Mehr Laden" button
    const articlesPerPage = 10; // Number of articles per page
    let currentPage = 1; // Tracks the current page

    // Get all articles
    const allArticles = Array.from(document.querySelectorAll('.article-card'));

    // Function to render articles based on the current page
    function renderArticles() {
        const startIndex = (currentPage - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;

        // Show only the articles for the current page
        allArticles.forEach((article, index) => {
            if (index >= startIndex && index < endIndex) {
                article.style.display = 'flex'; // Show article
            } else {
                article.style.display = 'none'; // Hide article
            }
        });

        // Hide the "Mehr Laden" button if all articles are shown
        if (endIndex >= allArticles.length) {
            loadMoreButton.style.display = 'none';
        } else {
            loadMoreButton.style.display = 'block';
        }
    }

    // Event listener for the "Mehr Laden" button
    loadMoreButton.addEventListener('click', function () {
        currentPage++; // Increase the current page
        renderArticles(); // Re-render articles
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
    });

    // Event listener for the search input
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase().trim(); // Get the input value in lowercase
        let resultsFound = 0; // Counter for matched articles

        // Loop through all articles and toggle visibility based on the search query
        allArticles.forEach((article) => {
            const title = article.querySelector('.article-title')?.textContent.toLowerCase() || "";
            const description = article.querySelector('.article-description')?.textContent.toLowerCase() || "";

            // Check if the query matches the title or description
            if (title.includes(query) || description.includes(query)) {
                article.style.display = 'flex'; // Show matching article
                resultsFound++;
            } else {
                article.style.display = 'none'; // Hide non-matching article
            }
        });

        // Hide the "Mehr Laden" button during search
        loadMoreButton.style.display = query ? 'none' : 'block';
    });

    // Optional: Add a "Back to Previous" button for navigation
    const backButton = document.createElement('button');
    backButton.textContent = "Zurück";
    backButton.classList.add('load-more');
    backButton.style.display = 'none'; // Initially hidden
    articleContainer.insertAdjacentElement('afterend', backButton);

    // Event listener for the "Back to Previous" button
    backButton.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--; // Decrease the current page
            renderArticles(); // Re-render articles
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
        }
    });

    // Update visibility of "Back to Previous" button based on the current page
    function updateBackButtonVisibility() {
        backButton.style.display = currentPage > 1 ? 'block' : 'none';
    }

    // Update visibility of buttons after rendering articles
    function updateButtons() {
        updateBackButtonVisibility();
    }

    // Render initial articles and update button states
    renderArticles();
    updateButtons();
});
// Function to truncate description text to 15 words
document.addEventListener('DOMContentLoaded', () => {
    const descriptions = document.querySelectorAll('.article-description'); // Select all descriptions

    descriptions.forEach((description) => {
        const text = description.textContent.trim(); // Get the full text
        const words = text.split(' '); // Split the text into words

        if (words.length > 15) {
            description.textContent = words.slice(0, 15).join(' ') + '...'; // Join the first 15 words and append "..."
        }
    });
});
