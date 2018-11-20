const BACKGROUNDCOLOR = [27, 38, 40];
const MENURADIUS = 50;

// Arrays for all hovering and arrange animations.
let circArray = [],
    triangleArray = [],
    squareArray = [],
    watchTriangles = [],
    watchCircles = [],
    arrangeArray = [];

// Variables for keeping track of what has been pressed, and where the user is within the program.
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

// Variables for keeping track of mouse wheel usage. The mouse wheel can be used to change the
// size of the shapes in the Arrange subprogram.
var font, g, d;

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
  	watchTriangles.push(new Triangle(width / 2, height / 2, width / 2, false));
  }
  
  for (j = 0; j < 20; j++) {
  	watchCircles.push(new Circle(width / 2, height / 2, width / 2, false));
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
    drawWatchTriangle();
  } else if (inWatchCircle) {
    drawWatchCirc();
  } else if (inWatchSquare) {
    drawWatchSquare();
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

/**
 * Display and logic of main menu.
 *
 * Controls what is displayed on the menu (depending on what the user has pressed and/or what
 * they are currently hovering the mouse over. There are two main things a user can choose at 
 * the main menu: the shape they want to use, and the way they want to use it (arrange or 
 * watch).
 */
function menu() {
  noStroke();

  // If the one of the two menu items have been pressed, have that item react (by shaking on 
  // the canvas). Only one can be shaking at a time.
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
  
  // If the user presses one of the shapes, have that shape continue to shake.
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
    
    // If the user hovers over a shape, have the shape shake.
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

/**
 * Draw all shapes in the arrange array.
 *
 * This function executes when the user has selected to arrange a shape. The arrange array
 * contains shapes which have been added by the user through clicks on the screen.
 */
function arrange() {
  for (let i = 0; i < arrangeArray.length; i++) {
    arrangeArray[i].draw();
  }
  
  exitItem.display(false, false);
}

/**
 * Draw triangles to canvas.
 *
 * The user wishes to watch a display of triangles. This function displays this.
 */
function drawWatchTriangle() {
  for(let j = 0; j < watchTriangles.length; j++) {
    let cT = watchTriangles[j];
    cT.setCenter(-width / 4, -height / 4);
    cT.setRadius((width / 2) * sin(frameCount * 0.01));
    
    push();
    translate(width / 2, height / 2);
    rotate(frameCount * 1000);
    cT.draw();
    pop();
  }
  
  exitItem.display(false, false);
}

/**
 * Draw circles to canvas.
 *
 * The user wishes to watch a display of circles. This function displays this.
 */
function drawWatchCirc() {
  let circle = watchCircles[0],
      baseRadius = 50,
      stepRadius = 50,
      numRows = 1;
  
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

/**
 * Draw squares to canvas.
 *
 * The user wishes to watch a display of squares. This function displays this.
 */
function drawWatchSquare() {
  bigSquare.setCenter(0, 0);
  bigSquare.setRadius(width / 4 + (width / 4) * sin(frameCount * 0.01));
  
  push();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.01);
  bigSquare.draw();
  pop();
  
  exitItem.display(false, false);
}

/**
 * Draw the animation for when the user hovers over the circle shape.
 *
 * In the main menu, when the user hovers over the circle, it should animate so that
 * a number of circles are drawn randomly around the cursor.
 */
function drawCircleHover() {
  let angle, xpos, ypos, r;
  let hoverNum = 20;

  // Pick a random point within a circle around the cursor.
  angle = random(0, 2 * PI);
  r = floor(random(0, 2 * menuCircle.getRadius()));
  xpos = menuCircle.getCenterX() + r * cos(angle);
  ypos = menuCircle.getCenterY() + r * sin(angle);

  // Remove the oldest circle that has been displayed in the animation.
  if (circArray.length == hoverNum) {
    let removed = circArray.shift();
    removed.cover();
  }

  // Push a new circle to the array.
  circArray.push(new Circle(xpos, ypos, menuCircle.getRadius(), true))

  // Draw the random circles to the screen.
  for (let j = 0; j < circArray.length; j++) {
    circArray[j].draw();
  }
}

/**
 * Draw the animation for when the user hovers over the square shape.
 *
 * In the main menu, when the user hovers over the square, it should animate so that
 * a number of squares are drawn randomly around the cursor.
 */
function drawSquareHover() {
  let xpos, ypos;

  let hoverNum = 20,
      x = menuSquare.getCenterX(),
      y = menuSquare.getCenterY(),
      radius = menuSquare.getRadius();


  // Pick a random location within a square around the cursor.
  xpos = floor(random(x - radius, x + radius));
  ypos = floor(random(y - radius, y + radius));

  // Remove the oldest square that has been dispalyed in the animation.
  if (squareArray.length == hoverNum) {
    let removed = squareArray.shift();
    removed.cover();
  }

  // Push a new square to be displayed.
  squareArray.push(new Square(xpos, ypos, MENURADIUS, true));


  // Draw all the squares to the screen.
  for (let j = 0; j < squareArray.length; j++) {
    squareArray[j].draw();
  }
}

/**
 * Draw the animation for when the user hovers over the triangle shape.
 *
 * In the main menu, when the user hovers over the triangle, it should animate so that
 * a number of triangles are drawn randomly around the cursor.
 */
function drawTriangleHover() {
  let hoverNum = 20,
      x = menuTriangle.getCenterX(),
      y = menuTriangle.getCenterY(),
      radius = menuTriangle.getRadius();

  // Variables used to make sure random point is within the area of a triangle.
  let ax = x,
      ay = y - radius,
      bx = x + radius,
      by = y + radius,
      cx = x - radius,
      cy = y + radius,
      angle,
      xpos,
      ypos,
      u1,
      u2,
      r;

  u1 = random();
  u2 = random();

  // Get a random position within the shape of a triangle.
  xpos = (1 - sqrt(u1)) * ax + (sqrt(u1) * (1 - u2)) * bx + (sqrt(u1) * u2) * cx
  ypos = (1 - sqrt(u1)) * ay + (sqrt(u1) * (1 - u2)) * by + (sqrt(u1) * u2) * cy

  // Remove the oldest triangle.
  if (triangleArray.length == hoverNum) {
    let removed = triangleArray.shift();
    removed.cover();
  }

  // Push a new triangle.
  triangleArray.push(new Triangle(xpos, ypos, radius));

  // Display the triangles for the hover animation.
  for (let j = 0; j < triangleArray.length; j++) {
    triangleArray[j].draw();
  }
}

/**
 * Reset the triangle array used in the hover animation.
 *
 * Cover all of the triangles which are currently being displayed, and then clear the
 * triangle array. 
 */
function resetTriangleHover() {
  for (let k = 0; k < triangleArray.length; k++) {
		triangleArray[k].cover();
  }
  
  for (k = 0; k < triangleArray.length; k++) {
    triangleArray.shift();
  }
}

/**
 * Reset the circle array used in the hover animation.
 *
 * Cover all of the circles which are currently being displayed, and then clear the
 * circle array. 
 */
function resetCircleHover() {
  for (let k = 0; k < circArray.length; k++) {
		circArray[k].cover();
  }
  
  for (k = 0; k < circArray.length; k++) {
    circArray.shift();
  }
}

/**
 * Reset the square array used in the hover animation.
 *
 * Cover all of the squares which are currently being displayed, and then clear the
 * square array. 
 */
function resetSquareHover() {
  for (let k = 0; k < squareArray.length; k++) {
    squareArray[k].cover()
  }
  
  for (k = 0; k < squareArray.length; k++) {
    squareArray.shift();
  }
}

/**
 * Check if a point is within the area of a described triangle.
 *
 * If a point is within a described triangles, then the area of the total triangle is equal
 * to the area of the sum of the triangles formed by the point and the corners of the triangle.
 *
 * @param {float} x1 x-coordinate of first point of triangle.
 * @param {float} y1 y-coordinate of first point of triangle.
 * @param {float} x2 x-coordinate of second point of triangle.
 * @param {float} y2 y-coordinate of second point of triangle.
 * @param {float} x3 x-coordinate of third point of triangle.
 * @param {float} y3 y-coordinate of third point of triangle.
 * @param {float} px x-coordinate of point to check.
 * @param {float} py y-coordinate of point to check.
 *
 * @return {boolean} Whether the point is in the triangle or not.
 */
function triPoint(x1, y1, x2, y2, x3, y3, px, py) {

  // Calculate the area of the triangle.
  let areaOrig = abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));

  // Calculate the area of 3 triangles made between the point
  // and the corners of the triangle.
  let area1 = abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py));
  let area2 = abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py));
  let area3 = abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py));

  if (area1 + area2 + area3 == areaOrig) {
    return true;
  }
  return false;
}

/**
 * Menu item object displayed at main menu.
 *
 * An object used to display title and options at the menu. Can designate a word to be
 * associated with the menu item, and then the object can be displayed in the style of the
 * rest of the program.
 *
 * @param {string} word Word to be displayed.
 * @param {float} x float x-coordinate for location of word on canvas.
 * @param {float} y float y-coordinate for location of word on canvas.
 * @param {integer} fs Font size for the word.
 */
function MenuItem(word, x, y, fs = 10) {
  this.centerX = x;
  this.centerY = y;
  this.title = word;
  this.fontsize = fs;
  this.wiggleX = 7;
  this.wiggleY = 7;
  this.baseColorVal = 100;
  this.colorValStep = 75;
  this.bbox = font.textBounds(this.title, this.centerX, this.centerY, this.fontsize);

	/**
 	 * Get the bounding box for the menu item.
 	 *
 	 * @return The boudning box for the menu item.
 	 */
  this.getBox = function() {
    return this.bbox;
  }

  /**
 	 * Get center x-coordinate of the menu item.
 	 *
 	 * @return The center x-coordinate.
 	 */
  this.getCenterX = function() {
    return this.centerX;
  }

  /**
 	 * Get center y-coordinate of the menu item.
 	 *
 	 * @return The center y-coordinate.
 	 */
  this.getCenterY = function() {
    return this.centerY;
  }

  /**
 	 * Set the amount the menu item should wiggle when hovered.
 	 *
 	 * @param {float} x The maximum x-distance to wiggle.
   * @param {float} y The maximum y-distance to wiggle.
 	 */
  this.setWiggle = function(x, y) {
    this.wiggleX = x;
    this.wiggleY = y;
  }

  /**
 	 * Check if the mouse is hovering one the menu item.
 	 *
 	 * @return Whether the mouse is hovering over the item.
 	 */
  this.mouseHover = function() {
    return (mouseX > this.bbox.x &&
      mouseX < this.bbox.x + this.bbox.w &&
      mouseY > this.bbox.y &&
      mouseY < this.bbox.y + this.bbox.h);
  }

  /**
 	 * Display the menu item.
   *
   * Display the menu item to the canvas. This is done in the same style as the rest of the
   * program, i.e., it is constructed out of lines. 
 	 *
 	 * @param {boolean} wiggle Whether the menu item should wiggle or not.
   * @param {boolean} cover Whether to cover the menu item or not. 
 	 */
  this.display = function(wiggle = false, cover = true) {
    let threshold = 20;
    let p1, p2, points;

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

/**
 * The triangle shape.
 *
 * This object is the triangle shape for the program. All drawing of triangles to the
 * canvas use this object, but with varying sizes.
 *
 * @param {float} x x-coordinate for the triangle.
 * @param {float} y y-coordinate for the triangle.
 * @param {float} r Radius of the triangle.
 * @param {boolean} ct Whether to cover past lines as triangle is drawn.
 */
function Triangle(x = width / 2, y = height / 2, r = 10, ct = true) {
  this.centerX = x;
  this.centerY = y;
  this.radius = r;
  this.coverTracks = ct;
  this.numLines = 50;
  this.baseColorVal = 150;
  this.colorValStep = 75;
  this.backgroundColor = [27, 38, 40, 255];

  /**
   * Set the center of the triangle.
   *
   * @param {float} x x-coordinate of the center.
   * @param {float} y y-coordinate of the center.
   */
  this.setCenter = function(x, y) {
    this.centerX = x;
    this.centerY = y;
  }

  /**
   * Set the center of the triangle.
   *
   * @param {float} r Radius of the triangle.
   */
  this.setRadius = function(r) {
    this.radius = r;
  }

  /**
   * Set whether the triangle should cover past lines drawn.
   *
   * @param {boolean} ct Whether past lines should be covered.
   */
  this.setCoverTracks = function(ct) {
    this.coverTracks = ct;
  }

  /**
   * Get the center x-coordinate of the triangle.
   *
   * @return The x-coordinate of the center.
   */
  this.getCenterX = function() {
    return this.centerX;
  }

  /**
   * Get the center y-coordinate of the triangle.
   *
   * @return The y-coordinate of the center.
   */
  this.getCenterY = function() {
    return this.centerY;
  }

  /**
   * Get the radius of the triangle.
   *
   * @return The radius of the triangle.
   */
  this.getRadius = function() {
    return this.radius;
  }

  /**
   * Cover the triangle.
   *
   * This covers all past lines of the triangle. The color is set to the background color.
   */
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

  /**
   * Check whether the mouse is hovering within the triangle.
   *
   * @return {boolean} Whether the mouse is within the triangle.
   */
  this.mouseHover = function() {
    let x1 = this.centerX - this.radius;
    let y1 = this.centerY + this.radius;
    let x2 = this.centerX + this.radius;
    let y2 = this.centerY + this.radius;
    let x3 = this.centerX;
    let y3 = this.centerY - this.radius;

    return triPoint(x1, y1, x2, y2, x3, y3, mouseX, mouseY);
  }

  /**
   * Draw the triangle to the canvas.
   * 
   * Draw this triangle object to the canvas. Also cover tracks if that is set to true.
   */
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

/**
 * The circle shape.
 *
 * This object is the circle shape for the program. All drawing of circles to the
 * canvas use this object, but with varying sizes.
 *
 * @param {float} x x-coordinate for the circle.
 * @param {float} y y-coordinate for the circle.
 * @param {float} r Radius of the circle.
 * @param {boolean} ct Whether to cover past lines as circle is drawn.
 */
function Circle(x = width / 2, y = height / 2, r = 10, ct = true) {
  this.centerX = x;
  this.centerY = y;
  this.radius = r;
  this.coverTracks = ct;
  this.numLines = 50;
  this.baseColorVal = 150;
  this.colorValStep = 75;
  this.backgroundColor = [27, 38, 40, 255];

  /**
   * Set the center of the circle.
   *
   * @param {float} x x-coordinate of the center.
   * @param {float} y y-coordinate of the center.
   */
  this.setCenter = function(x, y) {
    this.centerX = x;
    this.centerY = y;
  }

  /**
   * Set the radius of the circle.
   *
   * @param {float} r The radius of the circle.
   */
  this.setRadius = function(r) {
    this.radius = r;
  }

  /**
   * Set whether to cover past lines drawn.
   *
   * @param {boolean} ct Whether to cover past lines or not.
   */
  this.setCoverTracks = function(ct) {
    this.coverTracks = ct;
  }

  /**
   * Get the x-coordinate of the center.
   *
   * @return {float} The x-coordinate of the center.
   */
  this.getCenterX = function() {
    return this.centerX;
  }

  /**
   * Get the y-coordinate of the center.
   *
   * @return {float} The y-coordinate of the center.
   */
  this.getCenterY = function() {
    return this.centerY;
  }

  /**
   * Get the radius of the circle.
   *
   * @return {float} The radius of the circle.
   */
  this.getRadius = function() {
    return this.radius;
  }

  /**
   * Cover the circle.
   *
   * Covers all past lines drawn for the circle. Replaces with the background color.
   */
  this.cover = function() {
    let buffer = 5;
    fill(this.backgroundColor);
    ellipse(this.centerX, this.centerY, 2 * (this.radius + buffer));
  }

  /**
   * Check whether the mouse is hovering over the circle.
   *
   * @return {boolean} Whether the mouse is over the circle.
   */
  this.mouseHover = function() {
    return dist(mouseX, mouseY, this.centerX, this.centerY) < this.radius;
  }

  /**
   * Draw the circle.
   *
   * Draw the circle to the canvas. If past lines are to be covered, do that as well.
   */
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

/**
 * The square shape.
 *
 * This object is the square shape for the program. All drawing of squares to the
 * canvas use this object, but with varying sizes.
 *
 * @param {float} x x-coordinate for the square.
 * @param {float} y y-coordinate for the square.
 * @param {float} r Radius of the square.
 * @param {boolean} ct Whether to cover past lines as square is drawn.
 */
function Square(x = width / 2, y = height / 2, r = 10, ct = true) {
  this.centerX = x;
  this.centerY = y;
  this.radius = r;
  this.coverTracks = ct;
  this.numLines = 50;
  this.baseColorVal = 150;
  this.colorValStep = 75;
  this.backgroundColor = [27, 38, 40, 255];

  /**
   * Set the center of the square.
   *
   * @param {float} x x-coordinate of the square.
   * @param {float} y y-coordinate of the square.
   */
  this.setCenter = function(x, y) {
    this.centerX = x;
    this.centerY = y;
  }

  /**
   * Set the radius of the square.
   *
   * @param {float} The radius of the square.
   */
  this.setRadius = function(r) {
    this.radius = r;
  }

  /**
   * Set whether to cover past lines of the square.
   *
   * @param {boolean} ct Whether to cover past lines drawn.
   */
  this.setCoverTracks = function(ct) {
    this.coverTracks = ct;
  }

  /**
   * Get the x-coordinate of the center of the square.
   *
   * @return {float} The x-coordinate of the center.
   */
  this.getCenterX = function() {
    return this.centerX;
  }

  /**
   * Get the y-coordinate of the center of the square.
   *
   * @return {float} The y-coordinate of the center.
   */
  this.getCenterY = function() {
    return this.centerY;
  }

  /**
   * Get the radius of the square.
   *
   * @return {float} The radius.
   */
  this.getRadius = function() {
    return this.radius;
  }

  /**
   * Cover the square.
   *
   * Cover all past lines drawn for the square. They are covered with the color of the
   * background.
   */
  this.cover = function() {
    let buffer = 5;
    fill(this.backgroundColor);
    rect(this.centerX - (this.radius + buffer),
      this.centerY - (this.radius + buffer),
      2 * (this.radius + buffer),
      2 * (this.radius + buffer));
  }

  /**
   * Check whether the mouse is hovering over the square.
   *
   * @return {boolean} Whether the mouse is over the square.
   */
  this.mouseHover = function() {
    return (mouseX < this.centerX + this.radius &&
      mouseX > this.centerX - this.radius &&
      mouseY > this.centerY - this.radius &&
      mouseY < this.centerY + this.radius);
  }

  /**
   * Draw the square to the canvas.
   * 
   * Draw the square to the canvas and cover past lines if that coverTracks is set to true.
   */
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
