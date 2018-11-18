const BACKGROUNDCOLOR = [27, 38, 40];
const MENURADIUS = 50;

let circArray = [],
    triangleArray = [],
    squareArray = [],
    bigTriangles = [],
    bigCircles = [],
    arrangeArray = [];

let hoverNum = 10,
    bigNum = 1,
    numCircles = 20;

let inMenu = true,
    menu1Pressed = false,
    menu2Pressed = false,
    trianglePressed = false,
    circlePressed = false,
    squarePressed = false,
    inArrange = false,
    inWatchTriangle = false,
    inWatchCircle = false,
    inWatchSquare = false,
    inArrangeTriangle = false,
    inArrangeCircle = false,
    inArrangeSquare = false;

var font,
    g,
    d;

function preload() {
  font = loadFont('FreeSans.otf');
}

/**
 * Setup canvas, colors, and needed objects.
 *
 * Set the size of the canvas, colors, and stroke. Also, instantiate objects, such as, the
 * the shapes for the menu, shapes for the arrange and watch options, and menu headings.
 * These are placed in their initial positions here.
 */
function setup() {
  cnv = createCanvas(800, 800);

  cnv.mouseWheel(changeSize);
  g = 100;
  d = 100;

  background(BACKGROUNDCOLOR);
  stroke(255, 255, 255, 15);
  smooth();

  // Create the shapes for the title menu.
  let menuShapeBuffer = 100;
  menuTriangle = new Triangle(width / 4 - 20, height / 2 + menuShapeBuffer, MENURADIUS, true);
  menuCircle = new Circle(width / 2, height / 2 + menuShapeBuffer, MENURADIUS, true);
  menuSquare = new Square(3 * width / 4 + 20, height / 2 + menuShapeBuffer, MENURADIUS, true);
  
  // Create the menu item headers.
  let menuItemBuffer = 415;
  menuItem1 = new MenuItem('ARRANGE', width * 0.07, height * 0.35, 65);
  menuItem2 = new MenuItem('WATCH', width * 0.1 + menuItemBuffer, height * 0.35, 65);
  exitItem = new MenuItem('EXIT', width - 140, height - 30, 50);

  for (i = 0; i < 5; i++) {
  	bigTriangles.push(new Triangle(width / 2, height / 2, width / 2, false));
  }
  
  for (j = 0; j < numCircles; j++) {
  	bigCircles.push(new Circle(width / 2, height / 2, width / 2, false));
  }

  bigCircle = new Circle(width / 2, height / 2, width / 2, false);
  bigSquare = new Square(width / 2, height / 2, width / 2, false);
}

function mouseWheel() {
  g += 10;
}

function resetMouseWheel() {
	g = 100;
  d = 100;
}

function changeSize(event) {
  if (event.deltaY > 0) {
    d += 10;
  } else if (d > 0) {
    d -= 10;
  }
}

function keyPressed() {
	if (keyCode == UP_ARROW) {
    d += 10;
  } else if (keyCode == DOWN_ARROW && d > 0) {
    d -= 10;
  }
}

/**
 * Draw to the canvas.
 *
 * Denpending on where the user is within the program, draw the appropriate items to the
 * canvas. There are three main sequences to draw: the title menu, the arrange program, 
 * and the watch proggram.
 */
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

/**
 * Check for mouse press and take the appropriate action.
 *
 * The main way the user interacts is through mouse presses. Depending on where on the screen,
 * and on what has already been selected, this press can initiate various actions.
 */
function mousePressed() {

  // If the user is in the arrange subprogram, then they are either trying to exit and return to
  // the main menu, or place a shape. The shape placed is dependent on which arrange subpgrogram
  // they are in: triangle, circle, or square.
  if (inArrangeTriangle) {
    if (exitItem.mouseHover()) {
      resetMenuTruths();
      resetMouseWheel();
      arrangeArray = [];
    } else {
    	arrangeArray.push(new Triangle(mouseX, mouseY, d, false));
    }
  } else if (inArrangeCircle) {
    if (exitItem.mouseHover()) {
      resetMenuTruths();
       resetMouseWheel();
      arrangeArray = [];
    } else {
    	arrangeArray.push(new Circle(mouseX, mouseY, d, false));
    }
  } else if (inArrangeSquare) {
    if (exitItem.mouseHover()) {
      resetMenuTruths();
       resetMouseWheel();
      arrangeArray = [];
    } else {
    	arrangeArray.push(new Square(mouseX, mouseY, d, false));
    }
  }
  
  // If the user is in the watch subprogram and they click exit, then exit to the main menu.
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


  // The user is not within either subprogram and thus, are at the main menu. In order to select
  // a subprogram, they must choose both a subprogram and a shape. Only one option from each can
  // be selected at a time.
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
  
  // If both a subprogram and a shape have been chosen, then set the appropriate boolean
  // variables so that those can be loaded and drawn to the canvas.
  if (menu1Pressed && inMenu) {
    if (trianglePressed) {
      background(BACKGROUNDCOLOR);
      inArrangeTriangle = true;
      inMenu = false;
    } else if (circlePressed) {
      background(BACKGROUNDCOLOR);
      inArrangeCircle = true;
      inMenu = false;
    } else if (squarePressed) {
      background(BACKGROUNDCOLOR);
      inArrangeSquare = true;
      inMenu = false;
    }
  } else if (menu2Pressed && inMenu) {
    if (trianglePressed) {
      background(BACKGROUNDCOLOR);
      inWatchTriangle = true;
      inMenu = false;
    } else if (circlePressed) {
      background(BACKGROUNDCOLOR);
      inWatchCircle = true;
      inMenu = false;
    } else if (squarePressed) {
      background(BACKGROUNDCOLOR);
      inWatchSquare = true;
      inMenu = false;
    }
  }
}

/**
 * Reset all of the boolean variables and background color.
 *
 * This resets all boolean variables and background color. This is done when the user exits a
 * subprogram and returns to the main menu.
 */
function resetMenuTruths() {
  background(BACKGROUNDCOLOR)
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
  for (let i = 0; i < arrangeArray.length; i++) {
    arrangeArray[i].draw();
  }
  
  exitItem.display(false, false);
}

function drawBigTriangle() {
  for(let j = 0; j < bigTriangles.length; j++) {
    push();
    
  	for (let i = 0; i < bigNum; i++) {
      let cT = bigTriangles[j];
      cT.setCenter(-width / 4, -height / 4);
      cT.setRadius((width / 2) * sin(frameCount * 0.01));
      push();
      translate(width / 2 , 
                height / 2);
      rotate(frameCount * 1000);
      cT.draw();
    }
    
    pop();
  }
  
  exitItem.display(false, false);
}

function drawBigCirc() {
  
  let circle = bigCircles[0];
  let baseRadius = 50;
  let stepRadius = 50;
  
  let numRows = 1;
  for (let i = 0; i < 10; i++) {
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
  for (let i = 0; i < bigNum; i++) {
    bigSquare.setCenter(i * (width / bigNum), -i * (height / bigNum));
    bigSquare.setRadius(width / 4 + (width / 4) * sin(frameCount * 0.01));
    push();
    translate(width / 2, height / 2);
    rotate(frameCount * 0.01);
    bigSquare.draw();
    pop();
  }
  
  exitItem.display(false, false);
}

function drawCircleHover() {
  let angle;
  let xpos;
  let ypos;
  let r;

  for (let i = 0; i < 1; i++) {
    angle = random(0, 2 * PI);
    r = floor(random(0, 2 * menuCircle.getRadius()));
    xpos = menuCircle.getCenterX() + r * cos(angle);
    ypos = menuCircle.getCenterY() + r * sin(angle);

    if (circArray.length == hoverNum) {
      let removed = circArray.shift();
      removed.cover();
    }

    circArray.push(new Circle(xpos, ypos, menuCircle.getRadius(), true))
  }

  for (let j = 0; j < circArray.length; j++) {
    circArray[j].draw();
  }
}

function drawSquareHover() {
  let xpos;
  let ypos;

  let x = menuSquare.getCenterX();
  let y = menuSquare.getCenterY();
  let radius = menuSquare.getRadius();

  for (let i = 0; i < 1; i++) {
    xpos = floor(random(x - radius, x + radius));
    ypos = floor(random(y - radius, y + radius));

    if (squareArray.length == hoverNum) {
      let removed = squareArray.shift();
      removed.cover();
    }

    squareArray.push(new Square(xpos, ypos, MENURADIUS, true));
  }

  for (let j = 0; j < squareArray.length; j++) {
    squareArray[j].draw();
  }
}

function drawTriangleHover() {
  let x = menuTriangle.getCenterX();
  let y = menuTriangle.getCenterY();
  let radius = menuTriangle.getRadius();

  let ax = x;
  let ay = y - radius;
  let bx = x + radius;
  let by = y + radius;
  let cx = x - radius;
  let cy = y + radius;
  let angle;
  let xpos;
  let ypos;
  let u1;
  let u2;
  let r;

  for (let i = 0; i < 5; i++) {
    u1 = random();
    u2 = random();

    xpos = (1 - sqrt(u1)) * ax + (sqrt(u1) * (1 - u2)) * bx + (sqrt(u1) * u2) * cx
    ypos = (1 - sqrt(u1)) * ay + (sqrt(u1) * (1 - u2)) * by + (sqrt(u1) * u2) * cy

    if (triangleArray.length == hoverNum) {
      let removed = triangleArray.shift();
      removed.cover();
    }

    triangleArray.push(new Triangle(xpos, ypos, radius));
  }

  for (let j = 0; j < triangleArray.length; j++) {
    triangleArray[j].draw();
  }
}

function resetTriangleHover() {
  for (let k = 0; k < triangleArray.length; k++) {
		triangleArray[k].cover();
  }
  
  for (k = 0; k < squareArray.length; k++) {
    triangleArray.shift();
  }
}

function resetCircleHover() {
  for (let k = 0; k < circArray.length; k++) {
		circArray[k].cover();
  }
  
  for (k = 0; k < circArray.length; k++) {
    circArray.shift();
  }
}

function resetSquareHover() {
  for (let k = 0; k < squareArray.length; k++) {
    squareArray[k].cover()
  }
  
  for (k = 0; k < squareArray.length; k++) {
    squareArray.shift();
  }
}

function triPoint(x1, y1, x2, y2, x3, y3, px, py) {

  // get the area of the triangle
  let areaOrig = abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));

  // get the area of 3 triangles made between the point
  // and the corners of the triangle
  let area1 = abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py));
  let area2 = abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py));
  let area3 = abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py));

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
    let threshold = 20;
    let p1;
    let p2;
    let points;

    if (wiggle) {
      let randomX = random(-this.wiggleX, this.wiggleX)
      let randomY = random(-this.wiggleY, this.wiggleY)
      let randomFS = random(-7, 7);

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

    let letterCount = 0;
    let letterArray = [];
    let currentArray = [];
    for (let k = 0; k < points.length - 1; k++) {
      p1 = points[k];
      p2 = points[k + 1];

      if (dist(p1.x, p1.y, p2.x, p2.y) > threshold) {
        let newArray = currentArray.slice();
        letterArray.push(newArray);
        currentArray = [];
      } else {
        currentArray.push(p1);
      }
    }

    letterArray.push(currentArray);

    if (cover) {
    	fill(BACKGROUNDCOLOR);
    	rect(this.bbox.x - 80, this.bbox.y - 80, this.bbox.w + 160, this.bbox.h + 160);
    } else {
      for (let letter = 0; letter < letterArray.length; letter++) {
        for (let i = 0; i < letterArray[letter].length - 1; i++) {
          for (let j = 0; j < 2; j++) {
            let currentLetter = letterArray[letter];
            p1 = currentLetter[floor(random(currentLetter.length - 1))];
            p2 = currentLetter[floor(random(currentLetter.length - 1))];

            stroke(BACKGROUNDCOLOR, 5);

            line(p1.x, p1.y, p2.x, p2.y);
          }
        }
    	}
    }

    for (let letter = 0; letter < letterArray.length; letter++) {
      for (let i = 0; i < letterArray[letter].length - 1; i++) {
        for (let j = 0; j < 2; j++) {
          let currentLetter = letterArray[letter];
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
    let buffer = 5;
    fill(this.backgroundColor);
    triangle(this.centerX,
      this.centerY - (this.radius + buffer),
      this.centerX - (this.radius + buffer),
      this.centerY + (this.radius + buffer),
      this.centerX + (this.radius + buffer),
      this.centerY + (this.radius + buffer));
  }

  this.mouseHover = function() {
    let x1 = this.centerX - this.radius;
    let y1 = this.centerY + this.radius;
    let x2 = this.centerX + this.radius;
    let y2 = this.centerY + this.radius;
    let x3 = this.centerX;
    let y3 = this.centerY - this.radius;

    return triPoint(x1, y1, x2, y2, x3, y3, mouseX, mouseY);
  }

  this.draw = function() {
    for (let i = 0; i < this.numLines; i++) {
      let xpos1 = this.centerX;
      let ypos1 = this.centerY - this.radius;

      let xpos2 = floor(random(this.centerX - this.radius, this.centerX + this.radius));
      let ypos2 = this.centerY + this.radius;

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
    let buffer = 5;
    fill(this.backgroundColor);
    ellipse(this.centerX, this.centerY, 2 * (this.radius + buffer));
  }

  this.mouseHover = function() {
    return dist(mouseX, mouseY, this.centerX, this.centerY) < this.radius;
  }

  this.draw = function() {
    for (let i = 0; i < this.numLines; i++) {
      // Find a random point on a circle at one end.
      let angle1 = random(0, 2 * PI);
      let xpos1 = this.centerX + this.radius * cos(angle1);
      let ypos1 = this.centerY + this.radius * sin(angle1);

      // Find another random point on the circle.
      let angle2 = random(0, 2 * PI);
      let xpos2 = this.centerX + this.radius * cos(angle2);
      let ypos2 = this.centerY + this.radius * sin(angle2);

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
    let buffer = 5;
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
    for (let i = 0; i < this.numLines; i++) {
      let xpos1 = floor(random(this.centerX - this.radius, this.centerX + this.radius));
      let ypos1 = this.centerY - this.radius;

      let xpos2 = xpos1;
      let ypos2 = this.centerY + this.radius;

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
