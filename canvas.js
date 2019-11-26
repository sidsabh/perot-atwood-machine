function updateMass1(newMass1) {
  var display = document.getElementById("initialMass1Value");
  display.innerHTML = newMass1;
  m1 = Number(newMass1);
  reset();
}

function updateMass2(newMass2) {
  var display = document.getElementById("initialMass2Value");
  display.innerHTML = newMass2;
  m2 = Number(newMass2);
  reset();
}

function updateGravity(newGrav) {
  var display = document.getElementById("gravityVal");
  display.innerHTML = newGrav;
  g = Number(newGrav);
  reset();
}

function updateMu(newMu) {
  var display = document.getElementById("muVal");
  display.innerHTML = newMu;
  mu = Number(newMu);
  reset();
}

function reset() {
  heightM2 = innerHeight / 3.19; // height of second box
  distM1 = innerWidth / 3.84;  // horizontal distance of first box
  if (innerHeight > innerWidth) { // if screen size is more vertical
    heightM2 = innerHeight / 2.5;
    distM1 = innerWidth / 10;
  }
  v = 0; // reset velocity
  w1 = m1 * g;
  w2 = m2 * g;
  a = scale * ((w2 - mu * w1) / (m1 + m2));
  drawTableAndPulley();
}

function drawTableAndPulley() {
  /* all the decimals are to get
  the ratios right for different
  screen sizes - may be adjusted later */

  c.clearRect(0, 0, innerWidth, innerHeight / 1.5);
  // table
  c.beginPath();
  c.moveTo(0, innerHeight / 4.31);
  c.lineTo(innerWidth / 2.05, innerHeight / 4.31);
  c.lineTo(innerWidth / 2.05, innerHeight / 1.43);
  c.stroke();

  // pulley
  c.moveTo(innerWidth / 2.05, innerHeight / 4.31);
  c.lineTo(innerWidth / 2.0, innerHeight / 4.78);
  c.stroke();
  c.beginPath();
  c.arc(innerWidth / 1.94, innerHeight / 5.56, innerHeight / 28.73, 0, Math.PI * 2, false);
  c.stroke();

  // vertical line and box
  c.moveTo(innerWidth / 1.94, innerHeight / 5.56 + innerHeight / 28.73);
  c.lineTo(innerWidth / 1.94, heightM2);
  c.stroke();
  c.strokeRect(innerWidth / 2.02, heightM2, innerHeight / 14.36, innerHeight / 14.36);
  var hex2 = parseInt((((m2 / 15.0) * 130) + 125).toString());
  var hexM2 = hex2.toString(16); // color based on mass
  c.fillStyle = "#" + hexM2 + "0000";
  c.fillRect(innerWidth / 2.02, heightM2, innerHeight / 14.36, innerHeight / 14.36);

  // horizontal line and box
  c.moveTo(innerWidth / 1.94 - innerHeight / 28.73, innerHeight / 5.56);
  c.lineTo(distM1, innerHeight / 5.56);
  c.stroke();
  var hex1 = parseInt((((m1 / 15.0) * 130) + 125).toString());
  var hexM1 = hex1.toString(16); // color based on mass
  c.fillStyle = "#0000" + hexM1;
  c.strokeRect(distM1 - innerHeight / 11.49, innerHeight / 6.89, innerHeight / 11.49, innerHeight / 11.49);
  c.fillRect(distM1 - innerHeight / 11.49, innerHeight / 6.89, innerHeight / 11.49, innerHeight / 11.49);

  // acceleration text
  c.fillStyle = "black";
  var aRounded = Math.round((a / scale) * 100) / 100;
  var accelText = aRounded.toString();
  if (a < 0) {
    accelText = "0";
  }
  c.font = "24pt Arial";
  c.fillText("Acceleration: " + accelText, innerWidth / 1.7, innerHeight / 8.62);

  // velocity text
  var vRounded = Math.round(v * 100) / 100;
  var vText = vRounded.toString();
  c.fillText("Velocity: " + vText, innerWidth / 1.7, innerHeight / 5.5);
}

var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 1.5;

var c = canvas.getContext("2d");

var scale = 0.01; // otherwise it goes too fast
var m1 = 7;
var m2 = 4; // these values need to be inputs
var g = 10;
var w1 = m1 * g;
var w2 = m2 * g;
var mu = 0.25;
var a = scale * ((w2 - mu * w1) / (m1 + m2));


var heightM2 = innerHeight / 3.19; // height of second box
var distM1 = innerWidth / 3.84;  // horizontal distance of first box
if (innerHeight > innerWidth) { // if screen size is more vertical
  heightM2 = innerHeight / 2.5;
  distM1 = innerWidth / 10;
}

var v = 0;

drawTableAndPulley();

function animate() {
  drawTableAndPulley();

  /* if no acceleration
     or box 1 hits pulley or
     box 2 hits the ground */
  if (a > 0 && heightM2 + innerHeight / 14.36 <= innerHeight / 1.5 &&
      distM1 + 5 <= innerWidth / 1.94 - innerHeight / 28.73) {
    v += a;
    heightM2 += v; // update positions
    distM1 += v;
    requestAnimationFrame(animate);
  }

}
