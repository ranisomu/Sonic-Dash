var sonic, sonicImage;
var stadium, stadiumImage, ground;
var coin, coinImage, rock, rockImage;
var score;
var coinGroup, rockGroup;
var gameOver, gameOverImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){

  sonicImage = loadImage("sonic123.png");
  stadiumImage = loadImage("stadium.png");
  coinImage = loadImage("coin1.png");
  rockImage = loadImage("rock.png");
  gameOverImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600,400);
  
  stadium = createSprite(300,200,900,10);
  stadium.addAnimation("stadium", stadiumImage);
  stadium.velocityX = -4;
  stadium.x = stadium.width/2;
  stadium.scale = 1.55;
  
  ground = createSprite(400,300,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  
  sonic = createSprite(70,275,20,20);
  sonic.addAnimation("sonic", sonicImage);
  sonic.scale = 0.19;
  sonic.setCollider("rectangle",0,0,200,200);
  sonic.debug = false;
  
  gameOver = createSprite(300,200,10,10);
  gameOver.addAnimation("gameOver",gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  coinGroup = createGroup();
  rockGroup = createGroup();
  
  score = 0;
}

function draw() {
  background("white");

if(gameState === PLAY) {
    stadium.velocityX = -4;
    if(keyDown("space") && sonic.y >= 255) {
     sonic.velocityY = sonic.velocityY - 8;
  }
    if(ground.x < 150){
     ground.x = ground.width/2;
  }
    if(stadium.x < 200){
     stadium.x = stadium.width/2;
  }
    if(coinGroup.isTouching(sonic)) {
     coinGroup.destroyEach();
     score = score + 1;
  }
    if(rockGroup.isTouching(sonic)) {
     gameState = END;  
  }
}  
if(gameState === END) {
    gameOver.visible = true;
    ground.velocityX = 0;
    stadium.velocityX = 0;
    sonic.velocityY = 0;
    coinGroup.setVelocityXEach(0);
    rockGroup.setVelocityXEach(0);
    coinGroup.setLifetimeEach(-1);
    rockGroup.setLifetimeEach(-1);
    if(mousePressedOver(gameOver)) {
     restart();
   }
}
  

  sonic.velocityY = sonic.velocityY + 1;
  sonic.collide(ground);
  
  Coins();
  Rocks();
  
  drawSprites();
  
  fill("yellow");
  textSize(20);
  text("score:"+score,470,20);
}

function Coins() {
  if(frameCount % 160 === 0) {
   coin = createSprite(620,265,10,10); 
   coin.addAnimation("coin", coinImage);
   coin.scale = 0.17;
   coin.velocityX = -4;
   coin.lifetime = 150;
   coinGroup.add(coin);
  }
}

function Rocks() {
    if(frameCount % 250 === 0) {
    rock = createSprite(630,290,20,20);
    rock.addAnimation("rock", rockImage);
    rock.scale = 0.1;
    rock.velocityX = -4;
    rock.lifetime = 160
    rockGroup.add(rock);
  }
}
function restart() {
  gameState = PLAY;
  gameOver.visible = false;
  rockGroup.destroyEach();
  coinGroup.destroyEach();
  score = 0;
}




