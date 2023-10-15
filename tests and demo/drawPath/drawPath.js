let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let testCoordinates = {
    coordinates: [[380, 38], [402, 481], [44, 449], [182, 188], [316, 120], [287, 245], [103, 361], [218, 86], [197, 316]]
};

let sortedCoordinates = testCoordinates.coordinates.sort((a, b) => {
    if (a[0] > b[0]) {
        return 1;
    }
    else {
        return -1;
    }
});

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
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 1;
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
            // let newX = Math.random() * 500;
            // let newY = Math.random() * 500;
            // setTarget(newX, newY);
        }
    };
    return {
        setTarget,
        draw
    };
})();

let path = (() => {
    draw = (coordinates) => {
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.arc(coordinates[0][0], coordinates[0][1], 8, 0, 2 * Math.PI);

        ctx.moveTo(coordinates[0][0], coordinates[0][1]);
        for (let i = 0; i < coordinates.length; i++)
            ctx.lineTo(coordinates[i][0], coordinates[i][1]);
        ctx.stroke();
    }

    return {
        draw
    };
})();

function loop(interval) {
    ctx.clearRect(0, 0, 500, 500);

    path.draw(sortedCoordinates);
    ball.draw(interval);
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

let count = 0;
setInterval(() => {
    ball.setTarget(sortedCoordinates[count][0], sortedCoordinates[count][1]);
    count++;
    if (count >= sortedCoordinates.length) {
        count = 0;
    }
}, 1500)