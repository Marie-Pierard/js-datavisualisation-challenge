(() => {
  
  const dataPoints = [];
  let chart = null;

  function remoteData() {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    const title = document.getElementById("firstHeading");
    title.after(canvas);


    loadGraph(ctx);
  }

  const loadGraph = (ctx) => {
    const labels = [];
    fetch('https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json')
      .then(response => response.json())
      .then(data => {
        data.forEach(e => {
          labels.push(e[0]);
          dataPoints.push({ y: parseInt(e[1]) });
        });
        chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: ['Crime statistics'],
              data: dataPoints
            }]
          },
          options: {
            animation: {
              duration: 0
            },
            maintainAspectRatio: false,
            responsive: false
          }
        });
        updateChart(ctx);
      });
  }

  const updateChart = (ctx) => {
    fetch("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json")
      .then(response => response.json())
      .then(data => {
        data.forEach(e => {
          chart.data.labels.push(e[0]);
          chart.data.datasets.forEach((dataset) => {
            dataset.data.push({ y: parseInt(e[1]) });
          });
        });
        chart.update();

        setTimeout(function () { updateChart(ctx) }, 1000);
      });
  }
  remoteData();
  

})()