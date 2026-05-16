async function loadStats() {

    try {

        const response = await fetch(
            "https://cerisier.goatcounter.com/api/v0/stats/total",
            {
                headers: {
                    Authorization: "Bearer 120a6j6i1q2eo10d1k1j06h768wru2u4ifaxnv179uhsj5fvww3"
                }
            }
        );

        const data = await response.json();

        // Visiteurs uniques
        document.getElementById("visitors").innerText =
            data.visitors || 0;

        // Pages vues
        document.getElementById("downloads").innerText =
            data.hits || 0;

    } catch (error) {

        console.error(error);

        document.getElementById("visitors").innerText =
            "Error";

        document.getElementById("downloads").innerText =
            "Error";
    }
}

loadStats();