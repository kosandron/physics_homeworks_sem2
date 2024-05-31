document.querySelector('button').onclick = paint;
var graphN = new Chart(ctx1, {
  type: 'line',
  data: {
    labels: tt,
    datasets: [{
      label: 'Несущий сигнал',
      data: graphSignalN,
      pointStyle: false
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false,
        title: {
            display: true,
            text: 'Амплитуда, В'
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
    labels: tt,
    datasets: [{
      label: 'Информационный сигнал',
      data: graphSignalI,
      pointStyle: false
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false,
        title: {
            display: true,
            text: 'Амплитуда, В'
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

var graphM = new Chart(ctx3, {
  type: 'line',
  data: {
    labels: tt,
    datasets: [{
      label: 'Амплитудно-модулируемый сигнал',
      data: graphSignalM,
      pointStyle: false
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false,
        title: {
            display: true,
            text: 'Амплитуда, В'
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

var graphSpectreN = new Chart(ctx4, {
  type: 'line',
  data: {
    labels: freqN,
    datasets: [{
      label: 'График спектра несущего сигнала',
      data: graphSpectreN,
      pointStyle: false
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false,
        title: {
            display: true,
            text: 'Амплитуда, В'
          }
      },
    x: {
        title: {
            display: true,
            text: 'Частота, Гц'
          }
    }
    }
  }
});

var graphSpectreI = new Chart(ctx5, {
  type: 'line',
  data: {
    labels: freqI,
    datasets: [{
      label: 'График спектра информационного сигнала',
      data: graphSpectreI,
      pointStyle: false
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false,
        title: {
            display: true,
            text: 'Амплитуда, В'
          }
      },
    x: {
        title: {
            display: true,
            text: 'Частота, Гц'
          }
    }
    }
  }
});

var graphSpectreM = new Chart(ctx6, {
  type: 'line',
  data: {
    labels: freqM,
    datasets: [{
      label: 'График спектра амплитудно-модулируемого сигнала',
      data: graphSpectreM,
      pointStyle: false
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false,
        title: {
            display: true,
            text: 'Амплитуда, В'
          }
      },
    x: {
        title: {
            display: true,
            text: 'Частота, Гц'
          }
    }
    }
  }
});
 

function paint() {
    const nA = parseFloat(document.querySelector('.nA').value);
    const iA = parseFloat(document.querySelector('.iA').value);
    const wn = parseFloat(document.querySelector('.wn').value);
    const wi = parseFloat(document.querySelector('.wi').value);
    const k = parseFloat(document.querySelector('.k').value);

    if (nA <= 0 || iA <= 0) {
      alert("Амплитуда должна быть больше 0!");
      return
    }
    if (wn <= 0 || wi <= 0){
      alert("Частота должно быть больше 0!");
      return
    }
    if (k <= 0 || k > 1){
      alert("Коэффициент модуляции должен быть в полуотрезке (0; 1]!");
      return
    }

    

    let graphSignalN = [];
    let graphSignalI = [];
    let graphSignalM = [];
    let tt = [];
    for (let t = 0.0; t < 1; t += 0.001) {
        const yN = nA * Math.cos(2 * Math.PI * wn * t);
        const yI = iA * Math.cos(2 * Math.PI * wi * t);
        const yM = yN * (1 + k * yI / iA);
        
        tt.push(t);
        graphSignalN.push(yN);
        graphSignalI.push(yI);
        graphSignalM.push(yM);
    }

    // Делаем данные для спектров
    let graphSpectreN = [];
    let freqN = [];
    let flagZero = true;
    let flagMinusFreq = true;
    let flagPlusFreq = true;
    for (let freq = -wn - 10; freq < wn + 10; freq += 0.01) {
      if (freq != 0 && Math.abs(freq) != wn) {
        graphSpectreN.push(0);
        freqN.push(freq)
      }
       
      if (freq + 0.01 >= 0 && flagZero) { // нужно потому, что сравнивать double значения сложно, а вставить значения в конец массива после цикла - ломает график
        flagZero = false;
        graphSpectreN.push(nA);
        freqN.push(0);
      }
      if (freq + 0.01 >= -wn && flagMinusFreq) {
        flagMinusFreq = false;
        graphSpectreN.push(nA / 2);
        freqN.push(-wn);
      }
      if (freq + 0.01 >= wn && flagPlusFreq) {
        flagPlusFreq = false;
        graphSpectreN.push(nA / 2);
        freqN.push(wn);
      }
    }

    let graphSpectreI = [];
    let freqI = [];
    flagZero = true;
    flagMinusFreq = true;
    flagPlusFreq = true;
    for (let freq = -wi - 10; freq < wi + 10; freq += 0.01) {
      if (freq != 0 && Math.abs(freq) != wi) {
        graphSpectreI.push(0);
        freqI.push(freq)
      }
       
      if (freq + 0.01 >= 0 && flagZero) {
        flagZero = false;
        graphSpectreI.push(iA);
        freqI.push(0);
      }
      if (freq + 0.01 >= -wi && flagMinusFreq) {
        flagMinusFreq = false;
        graphSpectreI.push(iA / 2);
        freqI.push(-wi);
      }
      if (freq + 0.01 >= wi && flagPlusFreq) {
        flagPlusFreq = false;
        graphSpectreI.push(iA / 2);
        freqI.push(wi);
      }
    }


    let graphSpectreM = [];
    let freqM = [];
    flagZero = true;
    flagMinusFreq = true;
    flagPlusFreq = true;
    flagZero2 = true;
    flagMinusFreq2 = true;
    flagPlusFreq2 = true;
    for (let freq = -wi - wn - 10; freq < wi + wn + 10; freq += 0.01) {
      graphSpectreM.push(0);
      freqM.push(freq);
       
      if (freq + 0.01 >= -wi && flagZero) {
        flagZero = false;
        graphSpectreM.push(iA);
        freqM.push(-wi);
      }
      if (freq + 0.01 >= - wi - wn && flagMinusFreq) {
        flagMinusFreq = false;
        graphSpectreM.push(iA * k / 2);
        freqM.push(-wi - wn);
      }
      if (freq + 0.01 >= -wi + wn && flagPlusFreq) {
        flagPlusFreq = false;
        graphSpectreM.push(k * iA / 2);
        freqM.push(-wi + wn);
      }

      if (freq + 0.01 >= wi && flagZero2) {
        flagZero2 = false;
        graphSpectreM.push(iA);
        freqM.push(wi);
      }
      if (freq + 0.01 >= wi - wn && flagMinusFreq2) {
        flagMinusFreq2 = false;
        graphSpectreM.push(iA * k / 2);
        freqM.push(wi - wn);
      }
      if (freq + 0.01 >= wi + wn && flagPlusFreq2) {
        flagPlusFreq2 = false;
        graphSpectreM.push(k * iA / 2);
        freqM.push(wi + wn);
      }
    }

    // Строим графики
    const ctx1 = document.getElementById('myChart').getContext("2d");

    let chartStatus1 = Chart.getChart("myChart");
    if (chartStatus1 != undefined) {
      chartStatus1.destroy();
    }

    graphN = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: tt,
        datasets: [{
          label: 'Несущий сигнал',
          data: graphSignalN,
          pointStyle: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            title: {
                display: true,
                text: 'Амплитуда, В'
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

    const ctx2 = document.getElementById('myChart1').getContext("2d");

    let chartStatus2 = Chart.getChart("myChart1");
    if (chartStatus2 != undefined) {
      chartStatus2.destroy();
    }

    graphI = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: tt,
        datasets: [{
          label: 'Информационный сигнал',
          data: graphSignalI,
          pointStyle: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            title: {
                display: true,
                text: 'Амплитуда, В'
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

    const ctx3 = document.getElementById('myChart2').getContext("2d");

    let chartStatus3 = Chart.getChart("myChart2");
    if (chartStatus3 != undefined) {
      chartStatus3.destroy();
    }

    graphM = new Chart(ctx3, {
      type: 'line',
      data: {
        labels: tt,
        datasets: [{
          label: 'Амплитудно-модулируемый сигнал',
          data: graphSignalM,
          pointStyle: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            title: {
                display: true,
                text: 'Амплитуда, В'
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

    const ctx4 = document.getElementById('myChart3').getContext("2d");

    let chartStatus4 = Chart.getChart("myChart3");
    if (chartStatus4 != undefined) {
      chartStatus4.destroy();
    }

    graphSpectreN = new Chart(ctx4, {
      type: 'line',
      data: {
        labels: freqN,
        datasets: [{
          label: 'Спектр несущего сигнала',
          data: graphSpectreN,
          pointStyle: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            title: {
                display: true,
                text: 'Амплитуда, В'
              }
          },
        x: {
            title: {
                display: true,
                text: 'Частота, Гц'
              }
        }
        }
      }
    });

    const ctx5 = document.getElementById('myChart4').getContext("2d");

    let chartStatus5 = Chart.getChart("myChart4");
    if (chartStatus5 != undefined) {
      chartStatus5.destroy();
    }

    graphSpectreI = new Chart(ctx5, {
      type: 'line',
      data: {
        labels: freqI,
        datasets: [{
          label: 'Спектр информационного сигнала',
          data: graphSpectreI,
          pointStyle: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            title: {
                display: true,
                text: 'Амплитуда, В'
              }
          },
        x: {
            title: {
                display: true,
                text: 'Частота, Гц'
              }
        }
        }
      }
    });

    const ctx6 = document.getElementById('myChart5').getContext("2d");

    let chartStatus6 = Chart.getChart("myChart5");
    if (chartStatus6 != undefined) {
      chartStatus6.destroy();
    }

    graphSpectreM = new Chart(ctx6, {
      type: 'line',
      data: {
        labels: freqM,
        datasets: [{
          label: 'Спектр амплитудно-модулируемого сигнала',
          data: graphSpectreM,
          pointStyle: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            title: {
                display: true,
                text: 'Амплитуда, В'
              }
          },
        x: {
            title: {
                display: true,
                text: 'Частота, Гц'
              }
        }
        }
      }
    });
}