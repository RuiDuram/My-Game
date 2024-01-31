class Player {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.positionX = 50;
    this.positionY = 0;
    this.domElm = null;

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
}
class Collectible {
  constructor() {
    this.width = 5;
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
    this.positionY--;
    this.domElm.style.bottom = this.positionY + "vh";
  }
  // Implement left spawning
}
const player = new Player();
const Collectibles = [];

setInterval(() => {
  const newCollectible = new Collectible();
  Collectibles.push(newCollectible);
}, 3000);

setInterval(() => {
  Collectibles.forEach((collectibleInstance) => {
    collectibleInstance.moveDown();
  });
}, 50);
//                                                              Implement score system

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    player.moveLeft();
  } else if (e.code === "ArrowRight") {
    player.moveRight();
  } else if (e.code === "ArrowUp") {
    player.moveUp();
  } else if (e.code === "ArrowDown") {
    player.moveDown();
  }
});
