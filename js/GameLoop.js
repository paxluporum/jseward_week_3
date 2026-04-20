var canvas;
var context;
var ball;
var timer;
var interval = 1000 / 60; //60 fps
var counter = 0;
var player1;

var frictionX = .5;
var frictionY = .8;
var gravity = 1;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

ball = new GameObject(200, canvas.height / 2, 100, 100, "#00ff00");
ball.vx = -4; //horizontal movement
ball.vy = 0; // vertical movement

player1 = new GameObject(100, canvas.height / 2, 25, 100, "#8400ff5e");

// npc1 = new GameObject(300, canvas.height / 2, 100, 100, "#00ffff");
// npc2 = new GameObject(600, canvas.height / 2, 100, 100, "#1900ff");
// npc3 = new GameObject(900, canvas.height / 2, 100, 100, "#ff00ff");

timer = setInterval(animate, interval);

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    doHandleAcceleration();
    doHandleFriction();
    // doHandleGravity();
    doUpdatePosition();
    doCheckBottomBounds();


    player1.move();
    // if (w) {
    //     player1.y -= 4
    // }

    // if (s) {
    //     player1.y += 4
    // }

//////////////////////////STOPS PADDLE FROM GOING OFF SCREEN
    // if (player1.y - player1.height / 2 < 0) {
    //     player1.y = player1.height / 2;                    // top edge touches canvas top
    // }
    // if (player1.y + player1.height / 2 > canvas.height) {
    //     player1.y = canvas.height - player1.height / 2;    // bottom edge touches canvas bottom
    // }

    ball.move();
    // BOUNCE OFF RIGHT WALL
    if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius;   // push ball back to the edge
        ball.vx *= -1;                         // reverse horizontal direction
    }

    // // BOUNCE OFF LEFT WALL
    // if (ball.x - ball.radius < 0) {
    //     ball.x = ball.radius;                  // push ball back to the edge
    //     ball.vx *= -1;                         // reverse horizontal direction
    // }

    //BOUNCE OFF BOTTOM WALL
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;     // push back to edge
        ball.vy *= -1;                            // reverse vertical direction
    }

    // BOUNCE OFF TOP WALL
    if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;                     // push back to edge
        ball.vy *= -1;
    }

    //////////////////////// Losing Condition

    if (ball.x - ball.radius < 0) {
        ball.x = canvas.width / 2; // respawns in middle
        ball.vx *= -1; // when respawning ball goes away from paddle
    }


    // ///////////////=============================

    // Player collision

    // === BALL HITS PLAYER PADDLE (left side) ===
    if (player1.collisionCheck(ball)) {
        // Push the ball just outside the paddle so it doesn't get stuck inside
        ball.x = player1.right() + ball.radius;
        ball.vx *= -1;

        //top 1/3
        if (ball.y < player1.y - player1.height / 6 ) {
            ball.vy = -4;
        }
        //bottom 1/3
        else if (ball.y > player1.y + player1.height /6) {
            ball.vy = 4;
        }
        // middle
        else {
            ball.vy = 0;
        }
    // Reverse the horizontal velocity 
}
    // //NPC1 collision stuff
    // if (npc1.collisionCheck(ball)) {
    //     npc1.color = "#bbff00";
    // }
    // ////////////=====================
    // //NPC2 collision stuff
    // if (npc2.collisionCheck(ball)) {
    //     context.strokeRect(npc2.x - npc2.width / 2, npc2.y - npc2.height / 2, npc2.width, npc2.height);
    // }

    // //NPC3 collision
    // if (npc3.collisionCheck(ball)) {
    //     ball.x = ball.prevX
    // }
    // else 
    // {
    //     ball.prevX = ball.x;
    // }

    player1.drawRect();
    ball.drawCircle(); // everything above this does not visually appear untul this function is called
    // npc1.drawCircle();
    // npc2.drawCircle();
    // npc3.drawRect();

    // Display
    // context.fillStyle = "black";                  // text color
    // context.font = "bold 28px Arial";             // text style and size
    // context.fillText("Bounces: " + counter, 20, 50);  // text + position
}
// console.log("Current bounces:", counter);


function doHandleAcceleration()
{
    if (s)
    {
        player1.vy += player1.ay * player1.force;
    }
    if (w)
    {
        player1.vy += player1.ay * -player1.force;
    }
}

function doHandleFriction()
{
    player1.vy *= frictionY;

}

// function doHandleGravity()
// {
//     player1.vy += gravity;

// }

function doUpdatePosition()
{
    player1.x += player1.vx;
    player1.y += player1.vy;
}

function doCheckBottomBounds()
{
    if (player1.y > canvas.height - player1.height/2)
    {
        player1.y = canvas.height - player1.height/2;
        player1.vy = 0;
        doJump();
    }
}

//function doJump()
// {
//     if (w)
//     {
//         player1.vy = -20;
//     }

//     if (!w && player1.vy >= 0)
//     {
//         player1.vy = -40;
//     }
// }