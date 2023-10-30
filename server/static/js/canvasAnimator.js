export const CanvasAnimator = () => {
  let ctx = document.getElementById("canvas").getContext("2d");
  let coordinates = [];

  const updateData = (pointsData) => {
    coordinates = [];
    pointsData.forEach((point) => {
      coordinates.push(point.coordinates);
    });
  };

  const tick = (noteIndex, fractionalDuration) => {
    clearCanvas();
    drawPath();
    drawBall(noteIndex, fractionalDuration);
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, 500, 500);
  };

  const drawPath = () => {
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.moveTo(coordinates[0][0], coordinates[0][1]);
    for (let i = 1; i < coordinates.length; i++) {
      ctx.lineTo(coordinates[i][0], coordinates[i][1]);
    }
    ctx.stroke();
  };

  const drawBall = (noteIndex, fractionalDuration) => {
    let ballX =
      coordinates[noteIndex][0] +
      (coordinates[noteIndex + 1][0] - coordinates[noteIndex][0]) *
        fractionalDuration;
    let ballY =
      coordinates[noteIndex][1] +
      (coordinates[noteIndex + 1][1] - coordinates[noteIndex][1]) *
        fractionalDuration;
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.arc(ballX, ballY, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  return { updateData, tick };
};
