function updateMass1(newMass1) {
  //todo
}

function updateMass2(newMass2) {
  //todo
}

function updateGravity(newGrav) {
  //todo
}

function updateMu(newMu) {
  //todo
}

var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 1.5;

var c = canvas.getContext("2d");

var scale = 0.05; // otherwise it goes too fast
var m1 = 7;
var m2 = 4; // these values need to be inputs
var g = 10;
var w1 = m1 * g;
var w2 = m2 * g;
var mu = 0.25;
var a = scale * ((w2 - mu * w1) / (m1 + m2));

var heightM2 = innerHeight / 3.19; // height of second box
var distM1 = innerWidth / 3.84;  // horizontal distance of first box

var v = 0;

function animate() {
  /* all the decimals are to get
  the ratios right for different
  screen sizes - may be adjusted later */

  requestAnimationFrame(animate);
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
  c.moveTo(innerWidth / 1.89, innerHeight / 4.92);
  c.lineTo(innerWidth / 1.89, heightM2);
  c.stroke();
  c.strokeRect(innerWidth / 1.97, heightM2, innerHeight / 14.36, innerHeight / 14.36);

  // horizontal line and box
  c.moveTo(innerWidth / 1.94 - innerHeight / 28.73, innerHeight / 5.56);
  c.lineTo(distM1, innerHeight / 5.56);
  c.stroke();
  c.strokeRect(distM1 - innerHeight / 11.49, innerHeight / 6.89, innerHeight / 11.49, innerHeight / 11.49);

  if (a > 0 && heightM2 + innerHeight / 14.36 <= innerHeight / 1.5) { // if no acceleration or box 2 hits the ground
    v += a;
    heightM2 += v; // update positions
    distM1 += v;
  }
}

animate();
