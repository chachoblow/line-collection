var backgroundColor = [27, 38, 40];
var radius = 200;
var menuRadius = 50;
var triangleRadius = menuRadius;
var circRadius = menuRadius;
var squareRadius = menuRadius;

// Arrays used in menu for shapes.
var circleArray = [];
var triangleArray = [];
var squareArray = [];

// Arrays used in the "WATCH" state. 
var bigTriangles = [];
var bigCircles = [];

// Array for keeping track of places shapes in "ARRANGE" state.
var arrangeArray = [];

// Truth values used throughout for keeping track of menu states, program states, etc.
var inMenu = true;
var menu1Pressed = false;
var menu2Pressed = false;
var trianglePressed = false;
var circlePressed = false;
var squarePressed = false;
var inArrange = false;
var inWatchTriangle = false;
var inWatchCircle = false;
var inWatchSquare = false;
var inArrangeTriangle = false;
var inArrangeCircle = false;
var inArrangeSquare = false;

var mouseWheelValue;
var font;

function preload() {
  font = loadFont('FreeSans.otf');
}

function setup() {
  cnv = createCanvas(800, 800);

  cnv.mouseWheel(changeSize);
  mouseWheelValue = 100;

  background(backgroundColor);
  stroke(255, 255, 255, 15);
  smooth();

  // Create shape objects used in menu.
  var menuShapeBuffer = 100;
  menuTriangle = new Triangle(width / 4 - 20, height / 2 + menuShapeBuffer, menuRadius, true);
  menuCircle = new Circle(width / 2, height / 2 + menuShapeBuffer, menuRadius, true);
  menuSquare = new Square(3 * width / 4 + 20, height / 2 + menuShapeBuffer, menuRadius, true);

  // Create triangle shape array used in "ARRANGE" state.
  for (var i = 0; i < 5; i++) {
    bigTriangles.push(new Triangle(width / 2, height / 2, width / 2, false));
  }

  // Create circle shape array used in "ARRANGE" state.
  for (var j = 0; j < 20; j++) {
    bigCircles.push(new Circle(width / 2, height / 2, width / 2, false));
  }

  // Create menu item objects.
  var menuItemBuffer = 415;
  menuItem1 = new MenuItem('ARRANGE', width * 0.07, height * 0.35, 65);
  menuItem2 = new MenuItem('WATCH', width * 0.1 + menuItemBuffer, height * 0.35, 65);
  exitItem = new MenuItem('EXIT', width - 140, height - 30, 50);
}

function resetMouseWheel() {
  mouseWheelValue = 100;
}

function changeSize(event) {
  if (event.deltaY > 0) {
    mouseWheelValue += 10;
  } else {
    if (mouseWheelValue > 0) {
      mouseWheelValue = mouseWheelValue - 10;
    }
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    mouseWheelValue += 10;
  } else if (keyCode == DOWN_ARROW && d > 0) {
    mouseWheelValue -= 10;
  }
}

function draw() {
  if (inArrangeTriangle || inArrangeCircle || inArrangeSquare) {
    arrange();
  } else if (inWatchTriangle) {
    drawBigTriangle();
  } else if (inWatchCircle) {
    drawBigCirc();
  } else if (inWatchSquare) {
    drawBigSquare();
  } else {
    menu();
  }
}

function mousePressed() {
  if (inArrangeTriangle) {
    if (exitItem.mouseHover()) {
      resetMenuTruths();
      resetMouseWheel();
      arrangeArray = [];
    } else {
      arrangeArray.push(new Triangle(mouseX, mouseY, mouseWheelValue, false));
    }
  } else if (inArrangeCircle) {
    if (exitItem.mouseHover()) {
      resetMenuTruths();
      resetMouseWheel();
      arrangeArray = [];
    } else {
      arrangeArray.push(new Circle(mouseX, mouseY, mouseWheelValue, false));
    }
  } else if (inArrangeSquare) {
    if (exitItem.mouseHover()) {
      resetMenuTruths();
      resetMouseWheel();
      arrangeArray = [];
    } else {
      arrangeArray.push(new Square(mouseX, mouseY, mouseWheelValue, false));
    }
  }

  if (inWatchTriangle) {
    if (exitItem.mouseHover()) {
      resetMenuTruths();
    }
  } else if (inWatchCircle) {
    if (exitItem.mouseHover()) {
      resetMenuTruths();
    }
  } else if (inWatchSquare) {
    if (exitItem.mouseHover()) {
      resetMenuTruths();
    }
  }


  if (menuItem1.mouseHover() && inMenu) {
    menu1Pressed = !menu1Pressed;
    menu2Pressed = false;

  } else if (menuItem2.mouseHover() && inMenu) {
    menu2Pressed = !menu2Pressed;
    menu1Pressed = false;

  } else if (menuTriangle.mouseHover() && inMenu) {
    trianglePressed = !trianglePressed;
    circlePressed = false;
    squarePressed = false;

  } else if (menuCircle.mouseHover() && inMenu) {
    trianglePressed = false;
    circlePressed = !circlePressed;
    squarePressed = false;

  } else if (menuSquare.mouseHover() && inMenu) {
    trianglePressed = false;
    circlePressed = false;
    squarePressed = !squarePressed;

  }

  if (menu1Pressed && inMenu) {
    if (trianglePressed) {
      background(backgroundColor);
      inArrangeTriangle = true;
      inMenu = false;
    } else if (circlePressed) {
      background(backgroundColor);
      inArrangeCircle = true;
      inMenu = false;
    } else if (squarePressed) {
      background(backgroundColor);
      inArrangeSquare = true;
      inMenu = false;
    }
  } else if (menu2Pressed && inMenu) {
    if (trianglePressed) {
      background(backgroundColor);
      inWatchTriangle = true;
      inMenu = false;
    } else if (circlePressed) {
      background(backgroundColor);
      inWatchCircle = true;
      inMenu = false;
    } else if (squarePressed) {
      background(backgroundColor);
      inWatchSquare = true;
      inMenu = false;
    }
  }
}

function resetMenuTruths() {
  background(backgroundColor)
  inWatchTriangle = false;
  inWatchCircle = false;
  inWatchSquare = false;
  inArrangeTriangle = false;
  inArrangeCircle = false;
  inArrangeSquare = false;
  inMenu = true;
  menu1Pressed = false;
  menu2Pressed = false;
  trianglePressed = false;
  circlePressed = false;
  squarePressed = false;
}

function menu() {
  noStroke();

  if (menu1Pressed) {
    menuItem1.display(true);
    menuItem2.display();
  } else if (menu2Pressed) {
    menuItem1.display();
    menuItem2.display(true);
  } else {
    if (menuItem1.mouseHover()) {
      menuItem1.display(true);
    } else {
      menuItem1.display();
    }

    if (menuItem2.mouseHover()) {
      menuItem2.display(true);
    } else {
      menuItem2.display();
    }
  }

  if (trianglePressed) {
    resetCircleHover();
    resetSquareHover();
    menuTriangle.cover();
    drawTriangleHover();
    menuCircle.draw();
    menuSquare.draw();
  } else if (circlePressed) {
    resetTriangleHover();
    resetSquareHover();
    menuCircle.cover();
    drawCircleHover();
    menuTriangle.draw();
    menuSquare.draw();
  } else if (squarePressed) {
    resetTriangleHover();
    resetCircleHover();
    menuSquare.cover();
    drawSquareHover();
    menuTriangle.draw();
    menuCircle.draw();
  } else {
    if (menuTriangle.mouseHover()) {
      menuTriangle.cover();
      drawTriangleHover();
    } else {
      resetTriangleHover();
      menuTriangle.draw();
    }

    if (menuCircle.mouseHover()) {
      menuCircle.cover();
      drawCircleHover();
    } else {
      resetCircleHover();
      menuCircle.draw();
    }

    if (menuSquare.mouseHover()) {
      menuSquare.cover();
      drawSquareHover();
    } else {
      resetSquareHover();
      menuSquare.draw();
    }
  }
}

function arrange() {
  for (var i = 0; i < arrangeArray.length; i++) {
    arrangeArray[i].draw();
  }

  exitItem.display(false, false);
}

function drawBigTriangle() {
  for (var j = 0; j < bigTriangles.length; j++) {
    push();
    var cT = bigTriangles[j];
    cT.setCenter(-width / 4, -height / 4);
    cT.setRadius((width / 2) * sin(frameCount * 0.01));
    push();
    translate(width / 2,
    height / 2);
    rotate(frameCount * 1000);
    cT.draw();
    pop();
  }

  exitItem.display(false, false);
}

function drawBigCirc() {

  var circle = bigCircles[0];
  var baseRadius = 50;
  var stepRadius = 50;

  var numRows = 1;
  for (var i = 0; i < 10; i++) {
    push();
    translate(width / 2, height / 2);
    rotate(frameCount);
    circle.setCenter(-(width / 4) + width / 4 * cos(frameCount * 0.1), height / 2 * sin(frameCount * 0.01));
    circle.setRadius(baseRadius + stepRadius * sin(frameCount * 0.01));
    circle.draw();

    circle.setCenter(-(width / 4) + width / 4 * cos(frameCount * 0.1), -height / 2 * sin(frameCount * 0.01));
    circle.setRadius(baseRadius + stepRadius * sin(frameCount * 0.01));
    circle.draw();

    circle.setCenter(width / 4 * cos(frameCount * 0.1), height / 2 * sin(frameCount * 0.01));
    circle.setRadius(baseRadius + stepRadius * sin(frameCount * 0.01));
    circle.draw();

    circle.setCenter(width / 4 * cos(frameCount * 0.1), -height / 2 * sin(frameCount * 0.01));
    circle.setRadius(baseRadius + stepRadius * sin(frameCount * 0.01));
    circle.draw();

    circle.setCenter((width / 4) + width / 4 * cos(frameCount * 0.1), height / 2 * sin(frameCount * 0.01));
    circle.setRadius(baseRadius + stepRadius * sin(frameCount * 0.01));
    circle.draw();

    circle.setCenter((width / 4) + width / 4 * cos(frameCount * 0.1), -height / 2 * sin(frameCount * 0.01));
    circle.setRadius(baseRadius + stepRadius * sin(frameCount * 0.01));
    circle.draw();
    pop();
  }

  exitItem.display(false, false);
}

function drawBigSquare() {
  bigSquare.setCenter(0, 0);
  bigSquare.setRadius(width / 4 + (width / 4) * sin(frameCount * 0.01));
  push();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.01);
  bigSquare.draw();
  pop();

  exitItem.display(false, false);
}

function drawCircleHover() {
  var hoverNum = 10;
  var angle;
  var xpos;
  var ypos;
  var r;

  for (var i = 0; i < 1; i++) {
    angle = random(0, 2 * PI);
    r = floor(random(0, 2 * menuCircle.getRadius()));
    xpos = menuCircle.getCenterX() + r * cos(angle);
    ypos = menuCircle.getCenterY() + r * sin(angle);

    if (circleArray.length == hoverNum) {
      var removed = circleArray.shift();
      removed.cover();
    }

    circleArray.push(new Circle(xpos, ypos, menuCircle.getRadius(), true))
  }

  for (var j = 0; j < circleArray.length; j++) {
    circleArray[j].draw();
  }
}

function drawSquareHover() {
  var hoverNum = 10;
  var xpos;
  var ypos;

  var x = menuSquare.getCenterX();
  var y = menuSquare.getCenterY();
  var radius = menuSquare.getRadius();

  for (var i = 0; i < 1; i++) {
    xpos = floor(random(x - radius, x + radius));
    ypos = floor(random(y - radius, y + radius));

    if (squareArray.length == hoverNum) {
      var removed = squareArray.shift();
      removed.cover();
    }

    squareArray.push(new Square(xpos, ypos, menuRadius, true));
  }

  for (var j = 0; j < squareArray.length; j++) {
    squareArray[j].draw();
  }
}

function drawTriangleHover() {
  var x = menuTriangle.getCenterX();
  var y = menuTriangle.getCenterY();
  var radius = menuTriangle.getRadius();
  var hoverNum = 10;

  var ax = x;
  var ay = y - radius;
  var bx = x + radius;
  var by = y + radius;
  var cx = x - radius;
  var cy = y + radius;
  var angle;
  var xpos;
  var ypos;
  var u1;
  var u2;
  var r;

  for (var i = 0; i < 5; i++) {
    u1 = random();
    u2 = random();

    xpos = (1 - sqrt(u1)) * ax + (sqrt(u1) * (1 - u2)) * bx + (sqrt(u1) * u2) * cx
    ypos = (1 - sqrt(u1)) * ay + (sqrt(u1) * (1 - u2)) * by + (sqrt(u1) * u2) * cy

    if (triangleArray.length == hoverNum) {
      var removed = triangleArray.shift();
      removed.cover();
    }

    triangleArray.push(new Triangle(xpos, ypos, radius));
  }

  for (var j = 0; j < triangleArray.length; j++) {
    triangleArray[j].draw();
  }
}

function resetTriangleHover() {
  for (var k = 0; k < triangleArray.length; k++) {
    triangleArray[k].cover();
  }

  for (k = 0; k < squareArray.length; k++) {
    triangleArray.shift();
  }
}

function resetCircleHover() {
  for (var k = 0; k < circleArray.length; k++) {
    circleArray[k].cover();
  }

  for (k = 0; k < circleArray.length; k++) {
    circleArray.shift();
  }
}

function resetSquareHover() {
  for (var k = 0; k < squareArray.length; k++) {
    squareArray[k].cover()
  }

  for (k = 0; k < squareArray.length; k++) {
    squareArray.shift();
  }
}

function triPoint(x1, y1, x2, y2, x3, y3, px, py) {

  // get the area of the triangle
  var areaOrig = abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));

  // get the area of 3 triangles made between the point
  // and the corners of the triangle
  var area1 = abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py));
  var area2 = abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py));
  var area3 = abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py));

  // if the sum of the three areas equals the original,
  // we're inside the triangle!
  if (area1 + area2 + area3 == areaOrig) {
    return true;
  }
  return false;
}

function MenuItem(word, x, y, fs = 10) {
  this.centerX = x;
  this.centerY = y;
  this.title = word;
  this.fontsize = fs;
  this.wiggleX = 7;
  this.wiggleY = 7;
  this.baseColorVal = 100;
  this.colorValStep = 75;
  this.bbox = font.textBounds(this.title, this.centerX,
    this.centerY, this.fontsize);

  this.getBox = function() {
    return this.bbox;
  }

  this.getCenterX = function() {
    return this.centerX;
  }

  this.getCenterY = function() {
    return this.centerY;
  }

  this.setWiggle = function(x, y) {
    this.wiggleX = x;
    this.wiggleY = y;
  }

  this.mouseHover = function() {
    return (mouseX > this.bbox.x &&
      mouseX < this.bbox.x + this.bbox.w &&
      mouseY > this.bbox.y &&
      mouseY < this.bbox.y + this.bbox.h);
  }

  this.display = function(wiggle = false, cover = true) {
    var threshold = 20;
    var p1;
    var p2;
    var points;

    if (wiggle) {
      var randomX = random(-this.wiggleX, this.wiggleX)
      var randomY = random(-this.wiggleY, this.wiggleY)
      var randomFS = random(-7, 7);

      points = font.textToPoints(this.title, this.centerX + randomX,
        this.centerY + randomY, this.fontsize + randomFS, {
          sampleFactor: 0.35,
          simplifyThreshold: 0
        });
      this.bbox = font.textBounds(this.title, this.centerX + randomX,
        this.centerY + randomY, this.fontsize);
    } else {
      points = font.textToPoints(this.title, this.centerX,
        this.centerY, this.fontsize, {
          sampleFactor: 0.25,
          simplifyThreshold: 0
        });
      this.bbox = font.textBounds(this.title, this.centerX,
        this.centerY, this.fontsize);
    }

    var letterCount = 0;
    var letterArray = [];
    var currentArray = [];
    for (var k = 0; k < points.length - 1; k++) {
      p1 = points[k];
      p2 = points[k + 1];

      if (dist(p1.x, p1.y, p2.x, p2.y) > threshold) {
        var newArray = currentArray.slice();
        letterArray.push(newArray);
        currentArray = [];
      } else {
        currentArray.push(p1);
      }
    }

    letterArray.push(currentArray);

    if (cover) {
      fill(backgroundColor);
      rect(this.bbox.x - 80, this.bbox.y - 80, this.bbox.w + 160, this.bbox.h + 160);
    } else {
      for (var letter = 0; letter < letterArray.length; letter++) {
        for (var i = 0; i < letterArray[letter].length - 1; i++) {
          for (var j = 0; j < 2; j++) {
            var currentLetter = letterArray[letter];
            p1 = currentLetter[floor(random(currentLetter.length - 1))];
            p2 = currentLetter[floor(random(currentLetter.length - 1))];

            stroke(backgroundColor, 5);

            line(p1.x, p1.y, p2.x, p2.y);
          }
        }
      }
    }

    for (var letter = 0; letter < letterArray.length; letter++) {
      for (var i = 0; i < letterArray[letter].length - 1; i++) {
        for (var j = 0; j < 2; j++) {
          var currentLetter = letterArray[letter];
          p1 = currentLetter[floor(random(currentLetter.length - 1))];
          p2 = currentLetter[floor(random(currentLetter.length - 1))];

          stroke(this.baseColorVal + this.colorValStep * sin(frameCount * 0.01),
            this.baseColorVal + this.colorValStep * sin(frameCount * 0.021),
            this.baseColorVal + this.colorValStep * sin(frameCount * 0.012), 15);

          line(p1.x, p1.y, p2.x, p2.y);
        }
      }
    }
    noStroke();
  }

}

function Triangle(x = width / 2, y = height / 2, r = 10, ct = true) {
  this.centerX = x;
  this.centerY = y;
  this.radius = r;
  this.coverTracks = ct;
  this.numLines = 50;
  this.baseColorVal = 150;
  this.colorValStep = 75;
  this.backgroundColor = [27, 38, 40, 255];

  this.setCenter = function(x, y) {
    this.centerX = x;
    this.centerY = y;
  }

  this.setRadius = function(r) {
    this.radius = r;
  }

  this.setCoverTracks = function(ct) {
    this.coverTracks = ct;
  }

  this.getCenterX = function() {
    return this.centerX;
  }

  this.getCenterY = function() {
    return this.centerY;
  }

  this.getRadius = function() {
    return this.radius;
  }

  this.cover = function() {
    var buffer = 5;
    fill(this.backgroundColor);
    triangle(this.centerX,
      this.centerY - (this.radius + buffer),
      this.centerX - (this.radius + buffer),
      this.centerY + (this.radius + buffer),
      this.centerX + (this.radius + buffer),
      this.centerY + (this.radius + buffer));
  }

  this.mouseHover = function() {
    var x1 = this.centerX - this.radius;
    var y1 = this.centerY + this.radius;
    var x2 = this.centerX + this.radius;
    var y2 = this.centerY + this.radius;
    var x3 = this.centerX;
    var y3 = this.centerY - this.radius;

    return triPoint(x1, y1, x2, y2, x3, y3, mouseX, mouseY);
  }

  this.draw = function() {
    for (var i = 0; i < this.numLines; i++) {
      var xpos1 = this.centerX;
      var ypos1 = this.centerY - this.radius;

      var xpos2 = floor(random(this.centerX - this.radius, this.centerX + this.radius));
      var ypos2 = this.centerY + this.radius;

      // Set the color for the lines.
      stroke(this.baseColorVal + this.colorValStep * sin(frameCount * 0.01),
        this.baseColorVal + this.colorValStep * sin(frameCount * 0.021),
        this.baseColorVal + this.colorValStep * sin(frameCount * 0.012), 15);

      line(xpos1, ypos1, xpos2, ypos2);

      if (this.coverTracks) {
        xpos1 = this.centerX;
        ypos1 = this.centerY - this.radius;

        xpos2 = floor(random(this.centerX - this.radius, this.centerX + this.radius));
        ypos2 = this.centerY + this.radius;

        // Set the color for the lines.
        stroke(this.backgroundColor);

        line(xpos1, ypos1, xpos2, ypos2);
      }
    }
  }
}

function Circle(x = width / 2, y = height / 2, r = 10, ct = true) {
  this.centerX = x;
  this.centerY = y;
  this.radius = r;
  this.coverTracks = ct;
  this.numLines = 50;
  this.baseColorVal = 150;
  this.colorValStep = 75;
  this.backgroundColor = [27, 38, 40, 255];

  this.setCenter = function(x, y) {
    this.centerX = x;
    this.centerY = y;
  }

  this.setRadius = function(r) {
    this.radius = r;
  }

  this.setCoverTracks = function(ct) {
    this.coverTracks = ct;
  }

  this.getCenterX = function() {
    return this.centerX;
  }

  this.getCenterY = function() {
    return this.centerY;
  }

  this.getRadius = function() {
    return this.radius;
  }

  this.cover = function() {
    var buffer = 5;
    fill(this.backgroundColor);
    ellipse(this.centerX, this.centerY, 2 * (this.radius + buffer));
  }

  this.mouseHover = function() {
    return dist(mouseX, mouseY, this.centerX, this.centerY) < this.radius;
  }

  this.draw = function() {
    for (var i = 0; i < this.numLines; i++) {
      // Find a random point on a circle at one end.
      var angle1 = random(0, 2 * PI);
      var xpos1 = this.centerX + this.radius * cos(angle1);
      var ypos1 = this.centerY + this.radius * sin(angle1);

      // Find another random point on the circle.
      var angle2 = random(0, 2 * PI);
      var xpos2 = this.centerX + this.radius * cos(angle2);
      var ypos2 = this.centerY + this.radius * sin(angle2);

      // Set the color for the lines.
      stroke(this.baseColorVal + this.colorValStep * sin(frameCount * 0.01),
        this.baseColorVal + this.colorValStep * sin(frameCount * 0.021),
        this.baseColorVal + this.colorValStep * sin(frameCount * 0.012), 15);

      line(xpos1, ypos1, xpos2, ypos2);

      if (this.coverTracks) {
        // Find a random point on a circle at one end.
        angle1 = random(0, 2 * PI);
        xpos1 = this.centerX + this.radius * cos(angle1);
        ypos1 = this.centerX + this.radius * sin(angle1);

        // Find another random point on the circle.
        angle2 = random(0, 2 * PI);
        xpos2 = this.centerX + this.radius * cos(angle2);
        ypos2 = this.centerY + this.radius * sin(angle2);

        // Set the color for the lines.
        stroke(this.backgroundColor);

        line(xpos1, ypos1, xpos2, ypos2);
      }
    }
  }
}

function Square(x = width / 2, y = height / 2, r = 10, ct = true) {
  this.centerX = x;
  this.centerY = y;
  this.radius = r;
  this.coverTracks = ct;
  this.numLines = 50;
  this.baseColorVal = 150;
  this.colorValStep = 75;
  this.backgroundColor = [27, 38, 40, 255];

  this.setCenter = function(x, y) {
    this.centerX = x;
    this.centerY = y;
  }

  this.setRadius = function(r) {
    this.radius = r;
  }

  this.setCoverTracks = function(ct) {
    this.coverTracks = ct;
  }

  this.getCenterX = function() {
    return this.centerX;
  }

  this.getCenterY = function() {
    return this.centerY;
  }

  this.getRadius = function() {
    return this.radius;
  }

  this.cover = function() {
    var buffer = 5;
    fill(this.backgroundColor);
    rect(this.centerX - (this.radius + buffer),
      this.centerY - (this.radius + buffer),
      2 * (this.radius + buffer),
      2 * (this.radius + buffer));
  }

  this.mouseHover = function() {
    return (mouseX < this.centerX + this.radius &&
      mouseX > this.centerX - this.radius &&
      mouseY > this.centerY - this.radius &&
      mouseY < this.centerY + this.radius);
  }

  this.draw = function() {
    for (var i = 0; i < this.numLines; i++) {
      var xpos1 = floor(random(this.centerX - this.radius, this.centerX + this.radius));
      var ypos1 = this.centerY - this.radius;

      var xpos2 = xpos1;
      var ypos2 = this.centerY + this.radius;

      // Set the color for the lines.
      stroke(this.baseColorVal + this.colorValStep * sin(frameCount * 0.01),
        this.baseColorVal + this.colorValStep * sin(frameCount * 0.021),
        this.baseColorVal + this.colorValStep * sin(frameCount * 0.012), 15);

      line(xpos1, ypos1, xpos2, ypos2);

      xpos1 = this.centerX - this.radius;
      ypos1 = floor(random(this.centerY - this.radius, this.centerY + this.radius));

      xpos2 = this.centerX + this.radius;
      ypos2 = ypos1;


      // Set the color for the lines.
      stroke(this.baseColorVal + this.colorValStep * sin(frameCount * 0.01),
        this.baseColorVal + this.colorValStep * sin(frameCount * 0.021),
        this.baseColorVal + this.colorValStep * sin(frameCount * 0.012), 15)

      line(xpos1, ypos1, xpos2, ypos2);

      if (this.coverTracks) {
        xpos1 = floor(random(this.centerX - this.radius, this.centerX + this.radius));
        ypos1 = this.centerY - this.radius;

        xpos2 = xpos1;
        ypos2 = this.centerY + this.radius;

        stroke(this.backgroundColor);

        line(xpos1, ypos1, xpos2, ypos2);

        xpos1 = this.centerX - this.radius;
        ypos1 = floor(random(this.centerY - this.radius, this.centerY + this.radius));

        xpos2 = this.centerX + this.radius;
        ypos2 = ypos1;

        stroke(this.backgroundColor);

        line(xpos1, ypos1, xpos2, ypos2);
      }
    }
  }
}
