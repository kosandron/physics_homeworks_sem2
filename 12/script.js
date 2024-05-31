document.querySelector('button').onclick = paint;
 
function paint() {
    const wl = parseFloat(document.querySelector('.wl').value) * Math.pow(10, -9);
    const N = parseFloat(document.querySelector('.N').value);
    const a = parseFloat(document.querySelector('.a').value);
    const b = parseFloat(document.querySelector('.b').value);
    const L = parseFloat(document.querySelector('.L').value);
    const scw = parseFloat(document.querySelector('.scw').value);

    if (N <= 0) {
      alert("Количество щелей должно быть больше 0!");
      return
    }
    if (wl <= 0){
      alert("Длина волны должна быть больше 0!");
      return
    }
    if (b <= 0){
      alert("Ширина щели должна быть больше 0!");
      return
    }
    if (L <= 0){
      alert("Расстояние до экрана должно быть больше 0!");
      return
    }
    if (a <= 0){
      alert("Расстояние между щелями должно быть больше 0!");
      return
    }
    if (scw <= 0){
      alert("Ширина экрана должна быть больше 0!");
      return
    }

    const I0 = 1;
    const d = a + b;
    let x = [];
    let y = [];
    let canvas = document.getElementById('canvas');
    for (let z = -scw / 2; z <= scw / 2; z += scw / canvas.width) { 
        const si = Math.abs(z) / Math.sqrt(z * z + L * L);
        if (si == 0) { // во избежание [0/0]
          const I = I0; // выражение интенсивности ниже + 1й замечательный предел
          x.push(z);
          y.push(I);
          continue;
        }
        let u = Math.PI * si * b / wl;
        let delta = Math.PI * si * d / wl;
        u = Math.PI * u / 180;
        delta = Math.PI * delta / 180;
        const I = I0 * Math.pow((Math.sin(u) / u), 2) * Math.pow((Math.sin(N * delta) / Math.sin(delta)), 2);
        
        x.push(z);
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

    const ctx = canvas.getContext('2d');

    for (let i = 0; i < y.length; i++) {
        const rgbColor = 255 * y[i] / (N * N); 
        ctx.fillStyle = `rgb(${rgbColor}, ${rgbColor}, ${rgbColor})`;
        ctx.fillRect(i, 0, 1, canvas.height);
    }
}