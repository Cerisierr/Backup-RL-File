let allFiles = [];
let filteredFiles = [];

let currentPage = 1;

const filesPerPage = 100;

const urlParams =
    new URLSearchParams(window.location.search);

const presetSearch =
    urlParams.get('search');

function normalize(text) {

    return text
        .toLowerCase()
        .replace(/[_-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

const searchInput =
    document.getElementById('search');

const filterInput =
    document.getElementById('filter');

if (presetSearch) {

    searchInput.value = presetSearch;
}

fetch('items.json')
    .then(response => response.json())
    .then(data => {

        allFiles = [...new Map(
            data.map(file => [file.name, file])
        ).values()];

        applyFilters();
    });

searchInput.addEventListener(
    'input',
    applyFilters
);

filterInput.addEventListener(
    'change',
    applyFilters
);

function applyFilters() {

    const searchValue =
        normalize(searchInput.value);

    const filterValue =
        filterInput.value;

    filteredFiles = allFiles.filter(file => {

        const matchesSearch =
            normalize(file.name)
                .includes(searchValue);

        const matchesFilter =
            filterValue === 'all' ||
            file.category === filterValue;

        return matchesSearch &&
               matchesFilter;
    });

    currentPage = 1;

    displayFiles();
}

function displayFiles() {

    const container =
        document.getElementById('files');

    container.innerHTML = '';

    const start =
        (currentPage - 1) * filesPerPage;

    const end =
        start + filesPerPage;

    const filesToShow =
        filteredFiles.slice(start, end);

    filesToShow.forEach(file => {

        const url =
            `./files/${file.name}`;

        const div =
            document.createElement('div');

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

    document.getElementById(
        'resultCount'
    ).innerText =
        `${filteredFiles.length} files found`;

    displayPagination();
}

function displayPagination() {

    let pagination =
        document.getElementById(
            'pagination'
        );

    if (!pagination) {

        pagination =
            document.createElement('div');

        pagination.id = 'pagination';

        document.querySelector('.container')
            .appendChild(pagination);
    }

    pagination.innerHTML = '';

    const totalPages =
        Math.ceil(
            filteredFiles.length /
            filesPerPage
        );

    if (totalPages <= 0) {

        pagination.innerHTML =
            'Page 0 / 0';

        return;
    }

    if (currentPage > 1) {

        const prev =
            document.createElement('button');

        prev.innerText =
            '← Previous';

        prev.onclick = () => {

            currentPage--;

            displayFiles();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        pagination.appendChild(prev);
    }

    const info =
        document.createElement('span');

    info.innerText =
        ` Page ${currentPage} / ${totalPages} `;

    pagination.appendChild(info);

    if (currentPage < totalPages) {

        const next =
            document.createElement('button');

        next.innerText =
            'Next →';

        next.onclick = () => {

            currentPage++;

            displayFiles();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        pagination.appendChild(next);
    }
}
