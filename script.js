var screen = $('#main-screen');
var ctx = screen[0].getContext("2d");

var balls = [];
var spawnRegion = 480;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function spawn() {
    if(balls.length >= 100) balls.length = 0;
    balls.push(new Ball(Math.random() * spawnRegion, Math.random() * spawnRegion, (Math.random() * 6) - 3, (Math.random() * 6) - 3, 10));

    await sleep(1500);
    spawn();
}

$(document).ready(function() {
    spawn();
    animate();
})

function Ball(x, y, dx, dy, radius) {
    this.x = x + radius;
    this.y = y + radius;
    this.dx = dx; 
    this.dy = dy;
    this.radius = radius;

    this.render = function() {
        screen.drawArc({
            fillStyle: "#BBBBBB",
            strokeStyle: "#FFFFFF",
            strokeWidth: 2,
            x: this.x,
            y: this.y,
            radius: this.radius,
        });
    }

    this.tick = function() {
        if((this.x + this.radius) >= 500 || (this.x - this.radius) <= 0) this.dx = -this.dx;
        if((this.y + this.radius) >= 500 || (this.y - this.radius) <= 0) this.dy = -this.dy;
        this.x += this.dx; this.y += this.dy;
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, 500, 500);

    for(i = 0; i < balls.length; i++) {
        balls[i].tick();
        balls[i].render();
    }
}