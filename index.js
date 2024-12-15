async function getData() {
    const response = await fetch("station.csv");
    const csvText = await response.text();
    const rows = csvText.split("\n").slice(1);
    const labels = [];
    const data = [];
    rows.forEach((elem) => {
        const row = elem.split(",");
        const year = row[0];
        const temp = parseFloat(row[1]);
        if (year && !isNaN(temp)) {
            labels.push(year);
            data.push(temp);
        }
    });
    return {labels, data};
}
async function createChart() {
    const ctx = document.getElementById("myChart");
    const {labels, data} = await getData();
    new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Edmonton Average Temperature",
                data,
                borderColor: "rgb(255, 0, 0)",
                borderWidth: 2,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            },
        }
    });
}
createChart();
