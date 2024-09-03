let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsContainer = document.getElementById("laps");

startStopBtn.addEventListener("click", function() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = "Pause";
        running = true;
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.textContent = "Start";
    }
});

resetBtn.addEventListener("click", function() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    laps = [];
    updateTime();
    startStopBtn.textContent = "Start";
    lapsContainer.innerHTML = "";
});

lapBtn.addEventListener("click", function() {
    if (running) {
        const lapTime = formatTime(difference);
        laps.push(lapTime);
        displayLaps();
    }
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function formatTime(time) {
    const milliseconds = parseInt((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return (
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds)
    );
}

function displayLaps() {
    lapsContainer.innerHTML = laps
        .map((lap, index) => `<li>Lap ${index + 1}: ${lap}</li>`)
        .join("");
}
