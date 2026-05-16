async function loadStats() {

    try {

        const response = await fetch(
            "https://cerisier.goatcounter.com/api/v0/stats/hits",
            {
                headers: {
                    Authorization:
                        "Bearer 120a6j6i1q2eo10d1k1j06h768wru2u4ifaxnv179uhsj5fvww3"
                }
            }
        );

        const data = await response.json();

        let downloads = 0;
        let visitors = data.total ?? 0;

        data.hits.forEach(hit => {

            if (
                hit.event === true &&
                hit.path.startsWith("download-")
            ) {
                downloads += hit.count;
            }
        });

        document.getElementById("downloads").innerText =
            downloads;

        document.getElementById("visitors").innerText =
            visitors;

    } catch (error) {

        console.error(error);

        document.getElementById("downloads").innerText =
            "0";

        document.getElementById("visitors").innerText =
            "0";
    }
}

loadStats();