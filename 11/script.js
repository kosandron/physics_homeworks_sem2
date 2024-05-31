document.querySelector('button').onclick = paint;

function nmToRGB(wavelength) {
  var Gamma = 0.80,
    IntensityMax = 255,
    factor, red, green, blue;
  if ((wavelength >= 380) && (wavelength < 440)) {
    red = -(wavelength - 440) / (440 - 380);
    green = 0.0;
    blue = 1.0;
  } else if ((wavelength >= 440) && (wavelength < 490)) {
    red = 0.0;
    green = (wavelength - 440) / (490 - 440);
    blue = 1.0;
  } else if ((wavelength >= 490) && (wavelength < 510)) {
    red = 0.0;
    green = 1.0;
    blue = -(wavelength - 510) / (510 - 490);
  } else if ((wavelength >= 510) && (wavelength < 580)) {
    red = (wavelength - 510) / (580 - 510);
    green = 1.0;
    blue = 0.0;
  } else if ((wavelength >= 580) && (wavelength < 645)) {
    red = 1.0;
    green = -(wavelength - 645) / (645 - 580);
    blue = 0.0;
  } else if ((wavelength >= 645) && (wavelength < 781)) {
    red = 1.0;
    green = 0.0;
    blue = 0.0;
  } else {
    red = 0.0;
    green = 0.0;
    blue = 0.0;
  };
  // Let the intensity fall off near the vision limits
  if ((wavelength >= 380) && (wavelength < 420)) {
    factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
  } else if ((wavelength >= 420) && (wavelength < 701)) {
    factor = 1.0;
  } else if ((wavelength >= 701) && (wavelength < 781)) {
    factor = 0.3 + 0.7 * (780 - wavelength) / (780 - 700);
  } else {
    factor = 0.0;
  };
  if (red !== 0) {
    red = Math.round(IntensityMax * Math.pow(red * factor, Gamma));
  }
  if (green !== 0) {
    green = Math.round(IntensityMax * Math.pow(green * factor, Gamma));
  }
  if (blue !== 0) {
    blue = Math.round(IntensityMax * Math.pow(blue * factor, Gamma));
  }
  return [red, green, blue];
}

function paint() {
  const nl = parseFloat(document.querySelector('.nl').value);
  const nm = parseFloat(document.querySelector('.nm').value);
  const np = parseFloat(document.querySelector('.np').value);
  const R = parseFloat(document.querySelector('.R').value);
  const wl = parseFloat(document.querySelector('.wl').value) * Math.pow(10, -9);
  const ws = parseFloat(document.querySelector('.ws').value) * Math.pow(10, -9);
  const msh = parseFloat(document.querySelector('.msh').value);
  const canvas = document.getElementById("canvas");

  if (nl < 1 || nm < 1 || np < 1) {
    alert("Показатели преломления должны быть больше или равны 1!");
    return
  }
  if (wl <= 0) {
    alert("Середина спектра должна быть больше 0!");
    return
  }
  if (ws < 0) {
    alert("Ширина спектра должна быть больше 0!");
    return
  }
  if (R <= 0) {
    alert("Радиус линзы должен быть больше 0!");
    return
  }

  const I0 = 1;
  let x = [];
  const y = [];
  let intensity = [];
  for (let z = wl - ws / 2; z <= wl + ws / 2; z += Math.pow(10, -9)) {
    const R_Frenel = Math.pow((np - nm) / (np + nm), 2);
    const T_Frenel = 4 * nl * nm / (Math.pow((nl + nm), 2)); // коэффициенты отражения и преломления по энергии
    const k = 2 * Math.PI / z; // волновое число


    console.log(canvas.width)

    for (let r = 0; r <= (msh / 2) * Math.sqrt(2); r += ((msh / 2) * Math.sqrt(2)) / (canvas.width / 2)) {
      let I1 = I0 * T_Frenel * T_Frenel * R_Frenel;
      let I2 = I0 * R_Frenel;

      let opt = 2 * (r * r / (2 * R)) * nm + z / 2;
      let I = I1 + I2 + 2 * I0 * R_Frenel * T_Frenel * Math.cos(k * opt);
      intensity.push(I);
      if (intensity.length > x.length) {
        x.push(r);
      }
    }

    for (let i = 0; i < intensity.length; i++) {
      if (y.length == intensity.length) {
        y[i] += intensity[i];
      } else {
        y.push(intensity[i]);
      }
    }
    intensity = [];
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

  var minIntensity = 999999999;
  var maxIntensity = -999999999;
  for (let i = 0; i < y.length; i++) {
    minIntensity = Math.min(minIntensity, y[i]);
    maxIntensity = Math.max(maxIntensity, y[i]);
  }
  let d = [];
  for (let i = 0; i < y.length; i++) {
    d.push((y[i] - minIntensity) / (maxIntensity - minIntensity));
  }

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < y.length; i++) {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, i, 0, 2 * Math.PI);
    const color = nmToRGB(wl * Math.pow(10, 9));
    ctx.strokeStyle = `rgb(${255 * d[i]}, ${255 * d[i]}, ${255 * d[i]})`;
    ctx.stroke();
  }
}