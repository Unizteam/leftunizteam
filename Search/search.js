document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const articleContainer = document.querySelector('.article-container'); 
    const loadMoreButton = document.getElementById('load-more-button'); 
    const articlesPerPage = 10; 
    let currentPage = 1; 

   
    const allArticles = Array.from(document.querySelectorAll('.article-card'));

    
    function renderArticles() {
        const startIndex = (currentPage - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;

      
        allArticles.forEach((article, index) => {
            if (index >= startIndex && index < endIndex) {
                article.style.display = 'flex'; 
            } else {
                article.style.display = 'none'; 
            }
        });

        if (endIndex >= allArticles.length) {
            loadMoreButton.style.display = 'none';
        } else {
            loadMoreButton.style.display = 'block';
        }
    }

   
    loadMoreButton.addEventListener('click', function () {
        currentPage++; 
        renderArticles(); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    });


    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase().trim();
        let resultsFound = 0;

       
        allArticles.forEach((article) => {
            const title = article.querySelector('.article-title')?.textContent.toLowerCase() || "";
            const description = article.querySelector('.article-description')?.textContent.toLowerCase() || "";

           
            if (title.includes(query) || description.includes(query)) {
                article.style.display = 'flex'; 
                resultsFound++;
            } else {
                article.style.display = 'none'; 
            }
        });

        loadMoreButton.style.display = query ? 'none' : 'block';
    });

    const backButton = document.createElement('button');
    backButton.textContent = "Zurück";
    backButton.classList.add('load-more');
    backButton.style.display = 'none'; 
    articleContainer.insertAdjacentElement('afterend', backButton);

    backButton.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--; 
            renderArticles();
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }
    });

    function updateBackButtonVisibility() {
        backButton.style.display = currentPage > 1 ? 'block' : 'none';
    }

    function updateButtons() {
        updateBackButtonVisibility();
    }

    renderArticles();
    updateButtons();
});

document.addEventListener('DOMContentLoaded', () => {
    const descriptions = document.querySelectorAll('.article-description'); 
    descriptions.forEach((description) => {
        const text = description.textContent.trim(); 
        const words = text.split(' ');

        if (words.length > 15) {
            description.textContent = words.slice(0, 15).join(' ') + '...'; 
        }
    });
});
