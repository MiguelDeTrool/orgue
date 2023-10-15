let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let ball = (() => {
  x = 0;
  y = 0;
  targetX = 0;
  targetY = 0;
  dX = 0;
  dY = 0;
  speedFactor = 0.25;
  draw = (interval) => {
    move(interval)
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };
  setTarget = (newX, newY) => {
    targetX = newX;
    targetY = newY;
  };
  shouldMove = () => {
    let result = Math.abs(x - targetX) > (speedFactor * 16) || Math.abs(y - targetY) > (speedFactor * 16);
    return result;
  };
  setDistances = (interval) => {
    // Constant speed
    let distanceX = targetX - x;
    let distanceY = targetY - y;
    let angle = Math.atan(distanceX / distanceY);
    dX = Math.sin(angle) * speedFactor * interval;
    dY = Math.cos(angle) * speedFactor * interval;
    dX = Math.abs(dX) * Math.sign(distanceX);
    dY = Math.abs(dY) * Math.sign(distanceY);
  };
  setNewPosition = () => {
    x += dX;
    y += dY;
  };
  move = (interval) => {
    if (shouldMove()) {
      // console.log(x, y)
      setDistances(interval);
      setNewPosition();
    } else {
      let newX = Math.random() * 500;
      let newY = Math.random() * 500;
      setTarget(newX, newY);
    }
  };
  return {
    setTarget,
    draw
  };
})();


function loop(interval) {
  ctx.clearRect(0, 0, 500, 500);
  ball.draw(interval);

  ctx.beginPath();
  ctx.fillStyle = "blue";
  ctx.moveTo(20, 20);
  ctx.lineTo(180, 20);
  ctx.lineTo(130, 130);
  ctx.stroke();
};

const clock = (function () {
  let ms = 2;
  let clockId;
  let date = Date.now();
  const startClock = (callback) => {
    clockId = setInterval(() => {
      let currDate = Date.now();
      let interval = currDate - date;
      // console.log(interval);
      callback(interval);
      date = currDate;
    }, ms);
  };

  const stopClock = () => { clearInterval(clockId) };

  return { startClock, stopClock };
})();

clock.startClock(loop);