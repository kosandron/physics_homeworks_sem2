document.querySelector('button').onclick = paint;
var n = 0
var graphq = new Chart(ctx1, {
  type: 'line',
  data: {
    labels: xData,
    datasets: [{
      label: 'График зависимости q(t)',
      data: qData,
      pointStyle: false
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false,
        title: {
            display: true,
            text: 'q, Кл'
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
  var graphI = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: xData,
      datasets: [{
        label: 'График зависимости I(t)',
        data: IData,
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
  var graphU = new Chart(ctx3, {
    type: 'line',
    data: {
      labels: xData,
      datasets: [{
        label: 'График зависимости U(t)',
        data: UData,
        pointStyle: false
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          title: {
              display: true,
              text: 'U, В'
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

function paint() {
    let q0 = document.querySelector('.q0').value;
    let C = document.querySelector('.C').value;
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
    if (C <= 0){
      alert("Емкость конденсатора должна быть больше 0!");
      return
    }

    let xData = [];
    let qData = [];
    let IData = [];
    let UData = [];
    let w0 = 1 / Math.sqrt(L * C);
    let beta = R / (2 * L);
    let w = Math.sqrt(w0 * w0 - beta * beta);

    for (let t = 0.0; t < 10 * L / R; t += 0.01 * L / R) {        
        let q = q0 * Math.exp(-beta * t) * Math.cos(w * t);
        let I = -q0 * Math.exp(-beta * t) * (beta * Math.cos(w * t) + w * Math.sin(w * t));
        let U = q / C;
        xData.push(t);
        qData.push(q);
        IData.push(I);
        UData.push(U);
    }

    // Строим графики
    const ctx1 = document.getElementById('myChart').getContext("2d");
    const ctx2 = document.getElementById('myChart2').getContext("2d");
    const ctx3 = document.getElementById('myChart3').getContext("2d");

    let chartStatus1 = Chart.getChart("myChart");
    if (chartStatus1 != undefined) {
      chartStatus1.destroy();
    }

    graphq = new Chart(ctx1, {
          type: 'line',
          data: {
            labels: xData,
            datasets: [{
              label: 'График зависимости q(t)',
              data: qData,
              pointStyle: false
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'q, Кл'
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
                  label: 'График зависимости I(t)',
                  data: IData,
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

        let chartStatus3 = Chart.getChart("myChart3");
        if (chartStatus3 != undefined) {
          chartStatus3.destroy();
        }

            graphU = new Chart(ctx3, {
              type: 'line',
              data: {
                labels: xData,
                datasets: [{
                  label: 'График зависимости U(t)',
                  data: UData,
                  pointStyle: false
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'U, В'
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