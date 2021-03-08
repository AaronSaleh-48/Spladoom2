//Variablendeklaration
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


var run = false;
var timer = 60;

var scorePlayer = 0;
var scoreAI = 0;

var intervalGameLoop;
var intervalTimer;
var intervalAI;

var img = new Image();
var data;

var imgAILeft = new Image();
var imgAIRight = new Image();
var imgAIUp = new Image();
var imgAIDown = new Image();
var imgAIDownLeft = new Image();
var imgAIUpperRight = new Image();
var imgAIUpperLeft = new Image();
var imgAIDownRight = new Image();
var dataAIRight = [];
var dataAILeft = [];
var dataAIUp = [];
var dataAIDown = [];
var dataAIDownRight = [];
var dataAIDownLeft = [];
var dataAIUpperRight = [];
var dataAIUpperLeft = [];
var pixelDistance = 25;

var rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false;

var rightAI = false,
    leftAI = false,
    upAI = false,
    downAI = false;

var AI_switch = []; //Array

var AI_dir;

canvas_w = canvas.scrollWidth;
canvas_h = canvas.scrollHeight;

var player_x = 0;
var player_y = 0;
var player_w = 30;
var player_h = 30;
var player_vel = 2;

var AI_x = (canvas_w - 30);
var AI_y = 0;
var AI_w = 30;
var AI_h = 30;
var AI_vel = 2;
var AI_direction;
var rndmove;
var rndedge;
var rndchoice;


ctx.fillRect(0, 0, 20, 20);

//Initialisierungsmethode
function initGame() {
    //Start Gameloop an init Game and increase Timer
    run = true;
    intervalGameLoop = setInterval(gameLoop, 1);
    intervalTimer = setInterval(decreaseTimer, 1000);
    intervalAI = setInterval(AIkeydown, 75);
}

//Gameloop
function gameLoop() {
    ctx.fillStyle = "black";
    if (!run) {
        clearInterval(intervalTimer);
        clearInterval(intervalGameLoop);
        clearInterval(intervalAI);
        checkPixelcolor();
    }

    //Change AI direction
    AI_direction = Math.random() * 4;
    checkBorderCollision();
    moveAI();
    drawAI();
    movePlayer();
    drawPlayer();
}

//Start timer to count
function decreaseTimer() {
    timer--;

    //Display timer
    document.getElementById("timer").innerHTML = "Time: " + timer;

    //Stop gameloop after 1 minute
    if (timer <= 0) {
        run = false;
    }
}

//Check color of pixels
function checkPixelcolor() {
    ctx.drawImage(img, 0, 0);
    data = ctx.getImageData(0, 0, canvas_w, canvas_h).data;

    console.log(data);

    for (var i = 0; i < data.length; i += 4) { //run through pixels
        if (data[i] == 255 && data[i + 1] == 255 && data[i + 2] == 0) { //is yellow?
            scorePlayer++;
        } else if (data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 255) { //is blue?
            scoreAI++;
        }
    }

    //Check who is winner
    if (scorePlayer > scoreAI) {
        alert("You Won!");
    } else if (scorePlayer < scoreAI) {
        alert("You SUCK!");
    } else {
        alert("LOL, No Winner!");
    }
}

function drawPlayer() {
    //draw player and update location
    ctx.fillRect(player_x, player_y, player_w, player_h);

    //Draw border arround player
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "yellow";
    ctx.rect(player_x, player_y, player_w, player_h);
    ctx.stroke();
}

function drawAI() {
    //Draw AI and update location
    ctx.fillRect(AI_x, AI_y, AI_w, AI_h);

    //Draw border arround AI
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "blue";
    ctx.rect(AI_x, AI_y, AI_w, AI_h);
    ctx.stroke();
}

//Check if player / AI is touching border
function checkBorderCollision() {
    //Player
    if (player_x >= (canvas_w - player_w)) rightKey = false;
    if (player_x <= (0)) leftKey = false;
    if (player_y <= (0)) upKey = false;
    if (player_y >= (canvas_h - player_h)) downKey = false;

    //AI
    if (AI_x >= (canvas_w - AI_w)) rightAI = false;
    if (AI_x <= (0)) leftAI = false;
    if (AI_y <= (0)) upAI = false;
    if (AI_y >= (canvas_h - AI_h)) downAI = false;
}

//Move player
function movePlayer() {
    if (rightKey) player_x += player_vel;
    if (leftKey) player_x -= player_vel;
    if (upKey) player_y -= player_vel;
    if (downKey) player_y += player_vel;
}

//Move AI
function moveAI() {
    if (rightAI) AI_x += AI_vel;
    if (leftAI) AI_x -= AI_vel;
    if (upAI) AI_y -= AI_vel;
    if (downAI) AI_y += AI_vel
}

//Simulate keypresses for AI
function AIkeydown() {
    //Check if the 10th pixel on the right side of ai are blue
    if (AI_x < 770) {
        ctx.drawImage(imgAIRight, (AI_x + AI_w + pixelDistance), (AI_y + (AI_h / 2)));
        dataAIRight = ctx.getImageData((AI_x + AI_w + pixelDistance), (AI_y + (AI_h / 2)), 1, 1).data;
    } else {
        //dataAIRight.splice(0, dataAIRight.length);
        rndedge = Math.floor(Math.random() * 5);
        switch (rndedge) {
            case 0:
                rightAI = false;
                leftAI = true;
                upAI = false;
                downAI = false;
                break;
            case 1:
                rightAI = false;
                leftAI = false;
                upAI = true;
                downAI = false;
                break;
            case 2:
                rightAI = false;
                leftAI = false;
                upAI = false;
                downAI = true;
                break;
            case 3:
                rightAI = false;
                leftAI = true;
                upAI = true;
                downAI = false;
                break;
            case 4:
                rightAI = false;
                leftAI = true;
                upAI = false;
                downAI = true;
                break;
            default:
                break;
        }
    }

    if (AI_x > 0) {
        //Check if the 10th pixel on the left side of ai are blue
        ctx.drawImage(imgAILeft, (AI_x - pixelDistance), (AI_y + (AI_h / 2)));
        dataAILeft = ctx.getImageData((AI_x - pixelDistance), (AI_y + (AI_h / 2)), 1, 1).data;
    } else {
        //dataAILeft.splice(0, dataAILeft.length);
        rndedge = Math.floor(Math.random() * 5);
        switch (rndedge) {
            case 0:
                rightAI = true;
                leftAI = false;
                upAI = false;
                downAI = false;
                break;
            case 1:
                rightAI = false;
                leftAI = false;
                upAI = true;
                downAI = false;
                break;
            case 2:
                rightAI = false;
                leftAI = false;
                upAI = false;
                downAI = true;
                break;
            case 3:
                rightAI = true;
                leftAI = false;
                upAI = true;
                downAI = false;
                break;
            case 4:
                rightAI = true;
                leftAI = false;
                upAI = false;
                downAI = true;
            default:
                break;
        }
    }
    if (AI_y > 0) {
        //Check if the 10th pixel on the upper side of ai are blue
        ctx.drawImage(imgAIUp, (AI_x + (AI_w / 2)), (AI_y - pixelDistance));
        dataAIUp = ctx.getImageData((AI_x + (AI_w / 2)), (AI_y - pixelDistance), 1, 1).data;
    } else {
        //dataAIUp.splice(0, dataAIUp.length);
        rndedge = Math.floor(Math.random() * 5);
        switch (rndedge) {
            case 0:
                rightAI = false;
                leftAI = true;
                upAI = false;
                downAI = false;
                break;
            case 1:
                rightAI = true;
                leftAI = false;
                upAI = false;
                downAI = false;
                break;
            case 2:
                rightAI = false;
                leftAI = false;
                upAI = false;
                downAI = true;
            case 3:
                rightAI = false;
                leftAI = true;
                upAI = false;
                downAI = true;
                break;
            case 4:
                rightAI = true;
                leftAI = false;
                upAI = false;
                downAI = true;
                break;
            default:
                break;
        }
    }
    if (AI_y < 570) {
        //Check if the 10th pixel on the down side of ai are blue
        ctx.drawImage(imgAIDown, (AI_x + (AI_w / 2)), (AI_y + AI_h + pixelDistance));
        dataAIDown = ctx.getImageData((AI_x + (AI_w / 2)), (AI_y + AI_h + pixelDistance), 1, 1).data;
    } else {
        //dataAIDown.splice(0, dataAIDown.length);
        rndedge = Math.floor(Math.random() * 5);
        switch (rndedge) {
            case 0:
                rightAI = false;
                leftAI = true;
                upAI = false;
                downAI = false;
                break;
            case 1:
                rightAI = false;
                leftAI = false;
                upAI = true;
                downAI = false;
                break;
            case 2:
                rightAI = true;
                leftAI = false;
                upAI = false;
                downAI = false;
                break;
            case 3:
                rightAI = false;
                leftAI = true;
                upAI = true;
                downAI = false;
                break;
            case 4:
                rightAI = true;
                leftAI = false;
                upAI = true;
                downAI = false;
            default:
                break;
        }
    }
    if (AI_x < 770 && AI_y < 570) {
        //Check if the 10th pixel on the downright side of ai are blue
        ctx.drawImage(imgAIDownRight, (AI_x + AI_w + pixelDistance), (AI_y + AI_h + pixelDistance));
        dataAIDownRight = ctx.getImageData((AI_x + AI_w + pixelDistance), (AI_y + AI_h + pixelDistance), 1, 1).data;
    } else {
        //dataAIDownRight.splice(0, dataAIDownRight.length);
        rndedge = Math.floor(Math.random() * 3);
        switch (rndedge) {
            case 0:
                rightAI = false;
                leftAI = true;
                upAI = false;
                downAI = false;
                break;
            case 1:
                rightAI = false;
                leftAI = false;
                upAI = true;
                downAI = false;
                break;
            case 2:
                rightAI = false;
                leftAI = true;
                upAI = true;
                downAI = false;
                break;
            default:
                break;
        }
    }
    if (AI_x > 0 && AI_y < 570) {
        //Check if the 10th pixel on the upperleft side of ai are blue
        ctx.drawImage(imgAIUpperLeft, (AI_x - pixelDistance), (AI_y - pixelDistance));
        dataAIUpperLeft = ctx.getImageData((AI_x - pixelDistance), (AI_y - pixelDistance), 1, 1).data;
    } else {
       // dataAIUpperLeft.splice(0, dataAIUpperLeft.length);
        rndedge = Math.floor(Math.random() * 3);
        switch (rndedge) {
            case 0:
                rightAI = true;
                leftAI = false;
                upAI = false;
                downAI = false;
                break;
            case 1:
                rightAI = false;
                leftAI = false;
                upAI = false;
                downAI = true;
                break;
            case 2:
                rightAI = true;
                leftAI = false;
                upAI = false;
                downAI = true;
                break;
            default:
                break;
        }
    }
    if (AI_x > 0 && AI_y < 570) {
        //Check if the 10th pixel on the upperright side of ai are blue
        ctx.drawImage(imgAIUpperRight, (AI_x + AI_w + pixelDistance), (AI_y - pixelDistance));
        dataAIUpperRight = ctx.getImageData((AI_x + AI_w + pixelDistance), (AI_y - pixelDistance), 1, 1).data;
    } else {
        //dataAIUpperRight.splice(0, dataAIUpperRight.length);
        rndedge = Math.floor(Math.random() * 3);
        switch (rndedge) {
            case 0:
                rightAI = false;
                leftAI = true;
                upAI = false;
                downAI = false;
                break;
            case 1:
                rightAI = false;
                leftAI = false;
                upAI = false;
                downAI = true;
                break;
            case 2:
                rightAI = false;
                leftAI = true;
                upAI = false;
                downAI = true;
                break;
            default:
                break;
        }
    }

    if (AI_x > 0 && AI_y < 570) {
        //Check if the 10th pixel on the downleft side of ai are blue
        ctx.drawImage(imgAIDownLeft, (AI_x - pixelDistance), (AI_y + AI_h + pixelDistance));
        dataAIDownLeft = ctx.getImageData((AI_x - pixelDistance), (AI_y + AI_h + pixelDistance), 1, 1).data;
    } else {
        //dataAIDownLeft.splice(0, dataAIDownLeft.length);
        rndedge = Math.floor(Math.random() * 3);
        switch (rndedge) {
            case 0:
                rightAI = true;
                leftAI = false;
                upAI = false;
                downAI = false;
                break;
            case 1:
                rightAI = false;
                leftAI = false;
                upAI = true;
                downAI = false;
                break;
            case 2:
                rightAI = true;
                leftAI = false;
                upAI = true;
                downAI = false;
                break;
            default:
                break;
        }
    }

    console.log("r: " + dataAIRight[0] + ", " + dataAIRight[1] + ", " + dataAIRight[2])
    console.log("l: " + dataAILeft[0] + ", " + dataAILeft[1] + ", " + dataAILeft[2])
    console.log("u: " + dataAIUp[0] + ", " + dataAIUp[1] + ", " + dataAIUp[2])
    console.log("d: " + dataAIDown[0] + ", " + dataAIDown[1] + ", " + dataAIDown[2])
    console.log("dr: " + dataAIDownRight[0] + ", " + dataAIDownRight[1] + ", " + dataAIDownRight[2])
    console.log("ul: " + dataAIUpperLeft[0] + ", " + dataAIUpperLeft[1] + ", " + dataAIUpperLeft[2])
    console.log("ur: " + dataAIUpperRight[0] + ", " + dataAIUpperRight[1] + ", " + dataAIUpperRight[2])
    console.log("dl: " + dataAIDownLeft[0] + ", " + dataAIDownLeft[1] + ", " + dataAIDownLeft[2])

    //Move AI towards other colors pixel
    if (!(dataAIRight[0] == 0 && dataAIRight[1] == 0 && dataAIRight[2] == 255) && dataAIRight.length > 0) { //is not blue?
        console.log("right " + "(" + AI_x + ", " + AI_y + ")");
        AI_switch.push("right");
    }
    if (!(dataAILeft[0] == 0 && dataAILeft[1] == 0 && dataAILeft[2] == 255) && dataAILeft.length > 0) { //is not blue?
        console.log("left " + "(" + AI_x + ", " + AI_y + ")");
        AI_switch.push("left");
    }
    if (!(dataAIUp[0] == 0 && dataAIUp[1] == 0 && dataAIUp[2] == 255) && dataAIUp.length > 0) { //is not blue?
        console.log("up " + "(" + AI_x + ", " + AI_y + ")");
        AI_switch.push("up");
    }
    if (!(dataAIDown[0] == 0 && dataAIDown[1] == 0 && dataAIDown[2] == 255) && dataAIDown.length > 0) { //is not blue?
        console.log("down " + "(" + AI_x + ", " + AI_y + ")");
        AI_switch.push("down");
    }
    if (!(dataAIDownRight[0] == 0 && dataAIDownRight[1] == 0 && dataAIDownRight[2] == 255) && dataAIDownRight.length > 0) { //is not blue?
        console.log("downright " + "(" + AI_x + ", " + AI_y + ")");
        AI_switch.push("downright");
    }
    if (!(dataAIDownLeft[0] == 0 && dataAIDownLeft[1] == 0 && dataAIDownLeft[2] == 255) && dataAIDownLeft.length > 0) { //is not blue?
        console.log("downleft " + "(" + AI_x + ", " + AI_y + ")");
        AI_switch.push("downleft");
    }
    if (!(dataAIUpperRight[0] == 0 && dataAIUpperRight[1] == 0 && dataAIUpperRight[2] == 255) && dataAIUpperRight.length > 0) { //is not blue?
        console.log("upperright " + "(" + AI_x + ", " + AI_y + ")");
        AI_switch.push("upperright");
    }
    if (!(dataAIUpperLeft[0] == 0 && dataAIUpperLeft[1] == 0 && dataAIUpperLeft[2] == 255) && dataAIUpperLeft.length > 0) { //is not blue?
        console.log("upperleft " + "(" + AI_x + ", " + AI_y + ")");
        AI_switch.push("upperleft");
    }

    if (AI_switch.length == 0) {
        console.log("***RANDOM***");
        rndmove = Math.floor(Math.random() * 4);
        switch (rndmove) {
            case 0:
                rightAI = true;
                leftAI = false;
                upAI = true;
                downAI = false;
                break;
            case 1:
                rightAI = false;
                leftAI = true;
                upAI = false;
                downAI = true;
                break;

            case 2:
                rightAI = false;
                leftAI = true;
                upAI = true;
                downAI = false;
                break;
            case 3:
                rightAI = true;
                leftAI = false;
                upAI = false;
                downAI = true;
                break;
            default:
                break;
        }
    } else {
        rndmove = Math.floor(Math.random() * AI_switch.length);
        AI_dir = AI_switch[rndmove];
        switch (AI_dir) {
            case "right":
                console.log("MOVE: RIGHT");
                rightAI = true;
                leftAI = false;
                upAI = false;
                downAI = false;
                break;
            case "left":
                console.log("MOVE: LEFT");
                rightAI = false;
                leftAI = true;
                upAI = false;
                downAI = false;
                break;

            case "up":
                console.log("MOVE: UP");
                rightAI = false;
                leftAI = false;
                upAI = true;
                downAI = false;
                break;

            case "down":
                console.log("MOVE: DOWN");
                rightAI = false;
                leftAI = false;
                upAI = false;
                downAI = true;
                break;
            case "downright":
                console.log("MOVE: DOWNRIGHT");
                rightAI = true;
                leftAI = false;
                upAI = false;
                downAI = true;
                break;
            case "downleft":
                console.log("MOVE: DOWNLEFT");
                rightAI = false;
                leftAI = true;
                upAI = false;
                downAI = true;
                break;

            case "upperright":
                console.log("MOVE: UPPERRIGHT");
                rightAI = true;
                leftAI = false;
                upAI = true;
                downAI = false;
                break;
            case "upperleft":
                console.log("MOVE: UPPERLEFT");
                rightAI = false;
                leftAI = true;
                upAI = true;
                downAI = false;
                break;
            default:
                alert("ERROR")
                break;
        }

        AI_switch.splice(0, AI_switch.length);

    }
}



//Detect Keypresses
document.onkeydown = function (e) {
    if (e.keyCode == 39) {
        rightKey = true;
    }
    if (e.keyCode == 37) {
        leftKey = true;
    }
    if (e.keyCode == 38) {
        upKey = true;
    }
    if (e.keyCode == 40) {
        downKey = true;
    }
};

document.onkeyup = function (e) {
    if (e.keyCode == 39) {
        rightKey = false;
    }
    if (e.keyCode == 37) {
        leftKey = false;
    }
    if (e.keyCode == 38) {
        upKey = false;
    }
    if (e.keyCode == 40) {
        downKey = false;
    }
};