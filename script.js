let allFiles = [];
let filteredFiles = [];

let currentPage = 1;
const filesPerPage = 100;

fetch('items.json')
    .then(response => response.json())
    .then(data => {

        // retire les doublons
        allFiles = [...new Map(
            data.map(file => [file.name, file])
        ).values()];

        filteredFiles = allFiles;

        displayFiles();
    });

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {

    const value = searchInput.value.toLowerCase();

    filteredFiles = allFiles.filter(file =>
        file.name.toLowerCase().includes(value)
    );

    currentPage = 1;

    displayFiles();
});

function displayFiles() {

    const container = document.getElementById('files');

    container.innerHTML = '';

    const start = (currentPage - 1) * filesPerPage;
    const end = start + filesPerPage;

    const filesToShow = filteredFiles.slice(start, end);

    filesToShow.forEach(file => {

        const url = `./files/${file.name}`;

        const div = document.createElement('div');

        div.className = 'file';

        div.innerHTML = `
            <div>
                <strong>${file.name}</strong><br>
                <small>${file.category || 'Unknown'}</small>
            </div>

            <a class="download"
               href="${url}"
               target="_blank">
                Download
            </a>
        `;

        container.appendChild(div);
    });

    displayPagination();
}

function displayPagination() {

    let pagination = document.getElementById('pagination');

    if (!pagination) {

        pagination = document.createElement('div');

        pagination.id = 'pagination';

        document.querySelector('.container')
            .appendChild(pagination);
    }

    pagination.innerHTML = '';

    const totalPages =
        Math.ceil(filteredFiles.length / filesPerPage);

    if (currentPage > 1) {

        const prev = document.createElement('button');

        prev.innerText = '← Previous';

        prev.onclick = () => {

            currentPage--;

            displayFiles();

            window.scrollTo(0, 0);
        };

        pagination.appendChild(prev);
    }

    const info = document.createElement('span');

    info.innerText =
        ` Page ${currentPage} / ${totalPages} `;

    pagination.appendChild(info);

    if (currentPage < totalPages) {

        const next = document.createElement('button');

        next.innerText = 'Next →';

        next.onclick = () => {

            currentPage++;

            displayFiles();

            window.scrollTo(0, 0);
        };

        pagination.appendChild(next);
    }
}