document.querySelector('button').onclick = paint;
var n = 0
var graphE = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: xData,
      datasets: [{
        label: 'График зависимости I(t) при замыкании цепи',
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
  var graphI = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: xData,
      datasets: [{
        label: 'График зависимости I(t) при размыкании цепи',
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
    let e = document.querySelector('.e').value;
    let L = document.querySelector('.L').value;
    let R = document.querySelector('.R').value;

    if (L <= 0) {
      alert("индуктивность должна быть больше 0!");
      return
    }
    if (R <= 0){
      alert("Сопротивление должно быть больше 0!");
      return
    }

    let xData = [];
    let yDataIMaking = [];
    let yDataIBreaking = [];
    let I0 = e / R;
    let theta = L / R;
    console.log(I0)
    for (let t = 0.0; t < 10 * L / R; t += 0.01 * L / R) {        
        let iBreaking = I0 * Math.pow(Math.E, -R * t / L);
        let iMaking = I0 * (1 - Math.pow(Math.E, -t / theta));
        xData.push(t);
        yDataIMaking.push(iMaking);
        yDataIBreaking.push(iBreaking);
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
              label: 'График зависимости I(t) при замыкании цепи',
              data: yDataIMaking,
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

        let chartStatus2 = Chart.getChart("myChart2");
        if (chartStatus2 != undefined) {
          chartStatus2.destroy();
        }
    
        graphI = new Chart(ctx2, {
              type: 'line',
              data: {
                labels: xData,
                datasets: [{
                  label: 'График зависимости I(t) при размыкании цепи',
                  data: yDataIBreaking,
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