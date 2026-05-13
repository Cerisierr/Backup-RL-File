let allFiles = [];

fetch('items.json')
    .then(response => response.json())
    .then(data => {

        allFiles = data;

        displayFiles(allFiles.slice(0, 100));
    });

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {

    const value = searchInput.value.toLowerCase();

    const filtered = allFiles.filter(file =>

        file.name.toLowerCase().includes(value) ||

        file.category.toLowerCase().includes(value) ||

        file.product.toLowerCase().includes(value)
    );

    displayFiles(filtered.slice(0, 100), filtered.length);
});

function displayFiles(files, totalResults = files.length) {

    const container = document.getElementById('files');

    container.innerHTML = '';

    const resultCount = document.getElementById('resultCount');

    if (resultCount) {

        resultCount.innerText =
            `${totalResults} results found • Showing first ${files.length}`;
    }

    files.forEach(file => {

        const url = `./files/${file.name}`;

        const div = document.createElement('div');

        div.className = 'file';

        div.innerHTML = `
            <div>
                <strong>${file.name}</strong><br>
                <small>${file.category}</small>
            </div>

            <a class="download" href="${url}" target="_blank">
                Download
            </a>
        `;

        container.appendChild(div);
    });
}