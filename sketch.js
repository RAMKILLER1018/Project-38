var backgroundI,background_,rocket,rocketA,edges,astroidI,astroidG,heart,heartI,hear,heat,hert,hart,gameoverI,crash,over,pointS;
var topEdge,bottomEdge;
var score=0;
var out=0;
var PLAY=0;
var END=1;
var gameState=PLAY;

function preload(){
  backgroundI=loadImage("background.png");
  
  rocketA=loadAnimation("rocket_1.png","rocket_2.png");
  
  astroidI=loadImage("astroid.png");
  
  heartI=loadImage("heart.png");
  
  gameoverI=loadImage("gameover.png");
  
  crash=loadSound("Rockslide_small-Sound_Explorer-1935053448-0-1.1.mp3");
  
  pointS=loadSound("checkPoint.mp3");
  
  over=loadSound("gameover.mp3");
}

function setup() {
  createCanvas(600,600);
  
  background_=createSprite(300,300,600,600);
  background_.addImage(backgroundI);
  background_.scale=2;
  
  rocket=createSprite(100,300,50,50);
  rocket.addAnimation("R1",rocketA);
  rocket.scale=0.5;
  rocket.setCollider("rectangle",0,0,270,100);
  
  heart=createSprite(70,17,10,10);
  heart.addImage(heartI);
  heart.scale=0.05;
  
  hear=createSprite(85,17,10,10);
  hear.addImage(heartI);
  hear.scale=0.05;
  
  heat=createSprite(100,17,10,10);
  heat.addImage(heartI);
  heat.scale=0.05;
  
  hert=createSprite(115,17,10,10);
  hert.addImage(heartI);
  hert.scale=0.05;
  
  hart=createSprite(130,17,10,10);
  hart.addImage(heartI);
  hart.scale=0.05;

  topEdge=createSprite(rocket.x,0,100,1);
  bottomEdge=createSprite(rocket.x,601,100,1);
  
  
  astroidG=new Group();
}

function draw() {
  background(0);
    
  if(gameState===PLAY){
    astroids();
    
    background_.velocityX=10;

    rocket.velocityX=10

    heart.velocityX=10
    hear.velocityX=10
    heat.velocityX=10
    hert.velocityX=10
    hart.velocityX=10

    score = score + Math.round(getFrameRate()/60);

    camera.position.x=camera.position.x+10;

    topEdge.velocityX=10;

    bottomEdge.velocityX=10;
  
  if(background_.x<=0){
    background_.x=background_.width/2;
  }
  
  if(keyDown("up_arrow")){
    rocket.y=rocket.y-5;
  }
  
  if(keyDown("down_arrow")){
    rocket.y=rocket.y+5;
  }
  
  if(rocket.isTouching(astroidG)){
     out=out+1;
    astroidG.destroyEach();
    crash.play();
  }
    if(score%100===0){
      pointS.play();
    }
    
    if(out===5){
      over.play();
    }
  

    
      switch(out){
    case 1: hart.destroy();
      break;
    case 2: hert.destroy();
      break;
    case 3: heat.destroy();
      break;
    case 4: hear.destroy();
      break;
    case 5: gameState=END;
      break;
      default: break;
  }
  }
  if(gameState===END){
    background_.velocityX=0;
    astroidG.destroyEach();
    rocket.destroy();
    heart.destroy();
    var gameover=createSprite(300,300,100,100);
    gameover.addImage(gameoverI);
    gameover.scale=2;
  }  
 drawSprites();
  
  textSize(20);
  stroke("neon");
  fill("turquoise");
  text("Score :"+score,camera.position.x-150,20);
  
  textSize(15);
  stroke("orange")
  fill("yellow");
  text("Lifes :",camera.position.x-290,20);

  rocket.bounceOff(topEdge);
  rocket.bounceOff(bottomEdge);


}

function astroids(){
  if(frameCount%80===0){
    var astroid=createSprite(rocket.x+700,Math.round(random(50,530)),50,50);
    astroid.addImage(astroidI);
    astroid.scale=0.28;
    astroid.velocityX=-3;
    astroid.lifetime=250;
    astroidG.add(astroid);
    if(score%500===0){
    background_.velocityX=background_.velocityX-1;
     astroid.velocityX=astroid.velocityX-1;
    }
  }
}