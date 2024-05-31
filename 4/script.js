document.querySelector('button').onclick = paint;
var n = 0
var graphE = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xData,
      datasets: [{
        label: 'График зависимости ЭДС в зависимости от времени',
        data: yData,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  var graphI = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xData,
      datasets: [{
        label: 'График зависимости индукционного тока в зависимости от времени',
        data: yData,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });



function paint() {
    console.log('work')
    // let N = document.querySelector('.N').value;
    let N = 1
    let B = document.querySelector('.B').value;
    // let A = document.querySelector('.A').value;
    let A = 1
    let w = document.querySelector('.w').value;
    let R = document.querySelector('.R').value;

    if (w <= 0) {
      alert("Частота вращения должна быть больше 0!");
      return
    }
    if (R <= 0){
      alert("Сопротивление контура должно быть больше 0!");
      return
    }

    let xData = [];
    let yDatae = [];
    let yDataI = [];
    for (let t = 0.0; t < 20 / w; t += 0.01 / w) {
        let e = N * B * w * A * Math.sin(w * t);
        let I = e / R;
        xData.push(t.toFixed((String(w).length) + 1));
        yDatae.push(e);
        yDataI.push(I);
    }

    const ctx1 = document.getElementById('myChart').getContext("2d");
    const ctx2 = document.getElementById('myChart2').getContext("2d");

    let chartStatus1 = Chart.getChart("myChart");
    if (chartStatus1 != undefined) {
      chartStatus1.destroy();
    }

    graphE = new Chart(ctx1, {
          type: 'line',
          data: {
            labels: xData,
            datasets: [{
              label: 'График зависимости ЭДС в зависимости от времени',
              data: yDatae,
              pointStyle: false
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'ε, В'
                  }
              },
            x: {
                title: {
                    display: true,
                    text: 't, с'
                  }
            }
            }
          }
        });

        let chartStatus2 = Chart.getChart("myChart2");
        if (chartStatus2 != undefined) {
          chartStatus2.destroy();
        }
    
        graphI = new Chart(ctx2, {
              type: 'line',
              data: {
                labels: xData,
                datasets: [{
                  label: 'График зависимости индукционного тока в зависимости от времени',
                  data: yDataI,
                  pointStyle: false
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'I, А'
                      }
                  },
                x: {
                    title: {
                        display: true,
                        text: 't, с'
                      }
                }
                }
              }
            });
}