export const CanvasAnimator = () => {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let coordinates = [];
  const cursor = new Image();
  cursor.src = "./static/resources/cursor.png";

  const updateData = (pointsData) => {
    coordinates = [];
    pointsData.forEach((point) => {
      coordinates.push(point.coordinates);
    });
  };

  const tick = (noteIndex, fractionalDuration) => {
    clearCanvas();
    drawPath();
    drawPoints();
    drawCursor(noteIndex, fractionalDuration);
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawPath = () => {
    ctx.beginPath();
    ctx.moveTo(coordinates[0][0], coordinates[0][1]);
    for (let i = 1; i < coordinates.length; i++) {
      ctx.lineTo(coordinates[i][0], coordinates[i][1]);
    }
    ctx.stroke();
  };

  const drawPoints = () => {
    ctx.beginPath();
    for (let i = 0; i < coordinates.length; i++) {
      ctx.clearRect(coordinates[i][0] - 5, coordinates[i][1] - 5, 10, 10);
      ctx.rect(coordinates[i][0] - 5, coordinates[i][1] - 5, 10, 10);
    }
    ctx.stroke();
  };

  const drawCursor = (noteIndex, fractionalDuration) => {
    let cursorX =
      coordinates[noteIndex][0] +
      (coordinates[noteIndex + 1][0] - coordinates[noteIndex][0]) *
        fractionalDuration -
      8;
    let cursorY =
      coordinates[noteIndex][1] +
      (coordinates[noteIndex + 1][1] - coordinates[noteIndex][1]) *
        fractionalDuration -
      8;
    ctx.drawImage(cursor, cursorX, cursorY, 16, 16);
  };

  return { updateData, tick };
};
