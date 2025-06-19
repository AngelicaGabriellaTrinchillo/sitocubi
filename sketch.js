/**
 * @typedef {import("./p5/types").Graphics} Graphics
 * @typedef {import("./p5/types").Image} Image
 *
 * @typedef {Object} Cubo
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {number} size
 * @property {string} color
 * @property {function} rotationFunction
 */

//

/** @type {Cubo[]} */
let cubi = [];

let copie = 50;

/** @type {Graphics} */
let g;

/** @type {Image} */
let img;

function preload() {
  img = loadImage("./image/logo-08.jpg");
}

//

function setup() {
  createCanvas(windowWidth, windowHeight, "webgl");

  g = createGraphics(100, 100);

  let distanza = 500;
  for (let i = 0; i < copie; i++) {
    let cubo = {
      x: random(-distanza, distanza),
      y: random(-distanza, distanza),
      z: random(-distanza, distanza),
      size: 100,
      color: random(["pink", "yellow", "blue"]),
      rotationFunction: random([rotateX, rotateY]),
    };
    cubi.push(cubo);
  }
}

function draw() {
  background("white");
  orbitControl();
  rotateY(frameCount * 0.001);
  noStroke();

  g.background("white");
  g.push();
  g.translate(g.width / 2, g.height / 2);
  g.imageMode("center");
  g.scale(g.width / img.width);
  // g.text("trame urbane", 0, g.height);
  // g.textSize(g.height);
  g.image(img, 0, 0);
  g.pop();

  texture(g);

  for (let cubo of cubi) {
    push();
    translate(cubo.x, cubo.y, cubo.z);

    let velocita = frameCount * 0.005;
    cubo.rotationFunction(velocita);
    rotateZ(velocita);

    box(cubo.size);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function keyPressed() {
  saveGif("TrameUrbaneCubi", 8);
}
