document.querySelector('button').onclick = paint;
var graph = new Chart(ctx1, {
  type: 'scatter',
  data: {
    labels: graphData,
    datasets: [{
      label: 'Фигура Лиссажу',
      data: yData,
      pointStyle: false
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});
 

function paint() {
    const A = parseFloat(document.querySelector('.A').value);
    const B = parseFloat(document.querySelector('.B').value);
    const wa = parseFloat(document.querySelector('.wa').value);
    const wb = parseFloat(document.querySelector('.wb').value);
    const phi = parseFloat(document.querySelector('.phi').value);

    if (A <= 0 || B <= 0) {
      alert("Амплитуда должна быть больше 0!");
      return
    }
    if (wa <= 0 || wb <= 0){
      alert("Частота должно быть больше 0!");
      return
    }

    const graphData = [];
    for (let t = 0.0; t < Math.PI * 4; t += 0.001) {
        const x = A * Math.sin(wa * t + phi);
        const y = B * Math.sin(wb * t);
        graphData.push({x, y})
    }

    // Строим графики
    const ctx1 = document.getElementById('myChart').getContext("2d");

    let chartStatus1 = Chart.getChart("myChart");
    if (chartStatus1 != undefined) {
      chartStatus1.destroy();
    }

    graph = new Chart(ctx1, {
      type: 'scatter',
      data: {
          datasets: [{
              label: 'Фигура Лиссажу',
              data: graphData,
              backgroundColor: 'red'
          }]
      },
      options: {
          scales: {
              x: {
                  type: 'linear',
                  position: 'bottom'
              },
              y: {
                  type: 'linear',
                  position: 'left'
              }
          }
      }
  });
}