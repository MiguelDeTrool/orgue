let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let mouseX, mouseY;

let ball = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
  dX: 0,
  dY: 0,
  step: 100,
  speed: 4, // in "pixels per frame"
  draw: function () {
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  },
  setTarget: function (newX, newY) {
    this.targetX = newX;
    this.targetY = newY;

    // Constant duration 
    // this.dX = (this.x - this.targetX) / this.step * -1;
    // this.dY = (this.y - this.targetY) / this.step * -1;

    // Constant speed
    let distanceX = this.targetX - this.x;
    let distanceY = this.targetY - this.y;
    let angle = Math.atan(distanceX / distanceY);
    this.dX = Math.sin(angle) * this.speed;
    this.dY = Math.cos(angle) * this.speed;
    this.dX = Math.abs(this.dX) * Math.sign(distanceX);
    this.dY = Math.abs(this.dY) * Math.sign(distanceY);
  }
}

let number = 0;

function loop() {
  // number++
  // if (number > 100) {
  //   return
  // }
  ctx.clearRect(0, 0, 500, 500);
  ball.draw();
  ctx.beginPath();
  ctx.fillStyle = "blue";
  ctx.moveTo(20, 20);
  ctx.lineTo(180, 20);
  ctx.lineTo(130, 130);
  ctx.stroke();

  let shouldMove = Math.abs(ball.x - ball.targetX) > ball.speed || Math.abs(ball.y - ball.targetY) > ball.speed;

  if (shouldMove) {
    ball.x += ball.dX;
    ball.y += ball.dY;
  } else {
    let newX = Math.random() * 500;
    let newY = Math.random() * 500;
    ball.setTarget(newX, newY);
  }

  window.requestAnimationFrame(loop);
}


// document.addEventListener("click", function (e) {
//     mouseX = e.clientX;
//     mouseY = e.clientY;
// })

ball.setTarget(0, 0);
loop();

let date = Date.now();

// setInterval(() => {
//   let currDate = Date.now();
//   console.log(currDate - date);
//   date = currDate
//   loop();
// }, 14);

