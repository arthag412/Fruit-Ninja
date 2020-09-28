var PLAY = 1;
var END = 0;
var gameState = PLAY;
var fruit1Image;
var fruit2Image;
var fruit3Image;
var fruit4Image;
var fruit;
var sword, swordImage, gameoverImage;
var score = 0;
var alien, alienImage;
var fruitGroup, enemyGroup;
var cutSound, outSound;
var position;

function preload() {
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  gameoverImage = loadImage("gameover.png");
  swordImage = loadImage("sword.png");
  alienImage = loadAnimation("alien1.png", "alien2.png");

  cutSound = loadSound("knifeSwooshSound.mp3");
  outSound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(600, 600);
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7;

  fruitGroup = new Group();
  enemyGroup = new Group();

}

function draw() {
  background("green");
  textSize(25);
  text("Score: " + score, 470, 50);
  if (gameState === PLAY) {
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    fruits();
    enemies();
    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      score = score + 2;
      cutSound.play();
    }
    if (enemyGroup.isTouching(sword)) {
      gameState = END;
      outSound.play();
    }

  }
  if (gameState === END) {
    sword.x = 300;
    sword.y = 300;
    fruitGroup.destroyEach();
    fruitGroup.velocityX = 0;
    enemyGroup.destroyEach();
    enemyGroup.velocityX = 0;
    sword.addImage(gameoverImage);
  }

  drawSprites();
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    fruit = createSprite(650, 300, 30, 30);
    fruit.scale = 0.2;
    var r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1Image);
    } else if (r == 2) {
      fruit.addImage(fruit2Image);
    } else if (r == 3) {
      fruit.addImage(fruit3Image);
    } else {
      fruit.addImage(fruit4Image);
    }
    position = Math.round(random(1, 2));
    if (position === 1) {
      fruit.x = 50;
      fruit.velocityX = 7.4;
      if (score === 4 || score > 4) {
        fruit.velocityX = fruit.velocityX + 4;
      }
    } else {
      fruit.x = 650;
      fruit.velocityX = -7.4;
      if (score === 4 || score > 4) {
        fruit.velocityX = fruit.velocityX - 4;
      }

    }
    fruit.y = Math.round(random(50, 350));
    fruit.lifetime = 300;
    fruitGroup.add(fruit);
  }
}

function enemies() {
  if (World.frameCount % 200 === 0) {
    alien = createSprite(650, 300, 30, 30);
    alien.addAnimation("alien", alienImage);
    alien.y = Math.round(random(50, 350));

    alien.lifetime = 300;
    enemyGroup.add(alien);
    if (position === 1) {
      alien.x = 50;
      alien.velocityX = 7.4;
      if (score === 10 || score > 10) {
        alien.velocityX = alien.velocityX + 4;
      }
    } else {
      alien.x = 650;
      alien.velocityX = -7.4;
      if (score === 10 || score > 10) {
        alien.velocityX = alien.velocityX - 4;
      }
    }
  }


}