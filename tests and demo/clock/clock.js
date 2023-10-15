// setInterval(() => {
//     let currDate = Date.now();
//     console.log(currDate - date);
//     date = currDate
// }, 1);

// (function loop() {
//     setTimeout(() => {
//         // Your logic here
//         let currDate = Date.now();
//         console.log(currDate - date);
//         date = currDate
//         loop();
//     }, 1);
// })();

const clock = (function () {
    let clockId;
    let date = Date.now();
    const startClock = () => {
        clockId = setInterval(() => {
            let currDate = Date.now();
            console.log(currDate - date);
            date = currDate;
        }, 20);
    };

    const stopClock = () => { clearInterval(clockId) };

    return { startClock, stopClock };
})();

clock.startClock();

setTimeout(() => {
    clock.stopClock();
    console.log('restart');
}, 1000)