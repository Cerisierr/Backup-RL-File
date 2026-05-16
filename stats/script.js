async function loadCounter() {

    const response = await fetch(
        'https://api.countapi.xyz/get/backuprl/downloads'
    );

    const data = await response.json();

    document.getElementById(
        'downloadCounter'
    ).innerText =
        `Total downloads: ${data.value}`;
}

loadCounter();