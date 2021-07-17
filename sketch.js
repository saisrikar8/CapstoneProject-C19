var jungleimg, jungle;
var player, opponent, opponents;
var invGround;
var gameOver, gameOverimg;
var score = 0;
var frequency = 500;
var rate = -2;
var gameState = "play";
function preload(){
    jungleimg = loadImage("jungle-game-background_131928-16.jpeg");
    gameOverimg = loadImage("gameover.png");
}

function setup() {
    createCanvas(626, 504);
    jungle = createSprite(400,176);
    jungle.addImage(jungleimg);
    jungle.scale = 1.5;
    
    player = createSprite(50, 290, 30, 30);
    player.shapeColor = "green";

    gameOver = createSprite(313, 176);
    gameOver.addImage(gameOverimg);
    gameOver.visible = false;

    invGround = createSprite(50, 362, 50, 2);
    invGround.visible = false;

    opponents = new Group();
}

function draw() {
    drawSprites();
    if (gameState == "play")
    {
        jungle.velocityX = -1;
        player.velocityY += 0.5;
        score += Math.round(frameRate()/50);
        player.collide(invGround);
        if (keyDown("space") && player.y > 275){
            player.velocityY = -10;
        }
        if (frameCount / frequency == 10 && frequency > 100){
            frequency -= 100;
        }
        else if(frameCount/frequency == 10 && rate > -10){
            rate--;
        }
        if (jungle.x < 300){
            jungle.x = jungle.width - 150;
        }
        opponents.collide(player, end);
        spawn();
    }
    textSize(30);
    textFont("Trebuchet MS");
    fill(255,255,255);
    text("Score: " + score ,450, 50);
}

function spawn(){
    if (frameCount % frequency == 0){
        opponent = createSprite(700, 352, 20, 20);
        opponent.velocityX = rate;
        opponent.shapeColor = "brown";
        opponent.lifetime = (width/rate) + 100;
        opponents.add(opponent);
    }
}

function end(){
    opponents.destroyEach();
    player.destroy();
    gameOver.visible = true;
    gameState = "end";
    jungle.destroy();
}