document.querySelector('button').onclick = paint;
var n = 0
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xData,
      datasets: [{
        label: 'Зависимость магнитной индукции поля от координаты x. ',
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
    let R = document.querySelector('.R').value;
    let numberOfV = document.querySelector('.n').value;
    let II = document.querySelector('.I').value;
    let mp = 1.257 /1000000
    console.log(R)
    console.log(numberOfV)
    console.log(II)
    console.log(mp)

    let xData = [];
    let yData = [];
    for (let i = 0.0; i < R; i += R / 100) {
        let B = mp * numberOfV * II * R * R / (2 * Math.pow( (R * R + i * i), 1.5) ) + mp * numberOfV * II * R * R / (2 * Math.pow( (R * R + (R - i) * (R - i)), 1.5) );
        xData.push(i);
        yData.push(B);
    }

    const ctx = document.getElementById('myChart').getContext("2d");

    let chartStatus = Chart.getChart("myChart");
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

         myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: xData,
            datasets: [{
              label: 'Зависимость магнитной индукции поля от координаты x.',
              data: yData,
              pointStyle: false
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'B, Тл'
                  }
              },
            x: {
                title: {
                    display: true,
                    text: 'x, м'
                  }
            }
            }
          }
        });


}