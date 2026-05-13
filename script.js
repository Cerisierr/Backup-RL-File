let allFiles = [];

fetch('items.json')
    .then(response => response.json())
    .then(data => {
        allFiles = data;
        displayFiles(allFiles);
    });

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();

    const filtered = allFiles.filter(file =>
        file.name.toLowerCase().includes(value)
    );

    displayFiles(filtered);
});

function displayFiles(files) {
    const container = document.getElementById('files');

    container.innerHTML = '';

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