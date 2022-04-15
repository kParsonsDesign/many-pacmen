// window.onload = () => {
/**
 *  Helpers
 */

// Return random integer function (inclusive)
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}





/**
 *  Bounding Box
 */

// Store bounding box info
let boundingBox = {};
boundingBox.div = document.getElementById('pacBoundary');

// Get bounding box info
function getBounds() {
  boundingBox.width = boundingBox.div.clientWidth; // gets inner width
  boundingBox.height = boundingBox.div.clientHeight; // gets inner height
  boundingBox.offsetTop = boundingBox.div.offsetTop; // gets top from document top
  boundingBox.offsetLeft = boundingBox.div.offsetLeft; // gets left from document left
  boundingBox.offsetBottom = boundingBox.offsetTop + boundingBox.height;
}

// Get bounds based on css and window size
window.onload = getBounds;
// Refresh bounding box info on window.resize
// Have to recalculate xMax and yMax if using this
// window.onresize = getBounds;



// direction.x = left, none, right
// direction.y = up, none, down
// [LeftUp, Left, LeftDown, Up, Down, RightUp, Right, RightDown]

// direction.x = -1, direction.y = -1

// [
//   x0: ['moveLeftUp', 'moveLeft', 'moveLeftDown'],
//   x1: ['moveUp', 'NOT MOVING THIS IS A PROBLEM', 'moveDown'],
//   x2: ['moveRightUp', 'moveRight', 'moveRightDown']
// ]


/**
 *  Pacmen
 */

const imgArray = ['./images/PacMan-open.svg', './images/PacMan-closed.svg'];
const directionArray = ['right', 'left', 'down', 'up'];
const facingArray = [
  ['moveLeftUp', 'moveLeft', 'moveLeftDown'],
  ['moveUp', 'NOT MOVING THIS IS A PROBLEM', 'moveDown'],
  ['moveRightUp', 'moveRight', 'moveRightDown']
];
const velocity = 10;
let moving;

// Store each Pacman info
let pacmen = [];
// each pacman object should be:
/**
 * { // pacman index 0
 *   // no timer necessary, all refresh will be done in one function
 *   size: 'pac size', // future update: size each individually
 *   xMax: 'boundingBox.width - this.size',
 *   yMax: 'boundingBox.height - this.size',
 *   // color: 'ball color', // only use color if changing each color
 *   position: {
 *     x: 'X position',
 *     y: 'Y position'
 *   },
 *   // velocity: { // remove velocity for now (all have same speed)
 *   //   x: 'X velocity',
 *   //   y: 'Y velocity'
 *   // },
 *   direction: { // direction of movement: facingArray[x][y]
 *     x: 'x direction', // 0 for left, 1 for vertical only, 2 for right
 *     y: 'y direction', // 0 for up, 1 for horizontal only, 2 for down
 *   },
 *   facing: '0 through 3', // control which way the image is facing facingArray[facing]
 *   focus: '0 or 1', // 0 for open mouth, 1 for closed mouth
 *   pacImg: 'DOM img reference'
 * }
 */

// Pacman Factory
function makePacman() {
  // set size
  let size = 50;
    // future update
    // make Pac size random between 20px and 50px
    // let size = getRandomInteger(10, 50);
  // assign maximum positions based on ball size
  let xMax = boundingBox.width - size;
  let yMax = boundingBox.height - size;

  /**
      Random color - future update
      // random color
      // hue: 0 - 360
      // saturation: 0% - 100% (gray to full color)
      //    (less than 15 looks very gray)
      // lightness: 0% - 100% (black to full color to white)
      //    (more than 90 looks very white, less than 15 looks very dark)
      let hue = getRandomInteger(0, 360);
      let saturation = getRandomInteger(15, 100);
      let lightness = getRandomInteger(15, 90);
      let color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
   */

  // random start location
  let position = {};
  position.x = Math.floor(Math.random() * boundingBox.width);
  position.y = Math.floor(Math.random() * boundingBox.height);
  if (position.x > xMax) {
    position.x = xMax - 1; // -1 fixes stuck at edge jiggle
  }
  if (position.y > yMax) {
    position.y = yMax - 1; // -1 fixes stuck at edge jiggle
  }

  // random angle of movement
  // high x, low y = more horizontal movement
  // low x, high y = more verical movement
  let velocity = {};
  velocity.x = getRandomInteger(1, 3);
  velocity.y = getRandomInteger(1, 3);

  // initial direction of travel
  let direction = {};
  direction.x = getRandomInteger(-1, 1);
  direction.y = getRandomInteger(-1, 1);
  // check for x = 0 && y = 0 -> no movement in any direction
  if (direction.x === 0 && direction.y === 0) {
    // this interaction of coinTosses results in 45deg movement only
    let coinToss1 = getRandomInteger(0, 1);
    let coinToss2 = getRandomInteger(0, 1);
    if (coinToss1 === 0) {
      direction.x = -1;
    } else {
      direction.x = 1;
    }
    if (coinToss2 === 0) {
      direction.y = -1;
    } else {
      direction.y = 1;
    }
  }

  // set focus (mouth open closed)
  let focus = getRandomInteger(0, 1);
  
  // set image facing property
  let facing = facingArray[direction.x + 1][direction.y + 1];

  // make an actual Pacman on the screen
  let pacImg = document.createElement('img');
  pacImg.style.position = 'absolute';
  pacImg.style.width = `${size}px`;
  pacImg.style.height = `${size}px`;
  pacImg.style.left = `${position.x}px`;
  pacImg.style.top = `${position.y}px`;
  pacImg.src = `${imgArray[focus]}`;
  pacImg.classList = `${facing}`;
  boundingBox.div.appendChild(pacImg);

  // future option to have some Pacmen start as moving

  // send the ball info to the balls storage array
  return { size, xMax, yMax, position, velocity, direction, facing, focus, pacImg };
}

// Make a pacman
function addOnePac() {
  pacmen.push(makePacman());
}
let addPac = document.getElementById('addPacman');
addPac.addEventListener('click', addOnePac);






/**
 *  Movement Functions
 */

// Check collisions
function checkCollisions(pac) {
  // x direction
  if (
    pac.position.x + velocity * pac.direction.x >= pac.xMax ||
    pac.position.x + velocity * pac.direction.x <= 0
  ) {
    pac.direction.x = pac.direction.x * -1;
    pac.pacImg.facing = facingArray[pac.direction.x + 1][pac.direction.y + 1];
    pac.pacImg.classList = `${pac.pacImg.facing}`;
  }

  // y direction
  if (
    pac.position.y + velocity * pac.direction.y >= pac.yMax ||
    pac.position.y + velocity * pac.direction.y <= 0
  ) {
    pac.direction.y = pac.direction.y * -1;
    pac.pacImg.facing = facingArray[pac.direction.x + 1][pac.direction.y + 1];
    pac.pacImg.classList = `${pac.pacImg.facing}`;
  }  
}

// Move all balls
// let animationFrameNum;
function moveAll() {
  pacmen.forEach((pac) => {
    checkCollisions(pac);

    // change focus (chomp mouth)
    pac.focus = (pac.focus + 1) % 2;

    // move pacman
    if (pac.direction.x === 1) {
      pac.position.x += velocity;
    }  
    if (pac.direction.x === -1) {
      pac.position.x -= velocity;
    }  
    
    if (pac.direction.y === 1) {
      pac.position.y += velocity;
    }  
    if (pac.direction.y === -1) {
      pac.position.y -= velocity;
    }  

    // change screen info
    pac.pacImg.style.left = `${pac.position.x}px`;
    pac.pacImg.style.top = `${pac.position.y}px`;
    pac.pacImg.src = imgArray[pac.focus];
  });
  // add a setTimeout to make choppy movement
  // animationFrameNum = requestAnimationFrame(moveAll);
}

// Clear all: should delete all data / refresh
function clearAll() {
  if (moving) {
    clearInterval(moving);
    moving = null;
    runButton.classList.remove('btn-danger');
    runButton.classList.add('btn-success');
    runButton.textContent = 'Start all PacMen';
  }
  pacmen = [];
  boundingBox.div.innerHTML = '';
}






/**
 *
 * User input for movement
 *
 */
const runButton = document.getElementById('runButton');
const clearButton = document.getElementById('clearButton');

function toggle() {
  if (!moving) {
    moving = setInterval(moveAll, 200);
    runButton.classList.remove('btn-success');
    runButton.classList.add('btn-danger');
    runButton.textContent = 'Stop all PacMen';
  } else {
    clearInterval(moving);
    moving = null;
    runButton.classList.remove('btn-danger');
    runButton.classList.add('btn-success');
    runButton.textContent = 'Start all PacMen';
  }
}

// function keyPress(e) {
//   // eslint-disable-next-line default-case
//   switch (e.key) {
//     case 'ArrowRight':
//       direction = 0;
//       break;
//     case 'ArrowLeft':
//       direction = 1;
//       break;
//     case 'ArrowDown':
//       direction = 2;
//       break;
//     case 'ArrowUp':
//       direction = 3;
//       break;
//     case ' ':
//       toggle();
//   }
// }

// function changeDirection(input) {
//   // eslint-disable-next-line default-case
//   switch (input) {
//     case 'right':
//       direction = 0;
//       break;
//     case 'left':
//       direction = 1;
//       break;
//     case 'down':
//       direction = 2;
//       break;
//     case 'up':
//       direction = 3;
//       break;
//     // default:
//     //   direction = 1;
//   }
// }

runButton.addEventListener('click', toggle);
clearButton.addEventListener('click', clearAll);
// pacMan.addEventListener('click', toggle);
// document.addEventListener('keydown', keyPress);



/**
 *
 * Mobile Handler **** update this!!!!!!
 *
 */
// if (boundingBox.offsetBottom > window.innerHeight - 5) {
//   let tempHeight = window.innerHeight - boundingBox.offsetTop - 10;
//   boundingBox.div.setAttribute('height', tempHeight);
// }
