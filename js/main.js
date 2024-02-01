class Player {
  constructor() {
    this.width = 5;
    this.height = 10;
    this.positionX = 50;
    this.positionY = 0;
    this.domElm = null;
    this.score = 0;

    this.createDomElement();
  }
  createDomElement() {
    this.domElm = document.createElement("div");

    this.domElm.setAttribute("id", "player");
    this.domElm.style.width = this.width + "vw";
    this.domElm.style.height = this.height + "vh";
    this.domElm.style.left = this.positionX + "vw";
    this.domElm.style.bottom = this.positionY + "vh";

    const boardElm = document.getElementById("playingfield");
    boardElm.appendChild(this.domElm);
  }
  moveLeft() {
    if (this.positionX > 0) {
      this.positionX--;
      this.domElm.style.left = this.positionX + "vw";
    }
  }
  moveRight() {
    if (this.positionX + this.width < 100) {
      this.positionX++;
      this.domElm.style.left = this.positionX + "vw";
    }
  }
  moveDown() {
    if (this.positionY > 0) {
      this.positionY--;
      this.domElm.style.bottom = this.positionY + "vh";
    }
  }
  moveUp() {
    if (this.positionY < 90) {
      this.positionY++;
      this.domElm.style.bottom = this.positionY + "vh";
    }
  }
  increaseScore() {
    this.score++;
    let scorePoints = document.querySelector(`#playerPoints`);
    scorePoints.textContent = `Score:${this.score}`;
  }
}

class Collectible {
  constructor() {
    this.width = 3;
    this.height = 5;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
    this.positionY = 100;
    this.domElm = null;
    this.createDomElement();
  }
  createDomElement() {
    this.domElm = document.createElement("div");
    this.domElm.setAttribute("class", "collectible");
    this.domElm.style.width = this.width + "vw";
    this.domElm.style.height = this.height + "vh";
    this.domElm.style.left = this.positionX + "vw";
    this.domElm.style.bottom = this.positionY + "vh";

    const playingfieldElm = document.getElementById("playingfield");
    playingfieldElm.appendChild(this.domElm);
  }

  moveDown() {
    if (this.positionY > 0) {
      this.positionY--;
      this.domElm.style.bottom = this.positionY + "vh";
    } else {
      gameOver();
      removeItem(this);
    }
  }
}
function gameOver() {
  location.href = "gameover.html";
}

const player = new Player();
const Collectibles = [];

setInterval(() => {
  const newCollectible = new Collectible();
  Collectibles.push(newCollectible);
}, 3000);

setInterval(() => {
  Collectibles.forEach((collectible) => {
    collectible.moveDown();

    if (
      player.positionX < collectible.positionX + collectible.width &&
      player.positionX + player.width > collectible.positionX &&
      player.positionY < collectible.positionY + collectible.height &&
      player.positionY + player.height > collectible.positionY
    ) {
      removeItem(collectible);
      player.increaseScore();
    }
  });
}, 30);
function removeItem(item) {
  const itemIndex = Collectibles.indexOf(item);
  if (itemIndex !== -1) {
    Collectibles.splice(itemIndex, 1);
  }

  const boardElm = document.getElementById("playingfield");
  boardElm.removeChild(item.domElm);
}
// Implement score system
const keysPressed = {};

document.addEventListener("keydown", (e) => {
  if (
    e.code === "ArrowLeft" ||
    e.code === "ArrowRight" ||
    e.code === "ArrowUp" ||
    e.code === "ArrowDown"
  ) {
    keysPressed[e.code] = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (
    e.code === "ArrowLeft" ||
    e.code === "ArrowRight" ||
    e.code === "ArrowUp" ||
    e.code === "ArrowDown"
  ) {
    keysPressed[e.code] = false;
  }
});

setInterval(() => {
  const diagonalSpeed = 1.5;

  if (keysPressed["ArrowLeft"] && keysPressed["ArrowUp"]) {
    player.moveLeft();
    player.moveUp();
  } else if (keysPressed["ArrowLeft"] && keysPressed["ArrowDown"]) {
    player.moveLeft();
    player.moveDown();
  } else if (keysPressed["ArrowRight"] && keysPressed["ArrowUp"]) {
    player.moveRight();
    player.moveUp();
  } else if (keysPressed["ArrowRight"] && keysPressed["ArrowDown"]) {
    player.moveRight();
    player.moveDown();
  } else {
    if (keysPressed["ArrowLeft"]) {
      player.moveLeft();
    } else if (keysPressed["ArrowRight"]) {
      player.moveRight();
    }
    if (keysPressed["ArrowUp"]) {
      player.moveUp();
    } else if (keysPressed["ArrowDown"]) {
      player.moveDown();
    }
  }
}, 30);
