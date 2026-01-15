/* PROJECT DATA 
  Categories: 'layout' (HTML/CSS) or 'js' (JavaScript)
  Tags: Array of strings matching: 'html', 'css', 'js'
*/
const projects = [
    {
        id: 1,
        title: "Stats Card Component",
        description: "A responsive stats card made using Flexbox.",
        image: "./stats-preview-card/preview.jpg",
        tags: ["html", "css"],
        category: "layout",
        links: {
            view: "./stats-preview-card/index.html",
            code: "https://github.com/builtbykabir/frontend-layouts/tree/main/stats-preview-card"
        }
    },
    {
        id: 2,
        title: "Product Card Component",
        description: "A responsive product card made using Flexbox.",
        image: "./product-preview-card/preview.jpg",
        tags: ["html", "css"],
        category: "layout",
        links: {
            view: "./product-preview-card/index.html",
            code: "https://github.com/builtbykabir/frontend-layouts/tree/main/product-preview-card"
        }
    },
    {
        id: 3,
        title: "Price Grid Component",
        description: "A price grid component.",
        image: "./price-grid-component/preview.jpg",
        tags: ["html", "css"],
        category: "layout",
        links: {
            view: "./price-grid-component/index.html",
            code: "https://github.com/builtbykabir/frontend-layouts/tree/main/price-grid-component"
        }
    }
];

// Select DOM Elements
const gridContainer = document.getElementById('gallery-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const noResultsMsg = document.getElementById('no-results');

// 1. Function to generate HTML for a single card
function createCardHTML(project) {
    // Generate tag spans dynamically
    const tagsHTML = project.tags.map(tag => 
        `<span class="tag ${tag}">${tag.toUpperCase()}</span>`
    ).join('');

    return `
        <article class="card" data-category="${project.category}">
            <div class="card-image-wrapper">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="card-content">
                <div class="tags-container">
                    ${tagsHTML}
                </div>
                <h3 class="card-title">${project.title}</h3>
                <p class="card-desc">${project.description}</p>
                <div class="card-actions">
                    <a href="${project.links.view}" class="btn btn-view" target="_blank">View Layout</a>
                    <a href="${project.links.code}" class="btn btn-code" target="_blank">Source Code</a>
                </div>
            </div>
        </article>
    `;
}

// 2. Function to Render Projects
function renderProjects(filter = 'all') {
    // Clear current grid
    gridContainer.innerHTML = '';
    
    // Filter logic
    const filteredProjects = projects.filter(project => {
        if (filter === 'all') return true;
        return project.category === filter;
    });

    // Handle empty state
    if (filteredProjects.length === 0) {
        noResultsMsg.classList.remove('hidden');
    } else {
        noResultsMsg.classList.add('hidden');
        // Add cards to DOM
        filteredProjects.forEach(project => {
            gridContainer.innerHTML += createCardHTML(project);
        });
    }
}

// 3. Event Listeners for Filters
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value and render
        const filterValue = button.getAttribute('data-filter');
        renderProjects(filterValue);
    });
});

// Initial Render on Page Load
document.addEventListener('DOMContentLoaded', () => {
    renderProjects('all');
});