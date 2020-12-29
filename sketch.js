var monkey, monkey_running;
var banana, bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var invisibleGround, ground;
var score, jungleBack, jungleImage;

function preload(){
  
  monkey_running = loadAnimation("Monkey_01.png",           "Monkey_02.png", "Monkey_03.png", "Monkey_04.png",         "Monkey_05.png", "Monkey_06.png", "Monkey_07.png",         "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(500, 500);
  
  //create background
  jungleBack = createSprite(250, 250, 500, 500);
  jungleBack.addImage(jungleImage);
  jungleBack.velocityX = -1;
  
  //creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  //creating ground
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);
  
  //creating invisible ground
  invisibleGround = createSprite(200, 355, 500, 10);
  invisibleGround.visible = false;
  
  //create food and obstacle groups
  bananaGroup = createGroup();
  obstacleGroup = createGroup();

  score = 0;
  
}


function draw() {
  background(180);
  
  //make scrolling the ground
  if(jungleBack.x < 0) {
    jungleBack.x = jungleBack.width / 2;
  }
  
  //giving monkey jump control
  if(keyDown("space") && monkey.y >= 100) {
    monkey.velocityY = -15;
  }
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //stop monkey from falling down
  monkey.collide(invisibleGround);
  
  //add food and obstacles
  //add food
  food();
  
  //add obstacles
  obstacles();

  if(bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    score = score + 2;
  }
  
  switch(score) {
    case 10: monkey.scale = 0.12;
        break;
    case 20: monkey.scale = 0.14;
        break;
    case 30: monkey.scale = 0.16;
        break;
    case 40: monkey.scale = 0.18;
        break;
    default: break;
  }
  
  if(obstacleGroup.isTouching(monkey)) {
    monkey.scale = 0.12;
  }
  
  drawSprites();
  
  //display score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + survivalTime, 100, 50);
}

function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(500, 120, 10, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    //asign lifetime to banana
    banana.lifetime = 170;
    
    //add banana to a group
    bananaGroup.add(banana);
    
  }
}

function obstacles() {
  if(frameCount % 300 === 0) {
    var rock = createSprite(500, 330, 10, 10);
    rock.addImage(obstacleImage);
    rock.velocityX = -3;
    rock.scale = 0.2;
    
    //assign lifetime to rock
    rock.lifetime = 170;
    
    //add rock to a group
    obstacleGroup.add(rock);
  }
}