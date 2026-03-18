const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("lapsList");
const lapCount = document.getElementById("lapCount");

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapNumber = 0;

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
    String(milliseconds).padStart(3, "0")
  ].join(":");
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
  if (timerInterval) {
    return;
  }

  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
}

function pauseStopwatch() {
  if (!timerInterval) {
    return;
  }

  clearInterval(timerInterval);
  timerInterval = null;
}

function resetStopwatch() {
  pauseStopwatch();
  elapsedTime = 0;
  lapNumber = 0;
  lapsList.innerHTML = "";
  updateLapCount();
  updateDisplay();
}

function updateLapCount() {
  const total = lapsList.children.length;
  lapCount.textContent = `${total} ${total === 1 ? "entry" : "entries"}`;
}

function addLap() {
  if (elapsedTime === 0) {
    return;
  }

  lapNumber += 1;

  const lapItem = document.createElement("li");
  lapItem.className = "lap-item";

  const label = document.createElement("strong");
  label.textContent = `Lap ${lapNumber}`;

  const value = document.createElement("span");
  value.textContent = formatTime(elapsedTime);

  lapItem.append(label, value);
  lapsList.prepend(lapItem);
  updateLapCount();
}

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", addLap);

updateDisplay();
updateLapCount();
