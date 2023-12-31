let x, y, minX, maxX, minY, maxY;
let sandColor; // Variable for the rectangle's color
let plantColor; // Color for all green rectangles
let fishColor; // Color for all fish shapes
let plants = []; // Array to store green rectangles
let fishes = []; // Array to store fish shapes

// Gradient rectangle dimensions
let gradX = 45;
let gradY = 160;
let gradW = 670;
let gradH = 300;

function setup() {
  createCanvas(875, 550);
  x = width / 2;
  y = height / 2;

  // boundaries for sand
  minX = gradX;
  maxX = gradX + gradW - 15;
  minY = gradY + 2 * gradH / 3;
  maxY = gradY + gradH - 15;

  // Set background 
  background(188, 184, 177);

  // set gradient color
  let color1 = color(random(0, 255), random(0, 255), random(0, 255));
  let color2 = color(random(0, 255), random(0, 255), random(0, 255));
  setGradient(gradX, gradY, gradW, gradH, color1, color2, "Y");
  
  // static elements
  drawStaticElements();

  // random set color for sand
  sandColor = color(random(0, 255), random(0, 255), random(0, 255));

  // random set color for fish
  fishColor = color(random(0, 255), random(0, 255), random(0, 255)); // Random color for all fish shapes

}

function resetSketch() {
  window.location.reload();
}

function draw() {
  
  // Draw fishes
  fill(fishColor);
  for (let fish of fishes) {
    let fishX = constrain(fish.x, gradX - 25, gradX + gradW - 55);
    let fishY = constrain(fish.y, gradY - 25, gradY + gradH - 40);

    push(); // Save the current drawing state
    translate(fishX, fishY); // Move the origin to the fish's location
    scale(fish.direction, 1); // Flip the fish based on direction

    noStroke();
    ellipse(0, 0, 40, 30);
    triangle(10, 0, 40, -15, 40, 15);
    
    fill(0); 
    ellipse(-8, 0, 5, 8);
    
    fill(255, 191, 183); 
    ellipse(0, 5, 9, 7);

    pop(); // Restore the original drawing state
  }
  
  // Draw plants of varying lengths
  fill(170, 203, 77);
  for (let plant of plants) {
    let rectX = constrain(plant.x, gradX, gradX + gradW - 20);
    let rectWidth = 20; // Width of the rectangle
    let rectHeight = constrain(plant.height, 20, gradH);
    let rectY = gradY + gradH - rectHeight - 15; // Y-position of the rectangle

    // draws rectangles
    rect(rectX, rectY, rectWidth, rectHeight);

    // draws a semicircle on top of the rectangle to make it look more plant-y
    arc(rectX + rectWidth / 2, rectY, rectWidth, rectWidth, PI, 0);
  
    // draws a line for the plant to make it look "leafy"
    let lineStartY = rectY + rectWidth / 2; // Starting just below the semicircle
    let lineEndY = rectY + rectHeight; // Ending at the bottom of the rectangle
    stroke(95, 179, 37); // Set line color (black)
    strokeWeight(2);
    line(rectX + rectWidth / 2, lineStartY, rectX + rectWidth / 2, lineEndY);
    noStroke(); // Reset stroke to avoid affecting other elements 
  }



  // draws sand particles when mouse is clicked (and dragged)
  if (mouseIsPressed) {
    // Update sand particle position and constrain within the bottom one-third of the gradient (water)
    x = constrain(mouseX, minX, maxX);
    y = constrain(mouseY, minY, maxY);
    fill(sandColor);
    rect(x, y, 15, 15); // Draw the stepper last to ensure it's on top
  }
  
  
}

// checks for user input
function keyPressed() {
  // space creates plants at random locations
  if (key === ' ') {
    // Add new green rectangle
    plants.push({
      x: random(gradX, gradX + gradW - 20),
      height: random(20, gradH - 40)
    });
  } else {
    // other keys creates a new fish shape with random direction
    fishes.push({
      x: random(gradX + 50, gradX + gradW - 30),
      y: random(gradY + 15, gradY + gradH - 30),
      direction: random([1, -1]) // 1 for right, -1 for left
    });
  }
}

// makes gradient from two randomized colors
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis === "Y") {
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
}


function drawStaticElements() {
  // Table
  noStroke();
  fill(197, 155, 118);
  rect(-10, 472, 870, 50, 5);
  rect(750, 472, 50, 100);

  // Glass tank
  stroke(299);
  strokeWeight(4);
  noFill();
  rect(35, 110, 690, 360, 5);

  // Tank opening
  noStroke();
  fill(19, 41, 61);
  rect(20, 85, 720, 35, 8);

  // glass texture
  stroke(299);
  strokeWeight(2);
  line(60, 130, 300, 400);
  line(125, 150, 365, 420);
  line(450, 140, 690, 400);
  line(550, 140, 605, 200);
  noStroke();
  
  // draws candle on table
  fill(245, 235, 224);
  rect(750, 417, 90, 55, 25);
  rect(750, 370, 90, 55, 25);
  rect(750, 323, 90, 55, 25);
  
  fill(252, 191, 73);
  ellipse(795,300, 25, 40);
  
  fill(188, 184, 177);
  rect(792, 310, 5, 20, 25);
}
