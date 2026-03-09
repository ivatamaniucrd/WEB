// Așteptăm ca tot HTML-ul să se încarce
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. State Management ---
    let resourcesData = [];
    let activeTag = null;
    let searchQuery = '';

    // --- 2. Selectarea elementelor DOM ---
    // Cerință: document.getElementById()
    const listContainer = document.getElementById('resources-list');
    const tagsContainer = document.getElementById('tags-container');
    const searchInput = document.getElementById('search-bar');
    const resetBtn = document.getElementById('reset-filters');
    const resultsTitle = document.getElementById('results-title');
    const resultsCount = document.getElementById('results-count');
    const themeToggle = document.getElementById('theme-toggle');

    // --- 3. Extragerea Datelor ---
    function fetchResources() {
        // Cerință: fetch()
        fetch('./data/resources.json')
            // Cerință: .then() / .catch()
            .then(response => {
                if (!response.ok) {
                    throw new Error('Eroare la rețea');
                }
                // Cerință: .json()
                return response.json(); 
            })
            .then(data => {
                resourcesData = data;
                initApp();
            })
            .catch(error => {
                // Cerință: .catch()
                listContainer.innerHTML = `<p style="color: red;">Eroare: ${error.message}</p>`;
            });
    }

    // --- 4. Inițializarea aplicației ---
    function initApp() {
        extractAndRenderTags();
        renderResources();
    }

    // --- 5. Randarea Cardurilor (Afișarea pe ecran) ---
    function renderResources() {
        listContainer.innerHTML = ''; // Curățăm lista existentă pentru a afișa noile rezultate

        // Cerință: filter()
        const filteredData = resourcesData.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  item.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = activeTag ? item.tags.includes(activeTag) : true;
            return matchesSearch && matchesTag;
        });

        // Actualizăm contoarele și titlurile din interfață
        resultsCount.textContent = filteredData.length;
        if (activeTag) {
            resultsTitle.textContent = `Rezultate pentru tag-ul "${activeTag}"`;
            resetBtn.style.display = 'inline-block';
        } else {
            resultsTitle.textContent = searchQuery ? `Rezultate căutare` : `Toate Resursele`;
            resetBtn.style.display = 'none';
        }

        // Dacă nu avem rezultate
        if (filteredData.length === 0) {
            listContainer.innerHTML = '<p>Nu s-a găsit nicio resursă conform filtrelor aplicate.</p>';
            return;
        }

        // Cerință: forEach()
        filteredData.forEach(item => {
            // Cerință: createElement()
            const li = document.createElement('li');
            li.className = 'card';
            
            // Cerință: map() - transformăm array-ul de stringuri în elemente HTML
            const tagsHTML = item.tags.map(t => `<span class="tag">${t}</span>`).join('');
            
            li.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Tip:</strong> ${item.type}</p>
                <p><strong>Locație:</strong> ${item.location}</p>
                <p><strong>Program L-V:</strong> ${item.program.luni_vineri}</p>
                <p><strong>Program Weekend:</strong> ${item.program.weekend}</p>
                <div class="card-tags">${tagsHTML}</div>
            `;
            
            // Cerință: appendChild()
            listContainer.appendChild(li);
        });
    }

    // --- 6. Generarea Tag-urilor Interactive ---
    function extractAndRenderTags() {
        // Cerință: flatMap() + new Set()
        // flatMap extrage toate tag-urile din toate obiectele într-un singur array plat
        // new Set() elimină duplicatele
        const allTags = [...new Set(resourcesData.flatMap(item => item.tags))];
        
        // Cerință: forEach()
        allTags.forEach(tag => {
            // Cerință: createElement()
            const span = document.createElement('span'); 
            span.className = 'tag';
            span.textContent = tag;
            
            // Cerință: addEventListener()
            span.addEventListener('click', () => {
                // Dacă dăm click pe același tag, îl deselectăm, altfel îl setăm ca activ
                activeTag = activeTag === tag ? null : tag;
                
                // Actualizăm clasele vizuale (adăugăm/scoatem clasa 'active')
                document.querySelectorAll('#tags-container .tag').forEach(el => el.classList.remove('active'));
                if (activeTag) span.classList.add('active');
                
                // Re-randăm cardurile cu noul filtru aplicat
                renderResources();
            });
            
            // Cerință: appendChild()
            tagsContainer.appendChild(span); 
        });
    }

    // --- 7. Evenimente Ascultători (Event Listeners pentru restul aplicației) ---
    
    // Cerință: addEventListener() pentru bara de căutare
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderResources();
    });

    // Cerință: addEventListener() pentru butonul de resetare
    resetBtn.addEventListener('click', () => {
        activeTag = null;
        searchQuery = '';
        searchInput.value = ''; // Golim și input-ul de text
        document.querySelectorAll('#tags-container .tag').forEach(el => el.classList.remove('active'));
        renderResources();
    });

    // Cerință: addEventListener() pentru schimbarea temei (Dark/Light mode)
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️ Light Mode';
        } else {
            themeToggle.textContent = '🌙 Dark Mode';
        }
    });

    // --- 8. Pornirea aplicației ---
    fetchResources();
});