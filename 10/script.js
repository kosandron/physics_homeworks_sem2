document.querySelector('button').onclick = paint;
 
function paint() {
    const n1 = parseFloat(document.querySelector('.n1').value);
    const n2 = parseFloat(document.querySelector('.n2').value);
    const wl = parseFloat(document.querySelector('.wl').value);
    const d = parseFloat(document.querySelector('.d').value);
    const L = parseFloat(document.querySelector('.L').value);

    if (n1 < 1 || n2 < 1) {
      alert("Показатели преломления должны быть больше или равны 1!");
      return
    }
    if (wl <= 0){
      alert("Длина волны должна быть больше 0!");
      return
    }
    if (d <= 0){
      alert("Расстояние между щелями должно быть больше 0!");
      return
    }
    if (L <= 0){
      alert("Расстояние до экрана должно быть больше 0!");
      return
    }
    
    const I0 = 1;
    let x = [];
    const y = [];
    const n = n2/n1;
    for (let t = -10.0; t < 10.0; t += 0.1) {
        const I = 4 * I0 * Math.cos(Math.PI * n * d * t / (wl * Math.pow(10, -9) * L)) * Math.cos(Math.PI * n * d * t / (wl * Math.pow(10, -9)  * L));
        
        x.push(t);
        y.push(I);
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
        labels: x,
        datasets: [{
          label: 'График интенсивности I(x)',
          data: y,
          pointStyle: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            title: {
                display: true,
                text: 'Интенсивность, Вт/м^2'
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

    const ctx = document.getElementById('canvas').getContext('2d');

    for (let i = 0; i < y.length; i++) {
        const rgbColor = 255 * (1 - y[i] / 4 * I0); // приводим к такому виду, так как в модели rgb (0, 0, 0) - черный, (255, 255, 255) - белый, а в точках большей интенсивности должно быть темнее
        ctx.fillStyle = `rgb(${rgbColor}, ${rgbColor}, ${rgbColor})`;
        ctx.fillRect(i, 0, 1, 300);
    }
}