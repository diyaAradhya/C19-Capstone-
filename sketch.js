var path,rocket,star,diamonds,jewel,obstacle;
var pathImg,rocketImg,starImg,diamondsImg,jewelImg,obstacleImg;
var score = 0;
var starG,diamondsG,jewelG,obstacleGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Space.png");
  rocketImg = loadImage("Rocket.png");
  starImg = loadImage("Star.png");
  diamondsImg = loadImage("Shooting Star.png");
  jewelImg = loadImage("Star 2.png");
  obstacleImg = loadImage("Satellite.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,700);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating the rocket sprite 
rocket = createSprite(70,580,20,20);
rocket.addImage(rocketImg);
rocket.scale=0.2;


// creating groups
starG = new Group();
diamondsG = new Group();
jewelG = new Group();
obstacleGroup = new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  rocket.x = World.mouseX;
  score = score + Math.round(getFrameRate()/60);

  
  edges= createEdgeSprites();
  rocket.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createStar();
    createDiamonds();
    createjewel();
    createObstacle();

    if (starG.isTouching(rocket)) {
      starG.destroyEach();
      
    }
    else if (diamondsG.isTouching(rocket)) {
      diamondsG.destroyEach();
      
      
    }else if(jewelG.isTouching(rocket)) {
      jewelG.destroyEach();
      
      
    }else{
      if(obstacleGroup.isTouching(rocket)) {
        gameState=END;
        rocket.addImage(endImg);

        rocket.x=200;
        rocket.y=300;
        rocket.scale=0.6;
      
        
        starG.destroyEach();
        diamondsG.destroyEach();
        jewelG.destroyEach();
        obstacleGroup.destroyEach();
        
        starG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jewelG.setVelocityYEach(0);
        obstacleGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Score: "+ score,10,30);
  }

}

function createStar() {
  if (World.frameCount % 200 == 0) {
  var star = createSprite(Math.round(random(50, 350),40, 10, 10));
  star.addImage(starImg);
  star.scale=0.1;
  star.velocityY = 3;
  star.lifetime = 150;
  starG.add(star);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.1;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createjewel() {
  if (World.frameCount % 410 == 0) {
  var jewel = createSprite(Math.round(random(50, 350),40, 10, 10));
  jewel.addImage(jewelImg);
  jewel.scale=0.2;
  jewel.velocityY = 3;
  jewel.lifetime = 150;
  jewelG.add(jewel);
  }
}

function createObstacle(){
  if (World.frameCount % 530 == 0) {
  var obstacle = createSprite(Math.round(random(50, 350),40, 10, 10));
  obstacle.addImage(obstacleImg);
  obstacle.scale=0.15;
  obstacle.velocityY = 3;
  obstacle.lifetime = 150;
  obstacleGroup.add(obstacle);
  }
}


